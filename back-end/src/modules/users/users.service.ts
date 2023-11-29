import { UserUpdateProfileRequestDto } from './dto/user-update-profile-request.dto';
import fs from 'fs';
import { join } from 'path';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './users.entity';
import { UserSignupRequestDto } from './dto/user-signup-request.dto';

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
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserModel } from './users.model';
import { MailService } from '../../others/mail/mail.service';
import { UserResetPasswordRequestDto } from './dto/user-reset-passowrd-request.dto';
import { UserResetPasswordDto } from './dto/user-reset-passowrd.dto';
import { SharedService } from 'src/others/auth/shared.service';

@Injectable()
export class UsersService {
  constructor(
    // @Inject('UserRepository')
    // private readonly userRepository: typeof User,
    private jwtService: JwtService,
    private authService: AuthService,
    private mailService: MailService,
    private sharedService: SharedService,
    // @Inject('SEQUELIZE')
    // private readonly sequelize: Sequelize,
    @InjectModel('User')
    private readonly userModel: Model<UserModel>,
  ) {}
  async findUserByEmail(email: string) {
    return await this.userModel.findOne({
      email: email,
    });
  }

  async userSignup(userSignupRequestDto: UserSignupRequestDto) {
    const currentUser = await this.userModel.findOne({
      email: userSignupRequestDto.email,
    });
    const emailToken = await this.authService.signVerifyToken(userSignupRequestDto.email);
    await this.mailService.sendUserConfirmation('lexuantien07@gmail.com', emailToken);
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

  async userLogin(userLoginRequestDto: UserLoginRequestDto, response: Response) {
    const user = await this.userModel.findOne({
      email: userLoginRequestDto.email,
    });

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    if (!(await bcrypt.compare(userLoginRequestDto.password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt1 = await this.jwtService.signAsync({ id: user.id });
    const jwt2 = await this.authService.signAccessToken(user);

    // response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success',
      jwt1: jwt1,
      jwt2: jwt2,
    };
  }

  async userProfile(request: Request) {
    console.log();
    try {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      type === 'Bearer' ? token : undefined;
      console.log(`check token ${token}`);
      console.log(`check token 2 ${token}`);

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

      await user.updateOne({ ...userUpdateProfileRequestDto });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async userHomePage(request: Request, response: Response) {
    try {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      type === 'Bearer' ? token : undefined;
      console.log(`check token ${token}`);

      const data = await this.jwtService.verifyAsync(token);

      if (!data) {
        throw new UnauthorizedException('Access token error');
      }

      return { message: 'success' };
    } catch (e) {
      throw new UnauthorizedException('Access token does not exist');
    }
  }

  async googleLogin(req) {
    if (!req.user) {
      throw new BadRequestException('No user from google');
    }

    console.log('check google user ', req.user);
    const user = await this.findUserByEmail(req.user.email);
    let result = null;
    if (!user) {
      // throw new BadRequestException('User not found');
      const fullname = `${req.user.firstName} ${req.user.lastName}`;
      const newUser = await this.userModel.create({
        fullname: fullname,
        email: req.user.email,
      });

      const { password, ...rest } = newUser;
      result = rest;
    }
    const currentUser = await this.findUserByEmail(req.user.email);
    const accessToken = await this.authService.signAccessToken(currentUser);

    return {
      message: 'User information from google',
      user: {
        email: currentUser.email,
        password: currentUser.password,
        fullname: currentUser.fullname,
        gender: currentUser.gender,
        dob: currentUser.dob,
        phone: currentUser.phone,
        address: currentUser.address,
        job: currentUser.job,
        hobby: currentUser.hobby,
      },
      accessToken: accessToken,
    };
  }

  async verifyEmail(query) {
    console.log('check query service ', JSON.stringify(query));
    const isValid = await this.authService.confirmVerifyToken(query.token);
    if (isValid)
      return {
        message: 'Verify success',
      };
    return {
      message: 'Verify fail',
    };
  }

  async resetPasswordRequest(userResetPasswordRequestDto: UserResetPasswordRequestDto) {
    const user = await this.userModel.findOne({
      email: userResetPasswordRequestDto.email,
    });

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    const emailToken = await this.authService.signVerifyToken(userResetPasswordRequestDto.email);
    await this.mailService.sendUserConfirmation('lexuantien07@gmail.com', emailToken);

    return {
      success: 'success',
    };
  }

  async resetPassword(userResetPasswordDto: UserResetPasswordDto) {
    if (userResetPasswordDto.password !== userResetPasswordDto.passwordConfirmed) {
      throw new BadRequestException('Confirmed password not match');
    }
    const hashedPassword = await bcrypt.hash(userResetPasswordDto.password, 12);
    const token = this.sharedService.getToken();
    if (!token) {
      throw new BadRequestException('Confirmation fail');
    }
    const data = await this.jwtService.verifyAsync(token);
    if (!data) {
      throw new UnauthorizedException();
    }
    const user = await this.userModel.findOne({
      email: data['email'],
    });
    console.log(`check user resetPassword ${JSON.stringify(user)}`);

    await user.updateOne({ password: hashedPassword });
  }
}
