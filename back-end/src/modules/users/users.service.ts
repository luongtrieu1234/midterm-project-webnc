import { UserUpdateProfileRequestDto } from './dto/user-update-profile-request.dto';
import fs from 'fs';
import { join } from 'path';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
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

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: typeof User,
    private jwtService: JwtService,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
  ) {}
  async userSignup(userSignupRequestDto: UserSignupRequestDto) {
    const hashedPassword = await bcrypt.hash(userSignupRequestDto.password, 12);

    const user = await this.userRepository.create({
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
    const user = await this.userRepository.findOne({
      where: {
        email: userLoginRequestDto.email,
      },
    });

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(userLoginRequestDto.password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success',
      jwt: jwt,
    };
  }

  async userProfile(request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      console.log(`check cookies ${cookie}`);

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.userRepository.findOne({
        where: { id: data['id'] },
      });
      console.log(`check user ${JSON.stringify(user)}`);
      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async userUpdateProfile(
    userUpdateProfileRequestDto: UserUpdateProfileRequestDto,
    response: Response,
    request: Request,
  ) {
    const user = await this.userRepository.findOne({
      where: {
        email: userUpdateProfileRequestDto.email,
      },
    });
    if (!user) {
      throw new BadRequestException('User cannot find');
    }
    // try {
    //   const cookie = request.cookies['jwt'];
    //   console.log(`check cookies ${cookie}`);

    //   const data = await this.jwtService.verifyAsync(cookie);

    //   if (!data) {
    //     throw new UnauthorizedException();
    //   }

    //   const user = await this.userRepository.findOne({
    //     where: { id: data['id'] },
    //   });
    //   console.log(`check user ${JSON.stringify(user)}`);
    //   const { password, ...result } = user;

    //   return result;
    // } catch (e) {
    //   throw new UnauthorizedException();
    // }
    try {
      await this.sequelize.transaction(async (t) => {
        // Begin transaction
        const transaction = { transaction: t };
        await user.update({ ...userUpdateProfileRequestDto }, transaction);
        return { success: true };
        // End transaction
      });
    } catch (err) {
      console.log(err?.message || err?.response.code || err);
      throw new BadRequestException(err?.message || err?.response.code || err);
    }
  }
}
