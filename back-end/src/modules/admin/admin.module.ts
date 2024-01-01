import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { AuthModule } from 'src/others/auth/auth.module';
import { MailModule } from 'src/others/mail/mail.module';
import { SharedService } from 'src/others/auth/shared.service';
import { UserModule } from '../users/users.module';
import { UserModel, UserSchema } from '../users/users.model';
import { RoleModule } from '../role/role.module';
import { GradeModule } from '../grade/grade.module';
import { ClassModule } from '../class/class.module';

@Module({
  imports: [
    AuthModule,
    MailModule,
    UserModule,
    RoleModule,
    GradeModule,
    ClassModule,
    // MongooseModule.forFeature([{ name: 'Class', schema: ClassSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService, SharedService],
  exports: [AdminService],
})
export class AdminModule {}
