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

@Injectable()
export class ClassService {
  constructor(
    // @Inject('UserRepository')
    // private readonly userRepository: typeof User,
    private jwtService: JwtService,
    private authService: AuthService,
    private mailService: MailService,
    private sharedService: SharedService,
  ) // @InjectModel('User')
  // private readonly userModel: Model<UserModel>,
  {}
}
