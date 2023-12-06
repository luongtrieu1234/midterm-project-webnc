import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { RoleModel, RoleSchema } from './role.model';
import { AuthModule } from 'src/others/auth/auth.module';
import { MailModule } from 'src/others/mail/mail.module';

@Module({
  imports: [
    AuthModule,
    MailModule,
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
  ],
  providers: [RoleModel],
  exports: [MongooseModule],
})
export class RoleModule {}
