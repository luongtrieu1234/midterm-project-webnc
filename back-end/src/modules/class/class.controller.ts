import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiConsumes, ApiProperty, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';

import { ClassService } from './class.service';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../others/auth/auth.service';
import { SharedService } from 'src/others/auth/shared.service';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
@ApiTags('users')
@ApiSecurity('JWT-auth')
export class ClassController {
  constructor(
    private readonly usersService: ClassService,
    private authService: AuthService,
    private sharedService: SharedService,
    private jwtService: JwtService,
  ) {}
}
