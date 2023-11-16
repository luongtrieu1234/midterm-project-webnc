import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { usersProviders } from './users.providers';
// import { DatabaseModule } from 'src/database/database.module';
import { User } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';

@Module({
  imports: [
    // DatabaseModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    // ...usersProviders,
    // {
    //   provide: 'UserRepository',
    //   useValue: User,
    // },
  ],
})
export class UserModule {}
