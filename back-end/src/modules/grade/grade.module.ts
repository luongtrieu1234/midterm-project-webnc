import { Module } from '@nestjs/common';

import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeSchema } from './grade.model';
import { AuthModule } from 'src/others/auth/auth.module';
import { MailModule } from 'src/others/mail/mail.module';
import { SharedService } from 'src/others/auth/shared.service';

@Module({
  imports: [
    AuthModule,
    MailModule,
    MongooseModule.forFeature([{ name: 'Grade', schema: GradeSchema }]),
    JwtModule.register({
      secret: 'secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [GradeController],
  providers: [GradeService, SharedService],
})
export class GradeModule {}
