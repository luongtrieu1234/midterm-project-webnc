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
import { CreateOrUpdateClassDto } from './dto/create-class.dto';
import { UserModel } from '../users/users.model';
import { ClassModel } from './class.model';

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
    private readonly classModel: Model<ClassModel>, // @InjectModel('User')
    // private readonly userModel: Model<UserModel>,
  ) {}

  async createClass(createClassDto: CreateOrUpdateClassDto) {
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

  async updateClass(updateClassDto: CreateOrUpdateClassDto) {
    console.log('check updateClassDto ', updateClassDto);
    const currentClass = await this.classModel.findOne({
      name: updateClassDto.name,
    });
    console.log('check class ', currentClass);
    if (!currentClass) {
      throw new BadRequestException('Class not found');
    }
    if (updateClassDto.students) {
      updateClassDto.students?.map(async (student) => {
        const studentAdd = await this.userModel.findOne({
          email: student.email,
        });
        if (studentAdd && !currentClass.students.includes(studentAdd._id.toString())) {
          await currentClass.students.push(studentAdd._id.toString());
          await currentClass.save();
        }
      });
    }
    if (updateClassDto.teachers) {
      updateClassDto.teachers?.map(async (teacher) => {
        const teacherAdd = await this.userModel.findOne({
          email: teacher.email,
        });
        if (teacherAdd && !currentClass.teachers.includes(teacherAdd._id.toString())) {
          await currentClass.teachers.push(teacherAdd._id.toString());
          await currentClass.save();
        }
      });
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

  async sendInvite() {
    return 'a';
  }
}
