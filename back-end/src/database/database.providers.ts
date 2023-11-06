// import * as mongoose from 'mongoose';
//
// export const databaseProviders = [
//   {
//     provide: 'DATABASE_CONNECTION',
//     useFactory: (): Promise<typeof mongoose> =>
//       mongoose.connect('mongodb://localhost/nest'),
//   },
// ];

import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { ConfigService } from '../config/config.service';
import { User } from 'src/modules/users/users.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.sequelizeOrmConfig,
        dialect: configService.sequelizeOrmConfig.dialect as Dialect,
      });

      // Models
      sequelize.addModels([User]);

      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
