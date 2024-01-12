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

import { UsersService } from './users.service';
import { UserSignupRequestDto } from './dto/user-signup-request.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserUpdateProfileRequestDto } from './dto/user-update-profile-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../others/auth/auth.service';
import { UserResetPasswordRequestDto } from './dto/user-reset-passowrd-request.dto';
import { UserResetPasswordDto } from './dto/user-reset-passowrd.dto';
import { SharedService } from 'src/others/auth/shared.service';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserModel } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { UserConfirmCodeDto } from './dto/user-confirm-code.dto';
import { AuthGuardCustom } from 'src/others/auth/auth.guard';
import { MapStudentIdToAccountDto } from './dto/map-student-account.dto';
import { NotificationService } from '../notification/notification.service';

@Controller('users')
@ApiTags('users')
@ApiSecurity('JWT-auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
    private sharedService: SharedService,
    // private jwtService: JwtService,
    @InjectModel('User')
    private readonly userModel: Model<UserModel>,
  ) {}

  @Post('signup')
  @HttpCode(201)
  userSignupRequest(@Body() userSignupRequestDto: UserSignupRequestDto) {
    return this.usersService.userSignupRequest(userSignupRequestDto);
  }

  @Post('activate')
  @HttpCode(201)
  async userSignup() {
    return await this.usersService.userSignupActivate();
  }

  @Post('reactivate')
  async reactivateSignupRequest(@Body() userResetPasswordRequestDto: UserResetPasswordRequestDto) {
    return await this.usersService.reactivateSignupRequest(userResetPasswordRequestDto);
  }

  @Get('/confirm-signup')
  async verifyEmailSignUp(@Res() res: Response, @Query('token') token) {
    await this.usersService.userSignup(token);
    const urlJoinClass = `${process.env.CLIENT_URL}/sign-in`;
    return res.redirect(urlJoinClass);
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
  // @UseGuards(AuthGuardCustom)
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
    return this.usersService.userUpdateProfile(userUpdateProfileRequestDto, response, request);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }

  @Get('')
  @HttpCode(200)
  userHomePage(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    return this.usersService.userHomePage(request, response);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    // return 'sss';
    // return this.usersService.googleLogin(req);

    const googleLoginResponse = await this.usersService.googleLogin(req);
    const redirectUrl = `${process.env.CLIENT_URL}/sign-in-google?jwt=${googleLoginResponse.accessToken}`;

    return res.redirect(redirectUrl);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(@Req() req) {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request, @Res() res: Response) {
    const facebookLoginResponse = await this.usersService.facebookLogin(req.user);
    const redirectUrl = `${process.env.CLIENT_URL}/sign-in-google?jwt=${facebookLoginResponse.accessToken}`;
    return res.redirect(redirectUrl);
  }

  @Get('/confirm-reset-password')
  async confirmResetPassword(@Res() res: Response, @Query('token') token) {
    await this.usersService.userResetPassword(token);
    const urlJoinClass = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    return res.redirect(urlJoinClass);
  }

  // @Get('/confirm')
  // async verifyEmail(@Query() query) {
  //   console.log('check query controller ', JSON.stringify(query));
  //   // return await this.usersService.verifyEmail(query.token);
  //   // console.log('check query service ', JSON.stringify(query));
  //   const isValid = await this.authService.confirmVerifyToken(query.token);
  //   if (isValid)
  //     return {
  //       message: 'Verify success',
  //     };
  //   return {
  //     message: 'Verify fail',
  //   };
  // }
  @Post('/reset-request')
  async resetPasswordRequest(@Body() userResetPasswordRequestDto: UserResetPasswordRequestDto) {
    return await this.usersService.resetPasswordRequest(userResetPasswordRequestDto);
  }

  @Post('/reset')
  async resetPassword(@Body() userResetPasswordDto: UserResetPasswordDto) {
    return await this.usersService.resetPassword(userResetPasswordDto, userResetPasswordDto.token);
  }

  @Post('/confirm-code')
  async confirmCodeMail(@Body() code: UserConfirmCodeDto) {
    return await this.usersService.verifyCodeEmail(code);
  }

  @Post('/confirm-code-sign-up')
  async confirmCodeMailSignup(@Body() code: UserConfirmCodeDto) {
    return await this.usersService.verifyCodeEmailActivate(code);
  }

  @Post('map-student')
  @HttpCode(200)
  @UseGuards(AuthGuardCustom)
  async mapStudentIdToAccount(@Body() dto: MapStudentIdToAccountDto, @Req() req) {
    const userId = req.user.id;
    return await this.usersService.mapStudentIdToAccount(dto.studentId, userId);
  }

  @Get('list-notifications')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  async getListNotifications(@Req() req) {
    return await this.usersService.getListNotifications(req.user.id);
  }
}
