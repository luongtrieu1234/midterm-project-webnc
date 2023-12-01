import { Inject, Injectable, Logger } from '@nestjs/common';
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
    private jwtService: JwtService,
    private authService: AuthService,
    private mailService: MailService,
    private sharedService: SharedService,
    @InjectModel('User')
    private readonly userModel: Model<UserModel>,
    @InjectModel('Class')
    private readonly classModel: Model<ClassModel>, // @InjectModel('User')
  ) // private readonly userModel: Model<UserModel>,
  {}

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
    const currentClass = await this.classModel.findOne({
      name: updateClassDto.name,
    });
    console.log('check class ', currentClass);
    if (!currentClass) {
      throw new BadRequestException('Class not found');
    }
  }
}
