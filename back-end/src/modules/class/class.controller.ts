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
import { ApiConsumes, ApiProperty, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
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
import { ConfirmClassCodeDto } from './dto/confirm-class-code.dto';
import { UpdateInformationClassDto } from './dto/update-name-description.dto';

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
  // @Roles(UserRole.USER)
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

  @Post('update-information')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  async updateInformationClass(@Body() updateInformationClassDto: UpdateInformationClassDto) {
    return await this.classService.updateInformationClass(updateInformationClassDto);
  }

  @Get('all')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  @ApiQuery({
    name: 'sortType',
    description:
      'sortType dùng cho việc sắp xếp các lớp theo thứ tự tăng dần hoặc giảm dần có giá trị (asc, desc) theo thời gian tạo lớp',
    required: false,
  })
  @ApiQuery({
    name: 'filterOption',
    description:
      'filterOption dùng cho việc lọc các lớp theo các tiêu chí có giá trị (all, active, inactive)',
    required: false,
  })
  async getListClasses(
    @Req() req,
    @Query('filterOption') filterOption: string,
    @Query('sortType') sortType: string,
  ) {
    console.log('req ', req.user);
    return await this.classService.getListClasses(sortType, filterOption);
  }

  @Get('class-detail')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async getClassById(@Query('classId') classId: string) {
    return await this.classService.getClassWithUserInfo(classId);
  }

  @Get('class-link')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async getLinkInvitation(@Query('classId') classId: string, @Req() req) {
    return await this.classService.getLinkInvitation(req.user.email, classId);
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

  @Get('all-classes-of-user')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async getAllClassesOfUser(@Req() req) {
    console.log('req ', req.user);
    return await this.classService.getAllClassesOfUser(req.user.id);
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

  @Post('confirm-class-code')
  @HttpCode(200)
  async confirmClassCode(@Body() dto: ConfirmClassCodeDto, @Req() req, @Res() res: Response) {
    await this.classService.confirmClassCode(dto, req.user.email);
    const urlJoinClass = `${process.env.CLIENT_URL}/home-page`;
    return res.redirect(urlJoinClass);
  }
}
