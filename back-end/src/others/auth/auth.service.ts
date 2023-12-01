import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/modules/users/users.model';
import {
  JwtPayload,
  ResetPasswordPayload,
  SignupConfirmationPayload,
  TokenType,
} from './jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //   async validateUser(email: string, password: string): Promise<any> {
  //     const user = await this.usersService.findUserByEmail(email);
  //     if (user && (await bcrypt.compare(password, user.password))) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //     return null;
  //   }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async googleAuth() {
  //   // let user: UserModel;
  //   let isExisted = false;
  //   const user = await this.usersService.findUserByEmail(email);

  //   if (isExisted) {
  //     return isExisted;
  //   }

  //   const tokens = await this.assignTokens(user.id, RoleType.USER);

  //   const authResponse: AuthResponse = {
  //     accessToken: tokens.accessToken,
  //     refreshToken: tokens.refreshToken,
  //     imgUrl: user.img_url,
  //     username: user.username,
  //     userId: user.id,
  //     fullname: user.fullname,
  //     gender: user.gender || '',
  //     email: user.email,
  //   };

  //   return authResponse;
  // }

  async signAccessToken(user: UserModel): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }

  async signVerifyToken(user: string) {
    const payload = {
      email: user,
    };

    return this.jwtService.sign(payload);
  }

  async confirmVerifyToken(token) {
    try {
      console.log(`check token `, token);
      return await this.jwtService.verifyAsync(token);
    } catch (err) {
      console.log('Error token ', err);
      throw new BadRequestException(err);
    }
  }

  async signResetPasswordToken(user: string) {
    const payload = {
      email: user,
    };

    return this.jwtService.sign(payload);
  }
}
