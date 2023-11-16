import { UserUpdateProfileRequestDto } from './dto/user-update-profile-request.dto';
import fs from 'fs';
import { join } from 'path';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './users.entity';
import { UserSignupRequestDto } from './dto/user-signup-request.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
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
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserModel } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    // @Inject('UserRepository')
    // private readonly userRepository: typeof User,
    private jwtService: JwtService,
    // @Inject('SEQUELIZE')
    // private readonly sequelize: Sequelize,
    @InjectModel('User')
    private readonly userModel: Model<UserModel>,
  ) {}
  async userSignup(userSignupRequestDto: UserSignupRequestDto) {
    const currentUser = await this.userModel.findOne({
      where: {
        email: userSignupRequestDto.email,
      },
    });
    if (currentUser) {
      throw new BadRequestException('Email already signed up');
    }
    const hashedPassword = await bcrypt.hash(userSignupRequestDto.password, 12);

    const user = await this.userModel.create({
      fullname: userSignupRequestDto.fullname,
      email: userSignupRequestDto.email,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }

  async userLogin(
    userLoginRequestDto: UserLoginRequestDto,
    response: Response,
  ) {
    const user = await this.userModel.findOne({
      where: {
        email: userLoginRequestDto.email,
      },
    });

    const u = await this.userModel.findOne({
      email: userLoginRequestDto.email,
    });

    if (!u) {
      throw new BadRequestException('Email not found');
    }

    if (!(await bcrypt.compare(userLoginRequestDto.password, u.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: u.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success',
      jwt: jwt,
    };
  }

  async userProfile(request: Request) {
    try {
      // const cookie = request.cookies['jwt'];
      // console.log(`check cookies ${cookie}`);

      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      type === 'Bearer' ? token : undefined;
      console.log(`check token ${token}`);

      const data = await this.jwtService.verifyAsync(token);

      if (!data) {
        throw new UnauthorizedException('Access token error');
      }
      console.log(`check data ${JSON.stringify(data['id'])}`);

      const user = await this.userModel.findOne({
        _id: data['id'],
      });
      console.log(`check user ${JSON.stringify(user)}`);
      const { password, ...result } = user;
      console.log(password);
      return user;
    } catch (e) {
      throw new UnauthorizedException('Access token does not exist');
    }
  }

  async userUpdateProfile(
    userUpdateProfileRequestDto: UserUpdateProfileRequestDto,
    response: Response,
    request: Request,
  ) {
    try {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      type === 'Bearer' ? token : undefined;
      console.log(`check token ${token}`);

      const data = await this.jwtService.verifyAsync(token);
      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.userModel.findOne({
        _id: data['id'],
      });
      console.log(`check user ${JSON.stringify(user)}`);
      const { password, ...result } = user;
      await user.updateOne({ ...userUpdateProfileRequestDto });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
