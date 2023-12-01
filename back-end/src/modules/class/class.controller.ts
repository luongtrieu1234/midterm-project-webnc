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
import { CreateOrUpdateClassDto } from './dto/create-class.dto';
import { Roles } from '../role/role.decorator';
import { UserRole } from '../role/roles.enum';
import { RoleGuard } from '../role/role.guard';

@Controller('class')
@ApiTags('class')
@ApiSecurity('JWT-auth')
export class ClassController {
  constructor(
    private readonly classService: ClassService,
    private authService: AuthService,
    private sharedService: SharedService,
    private jwtService: JwtService,
  ) {}

  @Post()
  // @Roles(UserRole.TEACHER)
  // @UseGuards(RoleGuard)
  @HttpCode(201)
  async createClass(@Body() createClassDto: CreateOrUpdateClassDto) {
    return await this.classService.createClass(createClassDto);
  }

  @Patch('update')
  @HttpCode(200)
  async updateClass(@Body() updateClassDto: CreateOrUpdateClassDto) {
    return await this.classService.updateClass(updateClassDto);
  }
}
