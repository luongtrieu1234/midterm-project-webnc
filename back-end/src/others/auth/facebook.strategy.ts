import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';

import { config } from 'dotenv';

config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: `${process.env.SERVER_URL}/users/facebook/callback`,
      scope: 'email',

      profileFields: ['emails', 'name'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: any) {
    try {
      const { photos, name, id, emails } = profile;
      // console.log('FacebookStrategy-validate, profile:', profile);

      const user = {
        facebookId: id,
        // photo: photos[0].value,
        email: emails[0].value,
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
