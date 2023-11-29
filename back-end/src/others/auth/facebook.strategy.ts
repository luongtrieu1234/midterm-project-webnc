import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-facebook';

import { config } from 'dotenv';

config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: 'http://127.0.0.1:5000/users/facebook/callback',
      scope: 'email',

      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<VerifyCallback> {
    try {
      const { photos, name, id } = profile;

      const user = {
        facebookId: id,
        photo: photos[0].value,
        firstName: name.familyName,
        lastName: name.givenName,
        accessToken,
      };
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
}
