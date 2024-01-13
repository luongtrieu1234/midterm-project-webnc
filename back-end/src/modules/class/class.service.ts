import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Model, SortOrder } from 'mongoose';
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
import { GradeModel } from '../grade/grade.model';
import { GradeStructureModel } from '../grade/grade-structure.model';
import { ConfirmClassCodeDto } from './dto/confirm-class-code.dto';
import { UpdateInformationClassDto } from './dto/update-name-description.dto';

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
    private readonly roleModel: Model<RoleModel>, // @InjectModel('Grade')
    // private readonly gradeModel: Model<GradeModel>,
  ) // @InjectModel('GradeStructure')
  // private readonly gradeStructureModel: Model<GradeStructureModel>,
  {}

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
    let classCode = Math.floor(100000 + Math.random() * 900000).toString();
    while (1) {
      const isClassCode = await this.classModel.findOne({ classCode: classCode });
      if (isClassCode) {
        classCode = Math.floor(100000 + Math.random() * 900000).toString();
      } else {
        break;
      }
    }
    const newClass = await this.classModel.create({
      owner: classOwner._id,
      name: createClassDto.name,
      classCode: classCode,
      description: createClassDto.description ?? '',
    });
    // const owner = await this.userModel.findById(ownerId);
    const teacherRole = await this.roleModel.findOne({
      name: 'teacher',
    });
    newClass.teachers.push({ user: ownerId, classRole: 'teacher' });
    newClass.save();
    // const gradeStructure = await this.gradeStructureModel.create({
    //   name: Grade structure of class ${createClassDto.name},
    // });
    // newClass.gradeStructure = gradeStructure._id.toString();
    // newClass.save();
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
        name: 'student',
      });
      const promises = updateClassDto.students?.map(async (student) => {
        const studentAdd = await this.userModel.findOne({
          email: student.email,
        });
        // const isExisting = currentClass.students.includes(studentAdd)
        //   console.log('isExisting ', isExisting)
        const isExisting2 = currentClass.students.some(
          (existingStudent) =>
            existingStudent?.user?.toString() === studentAdd._id.toString() &&
            existingStudent?.classRole?.toString() === 'student',
        );
        console.log('isExisting2 ', isExisting2);

        if (
          studentAdd &&
          !currentClass.students.some(
            (existingStudent) =>
              existingStudent?.user?.toString() === studentAdd._id.toString() &&
              existingStudent?.classRole?.toString() === 'student',
          ) &&
          !currentClass.teachers.some(
            (existingTeacher) =>
              existingTeacher?.user?.toString() === studentAdd._id.toString() &&
              existingTeacher?.classRole?.toString() === 'teacher',
          )
        ) {
          currentClass.students.push({
            user: studentAdd._id.toString(),
            classRole: 'student',
          });
          return currentClass.save();
        }
      });
      await Promise.all(promises);
    }
    if (updateClassDto.teachers) {
      const teacherRole = await this.roleModel.findOne({
        name: 'teacher',
      });
      const promises = updateClassDto.teachers?.map(async (teacher) => {
        const teacherAdd = await this.userModel.findOne({
          email: teacher.email,
        });
        if (
          teacherAdd &&
          !currentClass.teachers.some(
            (existingTeacher) =>
              existingTeacher?.user?.toString() === teacherAdd._id.toString() &&
              existingTeacher?.classRole?.toString() === 'teacher',
          ) &&
          !currentClass.students.some(
            (existingStudent) =>
              existingStudent?.user?.toString() === teacherAdd._id.toString() &&
              existingStudent?.classRole?.toString() === 'student',
          )
        ) {
          currentClass.teachers.push({
            user: teacherAdd._id.toString(),
            classRole: 'teacher',
          });
          return currentClass.save();
        }
      });
      await Promise.all(promises);
    }
    // const populatedClass = await this.classModel
    //   .findById(currentClass._id)
    //   .populate('students')
    //   .populate('teachers')
    //   .exec();

    const populatedClass = await this.getClassWithUserInfo(currentClass._id.toString());

    // console.log('Populated Class:', populatedClass);

    return {
      message: 'success',
      classes: populatedClass,
      statusCode: HttpStatus.OK,
    };
  }

  async updateInformationClass(updateInformationClassDto: UpdateInformationClassDto) {
    const currentClass = await this.classModel.findOneAndUpdate(
      {
        _id: updateInformationClassDto.classId,
      },
      {
        $set: {
          name: updateInformationClassDto?.name,
          description: updateInformationClassDto?.description,
        },
      },
      { new: true },
    );

    if (!currentClass) {
      throw new BadRequestException('Grade not found');
    }
    return {
      message: 'success',
      statusCode: HttpStatus.OK,
      class: currentClass,
    };
  }

  async getListClasses(sortType: string, filterOption: string) {
    console.log('sortType ', sortType);
    console.log('filterOption ', filterOption);
    let sort: SortOrder = 1;
    if (sortType === 'desc') {
      sort = 'desc' as SortOrder;
    } else {
      sort = 'asc' as SortOrder;
    }
    let filter = {};
    if (filterOption === 'active') {
      filter = { active: true };
    } else if (filterOption === 'inactive') {
      filter = { active: false };
    }

    const classes = await this.classModel
      .find(filter)
      .sort({ createdAt: sort as SortOrder })
      .exec();
    const promises = classes?.map(async (classDocument) => {
      return await this.getClassWithUserInfo(classDocument._id.toString());
    });
    return await Promise.all(promises);
  }

  async getListClassesOfUser(userId: string) {
    const classes = await this.classModel.find({
      owner: userId,
    });
    const promises = classes?.map(async (classDocument) => {
      return await this.getClassWithUserInfo(classDocument._id.toString());
    });
    return await Promise.all(promises);
  }

  async getListTeacherClassesByUserId(userId: string) {
    const classes = await this.classModel.find({
      'teachers.user': userId,
    });
    const promises = classes?.map(async (classDocument) => {
      return await this.getClassWithUserInfo(classDocument._id.toString());
    });
    return await Promise.all(promises);
  }

  async getListStudentClassesByUserId(userId: string) {
    const classes = await this.classModel.find({
      'students.user': userId,
    });
    const promises = classes?.map(async (classDocument) => {
      return await this.getClassWithUserInfo(classDocument._id.toString());
    });
    return await Promise.all(promises);
  }

  async getAllClassesOfUser(userId: string) {
    const classes = await this.classModel.find({
      $or: [{ owner: userId }, { 'teachers.user': userId }, { 'students.user': userId }],
    });
    const promises = classes?.map(async (classDocument) => {
      return await this.getClassWithUserInfo(classDocument._id.toString());
    });
    const classesReturn = await Promise.all(promises);
    return {
      message: 'success',
      statusCode: HttpStatus.OK,
      classes: classesReturn,
    };
  }

  async getListUsersOfClass(classId: string) {
    console.log('check dto ', classId);
    const classDocument = await this.classModel.findById(classId);
    const userIdToCheck = '6570241126d4f4880dbddd97';

    const userRoleInfo = await this.getUserRoleInClass(classDocument, userIdToCheck);

    if (userRoleInfo) {
      console.log(`User has the role '${userRoleInfo.role}' as a ${userRoleInfo.role}.`);
    } else {
      console.log('User not found in the class.');
    }
    return await this.classModel
      .findOne({
        _id: classId,
      })
      .populate('students')
      .populate('teachers')
      .exec();
  }

  async sendInviteTeacher(sendInvitationDto: SendInvitationDto) {
    const emailToken = await this.authService.signVerifyToken(sendInvitationDto.email);
    this.sharedService.setToken(emailToken);
    await this.mailService.sendInvitationTeacher(
      sendInvitationDto.email,
      emailToken,
      sendInvitationDto.name,
    );
    return {
      message: 'success',
      statusCode: HttpStatus.OK,
    };
  }
  async sendInviteStudent(sendInvitationDto: SendInvitationDto) {
    const emailToken = await this.authService.signVerifyToken(sendInvitationDto.email);
    this.sharedService.setToken(emailToken);
    await this.mailService.sendInvitationStudent(
      sendInvitationDto.email,
      emailToken,
      sendInvitationDto.name,
    );
    return {
      message: 'success',
      statusCode: HttpStatus.OK,
    };
  }

  async acceptJoinClassByTeacher(token: string, className: string) {
    const payload = await this.authService.verifyToken(token);
    if (payload) {
      await this.addUsersToClass({
        name: className.replace(/\+/g, ' '),
        students: [],
        teachers: [{ email: payload.email }],
      });
    }
    return {
      message: 'success',
      statusCode: HttpStatus.OK,
    };
  }
  async acceptJoinClassByStudent(token: string, className: string) {
    const payload = await this.authService.verifyToken(token);
    if (payload) {
      await this.addUsersToClass({
        name: className.replace(/\+/g, ' '),
        students: [{ email: payload.email }],
        teachers: [],
      });
    }
    return {
      message: 'success',
      statusCode: HttpStatus.OK,
    };
  }

  async getUserRoleInClass(classId, userId) {
    // Check in the students array
    const classDocument = await this.classModel.findById(classId);
    const student = classDocument.students.find((student) => student.user.toString() === userId);

    if (student) {
      return { message: 'success', statusCode: HttpStatus.OK, role: 'student' };
    }

    // Check in the teachers array
    const teacher = classDocument.teachers.find((teacher) => teacher.user.toString() === userId);

    if (teacher) {
      return {
        message: 'success',
        statusCode: HttpStatus.OK,
        role: 'teacher',
      };
    }

    // User not found in students or teachers array
    return null;
  }

  async getLinkInvitation(email, classId) {
    try {
      const classDocument = await this.classModel.findById(classId);

      if (!classDocument) {
        throw new Error('Class not found');
      }
      const emailToken = await this.authService.signVerifyToken(email);
      const link = `${
        process.env.SERVER_URL
      }/class/accept-join-class-by-student?className=${classDocument.name.replace(
        / /g,
        '+',
      )}&token=${emailToken}`;

      return link;
    } catch (error) {
      // Handle errors
      console.error('Error retrieving class information:', error.message);
      throw error;
    }
  }

  async getClassWithUserInfo(classId: string) {
    try {
      const classDocument = await this.classModel.findById(classId);

      if (!classDocument) {
        throw new Error('Class not found');
      }

      // Iterate through students and update with user info
      for (const student of classDocument.students) {
        student.user = await this.userModel.findById(student.user);
      }

      // Iterate through teachers and update with user info
      for (const teacher of classDocument.teachers) {
        teacher.user = await this.userModel.findById(teacher.user);
      }

      if (classDocument.owner) {
        classDocument.owner = await this.userModel.findById(classDocument.owner);
      }

      return classDocument;
    } catch (error) {
      // Handle errors
      console.error('Error retrieving class information:', error.message);
      throw error;
    }
  }

  async confirmClassCode(dto: ConfirmClassCodeDto, email: string) {
    const classCode = dto.code;
    const classDocument = await this.classModel.findOne({ classCode: classCode });
    if (!classDocument) {
      throw new BadRequestException('Class not found');
    }
    if (classDocument.classCode !== classCode) {
      throw new BadRequestException('Class code is not correct');
    }
    await this.addUsersToClass({
      name: classDocument.name,
      students: [{ email: email }],
      teachers: [],
    });
    return {
      message: 'Verify success',
      statusCode: HttpStatus.OK,
    };
  }
}
