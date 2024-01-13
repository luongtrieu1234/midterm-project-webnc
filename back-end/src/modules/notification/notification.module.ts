import { Module, forwardRef } from '@nestjs/common';

import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { NotificationSchema } from './notification.model';
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
    // MailModule,
    forwardRef(() => UserModule),
    // RoleModule,
    // GradeModule,
    // ClassModule,
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
    // JwtModule.register({
    //   secret: 'secret-key',
    //   signOptions: { expiresIn: '1d' },
    // }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, SharedService],
  exports: [MongooseModule, NotificationService],
})
export class NotificationModule {}
