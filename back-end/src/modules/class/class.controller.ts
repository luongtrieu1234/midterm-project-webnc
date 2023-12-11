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
import { Param } from '@nestjs/common';

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
  async createClass(@Req() req, @Body() createClassDto: CreateClassDto) {
    return await this.classService.createClass(req.user.id, createClassDto);
  }

  @Patch('update')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  async updateClass(@Body() updateClassDto: UpdateClassDto) {
    return await this.classService.addUsersToClass(updateClassDto);
  }

  @Get('all')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async getListClasses(@Req() req) {
    console.log('req ', req.user);
    return await this.classService.getListClasses();
  }

  @Get('class-detail')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async getClassById(
    @Req() req,
    @Query('classId') classId: string
    ) {
    return await this.classService.getClassWithUserInfo(req.user.email, classId);
  }

  @Get('classes-of-user')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async getListClassesOfUser(@Req() req) {
    console.log('req ', req.user);
    return await this.classService.getListClassesOfUser(req.user.id);
  }

  @Get('classes-as-teacher')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async getListTeacherClasses(@Req() req) {
    console.log('req ', req.user);
    return await this.classService.getListTeacherClassesByUserId(req.user.id);
  }

  @Get('classes-as-student')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async getListStudentClasses(@Req() req) {
    console.log('req ', req.user);
    return await this.classService.getListStudentClassesByUserId(req.user.id);
  }

  @Get('users-list')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async getListUsersOfClass(@Query('classId') classId: string) {
    console.log('req ', JSON.stringify(classId));
    return await this.classService.getListUsersOfClass(classId);
  }

  @Get('user-role')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  async getUserRoleInClass(@Query('classId') classId: string, @Req() req) {
    console.log('req ', JSON.stringify(classId), req.user);
    return await this.classService.getUserRoleInClass(classId, req.user.id);
  }

  @Post('invite-tearcher')
  @HttpCode(200)
  async sendInviteTearcher(@Body() sendInvitationDto: SendInvitationDto) {
    return await this.classService.sendInviteTeacher(sendInvitationDto);
  }

  @Post('invite-student')
  @HttpCode(200)
  async sendInviteStudent(@Body() sendInvitationDto: SendInvitationDto) {
    return await this.classService.sendInviteStudent(sendInvitationDto);
  }

  @Get('accept-join-class-by-teacher')
  @HttpCode(200)
  async acceptJoinClassByTeacher(
    @Res() res: Response,
    @Query('token') token,
    @Query('className') className,
  ) {
    const inforClass = await this.classService.acceptJoinClassByTeacher(token, className);
    const urlJoinClass = `${process.env.CLIENT_URL}/home-page`;
    return res.redirect(urlJoinClass);
  }

  @Get('accept-join-class-by-student')
  @HttpCode(200)
  async acceptJoinClassByStudent(
    @Res() res: Response,
    @Query('token') token,
    @Query('className') className,
  ) {
    const inforClass = await this.classService.acceptJoinClassByStudent(token, className);
    const urlJoinClass = `${process.env.CLIENT_URL}/home-page`;
    return res.redirect(urlJoinClass);
  }
}
