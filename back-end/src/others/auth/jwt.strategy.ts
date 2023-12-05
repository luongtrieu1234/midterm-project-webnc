import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserModel } from 'src/modules/users/users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserModel>,
    private authSerVice: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret-key',
    });
  }

  async validate(payload: any, done: VerifiedCallback): Promise<any> {
    console.log('validate ', payload);
    const user = await this.getUserByEmail(payload.email);
    // const status = user?.status ?? '';
    // if (status !== UserStatus.ACTIVE && status !== UserStatus.PENDING) {
    //   return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
    // }
    const context = {
      user,
    };
    return done(null, user, payload.iat);
    // return user;
  }

  private async getUserByEmail(email: string): Promise<UserModel> {
    return await this.userModel.findOne({
      email: email,
    });
  }
}
