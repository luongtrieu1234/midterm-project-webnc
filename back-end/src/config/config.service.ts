import config from 'config';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig() {
    return config.database();
  }

  // get jwtConfig() {
  //   return {
  //     privateKey: config.jwtPrivateKey(),
  //   };
  // }

  // get googleConfig() {
  //   return config.google();
  // }
}
