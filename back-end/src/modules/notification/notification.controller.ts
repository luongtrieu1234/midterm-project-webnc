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

import { NotificationService } from './notification.service';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../others/auth/auth.service';
import { SharedService } from 'src/others/auth/shared.service';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../role/role.decorator';
import { UserRole } from '../role/roles.enum';
import { RoleGuard } from '../role/role.guard';
import { AuthGuardCustom } from 'src/others/auth/auth.guard';
import { Param } from '@nestjs/common';

@Controller('notification')
@ApiTags('notification')
@ApiSecurity('JWT-auth')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService, // private authService: AuthService,
  ) // private sharedService: SharedService,
  // private jwtService: JwtService,
  {}

  @Get(':id')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  async getListNotifications(@Req() req, @Param('id') id: string) {
    return await this.notificationService.getNotificationDetail(id);
  }
}
