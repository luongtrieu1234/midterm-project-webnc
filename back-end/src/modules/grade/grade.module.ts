import { Module, forwardRef } from '@nestjs/common';

import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeSchema } from './grade.model';
import { AuthModule } from 'src/others/auth/auth.module';
import { MailModule } from 'src/others/mail/mail.module';
import { SharedService } from 'src/others/auth/shared.service';
import { GradeCompositionSchema } from './grade-composition.model';
import { UserModule } from '../users/users.module';
import { ClassModule } from '../class/class.module';
import { GradeStructureSchema } from './grade-structure.model';
import { CommentSchema } from './comment.model';

@Module({
  imports: [
    AuthModule,
    MailModule,
    forwardRef(() => ClassModule),
    UserModule,
    MongooseModule.forFeature([{ name: 'Grade', schema: GradeSchema }]),
    MongooseModule.forFeature([{ name: 'GradeComposition', schema: GradeCompositionSchema }]),
    MongooseModule.forFeature([{ name: 'GradeStructure', schema: GradeStructureSchema }]),
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    // JwtModule.register({
    //   secret: 'secret-key',
    //   signOptions: { expiresIn: '1d' },
    // }),
  ],
  controllers: [GradeController],
  providers: [GradeService, SharedService],
  exports: [MongooseModule],
})
export class GradeModule {}
