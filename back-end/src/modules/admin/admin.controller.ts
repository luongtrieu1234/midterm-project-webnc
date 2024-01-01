import { Body, Controller, Get, HttpCode, Param, Post, Query, Req, Res } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from '~/others/auth/auth.service';
import { AdminService } from './admin.service';
import { AdminLoginRequestDto } from './dto/admin-login-request.dto';
import { Response, Request } from 'express';

@Controller('admin')
@ApiTags('admin')
@ApiSecurity('JWT-auth')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(200)
  adminLogin(
    @Body() adminLoginRequestDto: AdminLoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.adminService.adminLogin(adminLoginRequestDto, response);
  }

  @Post('inactivate-account/:userId')
  @HttpCode(200)
  inactivateAccount(
    @Param('userId') userId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.adminService.inactivateAccount(userId);
  }

  @Get('all-classes')
  @HttpCode(200)
  async getListClasses(
    @Req() req,
    @Query('filterOption') filterOption: string,
    @Query('sortType') sortType: string,
  ) {
    console.log('req ', req.user);
    return await this.adminService.getListClasses(sortType, filterOption);
  }

  @Post('inactivate-class/:classId')
  @HttpCode(200)
  async inactivateClass(
    @Param('classId') classId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.adminService.inactivateClass(classId);
  }

  @Post('activate-class/:classId')
  @HttpCode(200)
  async activateClass(
    @Param('classId') classId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.adminService.activateClass(classId);
  }
}
