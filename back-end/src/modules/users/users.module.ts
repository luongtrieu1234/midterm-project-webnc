import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { usersProviders } from './users.providers';
// import { DatabaseModule } from 'src/database/database.module';
import { User } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { AuthModule } from 'src/others/auth/auth.module';
import { MailModule } from 'src/others/mail/mail.module';
import { SharedService } from 'src/others/auth/shared.service';

@Module({
  imports: [
    // DatabaseModule,
    AuthModule,
    MailModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    SharedService,
    // ...usersProviders,
    // {
    //   provide: 'UserRepository',
    //   useValue: User,
    // },
  ],
})
export class UserModule {}
