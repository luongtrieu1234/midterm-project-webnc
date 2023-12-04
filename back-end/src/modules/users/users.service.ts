import { UserUpdateProfileRequestDto } from './dto/user-update-profile-request.dto';
import fs from 'fs';
import { join } from 'path';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { HttpCode, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
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
import { UserConfirmCodeDto } from './dto/user-confirm-code.dto';

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

  async userSignupRequest(userSignupRequestDto: UserSignupRequestDto) {
    const currentUser = await this.userModel.findOne({
      email: userSignupRequestDto.email,
    });
    if (currentUser) {
      throw new BadRequestException('Email already signed up');
    }
    const codeMail = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(codeMail);
    this.sharedService.setCode(codeMail);
    // const emailToken = await this.authService.signVerifyToken(userResetPasswordRequestDto.email);
    const emailToken = await this.authService.signVerifyToken(userSignupRequestDto.email);
    this.sharedService.setToken(emailToken);
    await this.mailService.sendUserConfirmation(userSignupRequestDto.email, codeMail);
    const hashedPassword = await bcrypt.hash(userSignupRequestDto.password, 12);

    const user = await this.userModel.create({
      fullname: userSignupRequestDto.fullname,
      email: userSignupRequestDto.email,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }

  async userSignupActivate() {
    const token = this.sharedService.getToken();
    // if (!token) {
    //   throw new BadRequestException('Confirmation fail');
    // }
    const data = await this.jwtService.verifyAsync(token);
    if (!data) {
      throw new UnauthorizedException();
    }
    const user = await this.userModel.findOne({
      email: data['email'],
    });
    console.log(`check user resetPassword ${JSON.stringify(user)}`);
    user.active = true;
    user.save();
    return {
      message: 'success',
      statusCode: HttpStatus.OK,
    };
  }

  async userLogin(userLoginRequestDto: UserLoginRequestDto, response: Response) {
    const user = await this.userModel.findOne({
      email: userLoginRequestDto.email,
    });

    if (!user) {
      throw new BadRequestException('Email not found');
    }
    if (user.active !== true) {
      throw new BadRequestException('Email has registered but not active');
    }

    if (!(await bcrypt.compare(userLoginRequestDto.password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt1 = await this.jwtService.signAsync({ id: user.id });
    const jwt = await this.authService.signAccessToken(user);

    // response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success',
      jwt1: jwt1,
      jwt: jwt,
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
      console.log(`check data ${JSON.stringify(data['email'])}`);

      const user = await this.userModel.findOne({
        email: data['email'],
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
        email: data['email'],
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
    console.log('check user login google ', currentUser);
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

  async facebookLogin(user) {
    if (!user) {
      throw new BadRequestException('No user from Facebook');
    }

    console.log('check facebook user ', user);
    const userExits = await this.findUserByEmail(user.email);
    let result = null;
    if (!userExits) {
      // throw new BadRequestException('User not found');
      const fullname = `${user.firstName} ${user.lastName}`;
      const newUser = await this.userModel.create({
        fullname: fullname,
        email: user.email,
      });

      const { password, ...rest } = newUser;
      result = rest;
    }
    const currentUser = await this.findUserByEmail(user.email);
    console.log('check user login facebook ', currentUser);
    const accessToken = await this.authService.signAccessToken(currentUser);

    return {
      message: 'User information from facebook',
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
    const codeMail = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(codeMail);
    this.sharedService.setCode(codeMail);
    const emailToken = await this.authService.signVerifyToken(userResetPasswordRequestDto.email);
    this.sharedService.setToken(emailToken);
    await this.mailService.sendUserResetPassword(userResetPasswordRequestDto.email, codeMail);
    return {
      message: 'success',
      status: HttpStatus.OK,
    };
  }

  async verifyCodeEmail(code: UserConfirmCodeDto) {
    console.log('check query service ', code.code);

    const token = this.sharedService.getCode();
    if (!token) {
      throw new BadRequestException('Code expired');
    }
    if (token !== code.code) {
      throw new BadRequestException('Code confirmation fail');
    }
    return {
      message: 'Verify success',
      statusCode: HttpStatus.OK,
    };

    // const isValid = await this.authService.confirmVerifyToken(query.token);
    // if (isValid)
    //   return {
    //     message: 'Verify success',
    //   };
    // return {
    //   message: 'Verify fail',
    // };
  }

  async resetPassword(userResetPasswordDto: UserResetPasswordDto) {
    const token = this.sharedService.getToken();
    // if (!token) {
    //   throw new BadRequestException('Confirmation fail');
    // }
    if (userResetPasswordDto.password !== userResetPasswordDto.passwordConfirmed) {
      throw new BadRequestException('Confirmed password not match');
    }
    const hashedPassword = await bcrypt.hash(userResetPasswordDto.password, 12);
    const data = await this.jwtService.verifyAsync(token);
    if (!data) {
      throw new UnauthorizedException();
    }
    const user = await this.userModel.findOne({
      email: data['email'],
    });
    console.log(`check user resetPassword ${JSON.stringify(user)}`);

    await user.updateOne({ password: hashedPassword });
    return {
      success: 'success',
      statusCode: HttpStatus.OK,
    };
  }

  async verifyCodeEmailActivate(code: UserConfirmCodeDto) {
    console.log('check query service ', code.code);

    const token = this.sharedService.getCode();
    if (!token) {
      throw new BadRequestException('Code expired');
    }
    if (token !== code.code) {
      throw new BadRequestException('Code confirmation fail');
    }

    const tokenUser = this.sharedService.getToken();
    // if (!token) {
    //   throw new BadRequestException('Confirmation fail');
    // }
    const data = await this.authService.confirmVerifyToken(tokenUser);
    if (!data) {
      throw new UnauthorizedException();
    }
    const user = await this.userModel.findOne({
      email: data['email'],
    });
    user.active = true;
    user.save();
    return {
      message: 'success',
      statusCode: HttpStatus.OK,
    };
  }
}
