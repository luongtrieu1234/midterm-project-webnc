import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
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

  async createClass(createClassDto: CreateClassDto) {
    const currentClass = await this.classModel.findOne({
      name: createClassDto.name,
    });
    console.log('check class ', currentClass);
    if (currentClass) {
      throw new BadRequestException('Class existed');
    }
    const newClass = await this.classModel.create({
      name: createClassDto.name,
    });
    return newClass;
  }

  async addUsersToClass(updateClassDto: UpdateClassDto) {
    console.log('check updateClassDto ', updateClassDto);
    const currentClass = await this.classModel.findOne({
      name: updateClassDto.name,
    });
    console.log('check class ', currentClass);
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
        if (studentAdd && !currentClass.students.some(existingStudent  => 
          existingStudent.user.toString() === studentAdd._id.toString() &&
          existingStudent.role.toString() === studentRole._id.toString()
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
        if (teacherAdd && !currentClass.teachers.includes({
          user: teacherAdd._id.toString(), role: teacherRole._id.toString()
        })) {
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
    console.log('Populated Class:', populatedClass);

    return {
      message: 'success',
      classes: populatedClass,
      statusCode: HttpStatus.OK,
    };
  }

  async getListClasses() {
    return await this.classModel.find().populate('students').populate('teachers').exec();
  }

  async getListClassesOwn(userId: string) {
    const classes = await this.classModel.find({
      owner: userId,
    })
  }

  async getListClassUsers(classId: string) {
    return await this.classModel.find({
      id: classId,
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
}
