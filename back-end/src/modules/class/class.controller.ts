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
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Roles } from '../role/role.decorator';
import { UserRole } from '../role/roles.enum';
import { RoleGuard } from '../role/role.guard';
import { AuthGuardCustom } from 'src/others/auth/auth.guard';
import { SendInvitationDto } from './dto/send-invitation.dto';

@Controller('class')
@ApiTags('class')
@ApiSecurity('JWT-auth')
export class ClassController {
  constructor(
    private readonly classService: ClassService,
    private authService: AuthService,
    private sharedService: SharedService, // private jwtService: JwtService,
  ) {}

  @Post()
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  // @UseGuards(RoleGuard)
  @HttpCode(201)
  async createClass(@Body() createClassDto: CreateClassDto) {
    return await this.classService.createClass(createClassDto);
  }

  @Patch('update')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  async updateClass(@Body() updateClassDto: UpdateClassDto) {
    return await this.classService.addUsersToClass(updateClassDto);
  }

  @Get('all')
  @UseGuards(AuthGuardCustom)
  @Roles(UserRole.TEACHER)
  // @UseGuards(RoleGuard)
  @HttpCode(200)
  async getListClasses(@Req() req) {
    console.log('req ', req.user);
    return await this.classService.getListClasses();
  }

  @Get('class-owner')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  // @UseGuards(RoleGuard)
  @HttpCode(200)
  async getListClassesOwn(@Req() req) {
    console.log('req ', req.user);
    return await this.classService.getListClassesOwn(req.user.id);
  }

  @Get('users-list')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  // @UseGuards(RoleGuard)
  @HttpCode(200)
  async getListClassUsers(@Query() query) {
    console.log('req ', query);
    return await this.classService.getListClassUsers(query.classId);
  }

  @Post('invite')
  @HttpCode(200)
  async sendInvite(@Body() sendInvitationDto: SendInvitationDto) {
    return await this.classService.sendInvite(sendInvitationDto);
  }

  @Post('accept-invitation')
  @HttpCode(200)
  async acceptInvitation(@Body() body) {
    return await this.classService.acceptInvitation(body);
  }
}
