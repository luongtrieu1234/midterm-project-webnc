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

import { GradeService } from './grade.service';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../others/auth/auth.service';
import { SharedService } from 'src/others/auth/shared.service';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
@ApiTags('users')
@ApiSecurity('JWT-auth')
export class GradeController {
  constructor(
    private readonly usersService: GradeService,
    private authService: AuthService,
    private sharedService: SharedService,
    private jwtService: JwtService,
  ) {}
}
