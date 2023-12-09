import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../others/auth/auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { MailService } from '../../others/mail/mail.service';
import { SharedService } from 'src/others/auth/shared.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { UserModel } from '../users/users.model';
import { ClassModel } from './class.model';
import { SendInvitationDto } from './dto/send-invitation.dto';
import { RoleModel } from '../role/role.model';

@Injectable()
export class ClassService {
  constructor(
    // @Inject('UserRepository')
    // private readonly userRepository: typeof User,
    // private jwtService: JwtService,
    private authService: AuthService,
    private mailService: MailService,
    private sharedService: SharedService,
    @InjectModel('User')
    private readonly userModel: Model<UserModel>,
    @InjectModel('Class')
    private readonly classModel: Model<ClassModel>,
    @InjectModel('Role')
    private readonly roleModel: Model<RoleModel>,
  ) {}

  async createClass(ownerId: string, createClassDto: CreateClassDto) {
    const currentClass = await this.classModel.findOne({
      name: createClassDto.name,
    });
    console.log('check class ', currentClass);
    if (currentClass) {
      throw new BadRequestException('Class existed');
    }
    const classOwner = await this.userModel.findOne({
      _id: ownerId,
    });
    const newClass = await this.classModel.create({
      owner: classOwner._id,
      name: createClassDto.name,
    });
    return newClass;
  }

  async addUsersToClass(updateClassDto: UpdateClassDto) {
    console.log('check updateClassDto ', updateClassDto);
    const currentClass = await this.classModel.findOne({
      name: updateClassDto.name,
    });
    // console.log('check class ', currentClass);
    if (!currentClass) {
      throw new BadRequestException('Class not found');
    }
    if (updateClassDto.students) {
      const studentRole = await this.roleModel.findOne({
        name: 'student'
      });
      const promises = updateClassDto.students?.map(async (student) => {
        const studentAdd = await this.userModel.findOne({
          email: student.email,
        });
        // const isExisting = currentClass.students.includes(studentAdd)
        //   console.log('isExisting ', isExisting)
        const isExisting2 = currentClass.students.some(existingStudent => 
          existingStudent?.user?.toString() === studentAdd._id.toString() &&
          existingStudent?.role?.toString() === studentRole._id.toString()
        )
        console.log('isExisting2 ', isExisting2)

        if (studentAdd && !currentClass.students.some(existingStudent => 
          existingStudent?.user?.toString() === studentAdd._id.toString() &&
          existingStudent?.role?.toString() === studentRole._id.toString()
        )) {
          currentClass.students.push({
            user: studentAdd._id.toString(), role: studentRole._id.toString()
          });
          return currentClass.save();
        }
      });
      await Promise.all(promises);
    }
    if (updateClassDto.teachers) {
      const teacherRole = await this.roleModel.findOne({
        name: 'teacher'
      });
      const promises = updateClassDto.teachers?.map(async (teacher) => {
        const teacherAdd = await this.userModel.findOne({
          email: teacher.email,
        });
        if (teacherAdd && !currentClass.teachers.some(existingTeacher => 
          existingTeacher?.user?.toString() === teacherAdd._id.toString() &&
          existingTeacher?.role?.toString() === teacherRole._id.toString()
        )) {
          currentClass.teachers.push({
            user: teacherAdd._id.toString(), role: teacherRole._id.toString()
          });
          return currentClass.save();
        }
      });
      await Promise.all(promises);
    }
    const populatedClass = await this.classModel
      .findById(currentClass._id)
      .populate('students')
      .populate('teachers')
      .exec();
    // console.log('Populated Class:', populatedClass);

    return {
      message: 'success',
      classes: populatedClass,
      statusCode: HttpStatus.OK,
    };
  }

  async getListClasses() {
    return await this.classModel.find().populate('students').populate('teachers').exec();
  }

  async getListClassesOfUser(userId: string) {
    const classes = await this.classModel.find({
      owner: userId,
    })
    return classes;
  }

  async getListTeacherClassesByUserId(userId: string) {
    const classes = await this.classModel.find({
      'teachers.user': userId,
    })
    return classes;
  }

  async getListStudentClassesByUserId(userId: string) {
    const classes = await this.classModel.find({
      'students.user': userId,
    })
    return classes;
  }

  async getListUsersOfClass(classId: string) {
    console.log('check dto ', classId)
    const classDocument = await this.classModel.findById(classId)
    const userIdToCheck = '6570241126d4f4880dbddd97';

    const userRoleInfo = await this.getUserRoleInClass(classDocument, userIdToCheck);

    if (userRoleInfo) {
      console.log(`User has the role '${userRoleInfo.role}' as a ${userRoleInfo.userType}.`);
    } else {
      console.log('User not found in the class.');
    }
    return await this.classModel.findOne({
      _id: classId,
    }).populate('students').populate('teachers').exec();

  }

  async sendInvite(sendInvitationDto: SendInvitationDto) {
    const emailToken = await this.authService.signVerifyToken(sendInvitationDto.email);
    this.sharedService.setToken(emailToken);
    await this.mailService.sendInvitationTeacher('lexuantien07@gmail.com', emailToken, 'a');
    return {
      message: 'success',
      statusCode: HttpStatus.OK,
    }
  }

  async acceptInvitation(body) {
    console.log('body ', body)
    return {
      message: 'success',
      statusCode: HttpStatus.OK,
    }
  }

  async getUserRoleInClass(classId, userId) {
    // Check in the students array
    const classDocument = await this.classModel.findById(classId);
    const student = classDocument.students.find(
      (student) => student.user.toString() === userId
    );
  
    if (student) {
      const studentRole = await this.getRoleById(student.role);
      return { role: studentRole, userType: 'student' };
    }
  
    // Check in the teachers array
    const teacher = classDocument.teachers.find(
      (teacher) => teacher.user.toString() === userId
    );
  
    if (teacher) {
      const teacherRole = await this.getRoleById(teacher.role);
      return { 
        message: 'success',
        statusCode: HttpStatus.OK,
        role: teacherRole, 
        userType: 'teacher'
       };
    }
  
    // User not found in students or teachers array
    return null;
  }
  
  async getRoleById(roleId) {
    // Assume you have a Mongoose model for the Role schema
    const role = await this.roleModel.findById(roleId);
    return role ? role.name : null;
  }
}
