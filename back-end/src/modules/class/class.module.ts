import { Module } from '@nestjs/common';

import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { ClassSchema } from './class.model';
import { AuthModule } from 'src/others/auth/auth.module';
import { MailModule } from 'src/others/mail/mail.module';
import { SharedService } from 'src/others/auth/shared.service';
import { UserModule } from '../users/users.module';
import { UserModel, UserSchema } from '../users/users.model';

@Module({
  imports: [
    AuthModule,
    MailModule,
    UserModule,
    MongooseModule.forFeature([{ name: 'Class', schema: ClassSchema }]),
    JwtModule.register({
      secret: 'secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ClassController],
  providers: [ClassService, SharedService],
})
export class ClassModule {}
