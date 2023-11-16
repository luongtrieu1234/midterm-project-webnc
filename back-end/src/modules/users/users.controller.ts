import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSignupRequestDto } from './dto/user-signup-request.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserUpdateProfileRequestDto } from './dto/user-update-profile-request.dto';

@Controller('users')
@ApiTags('users')
@ApiSecurity('JWT-auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('signup')
  @HttpCode(201)
  userSignup(@Body() userSignupRequestDto: UserSignupRequestDto) {
    return this.usersService.userSignup(userSignupRequestDto);
  }

  @Post('login')
  @HttpCode(200)
  userLogin(
    @Body() userLoginRequestDto: UserLoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.usersService.userLogin(userLoginRequestDto, response);
  }

  @Get('me')
  @HttpCode(200)
  userProfile(@Req() request: Request) {
    return this.usersService.userProfile(request);
  }

  @Patch('update')
  @HttpCode(200)
  userUpdateProfile(
    @Body() userUpdateProfileRequestDto: UserUpdateProfileRequestDto,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    return this.usersService.userUpdateProfile(
      userUpdateProfileRequestDto,
      response,
      request,
    );
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }
}
