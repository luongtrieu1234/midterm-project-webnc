import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/users.module';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './others/auth/auth.module';
import { GoogleStrategy } from './others/auth/google.strategy';
import { FacebookStrategy } from './others/auth/facebook.strategy';
import { MailModule } from './others/mail/mail.module';
import { ClassModule } from './modules/class/class.module';
import { RoleModule } from './modules/role/role.module';
import { GradeModule } from './modules/grade/grade.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './modules/role/role.guard';
import { JwtStrategy } from './others/auth/jwt.strategy';
import { AuthGuardCustom } from './others/auth/auth.guard';
// import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ClassModule,
    RoleModule,
    GradeModule,
    MailModule,
    NestjsConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb+srv://admin1:admin1@cluster0.1npefek.mongodb.net/midterm'),
    JwtModule,
    // ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GoogleStrategy,
    FacebookStrategy,
    JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuardCustom,
    // },
  ],
})
export class AppModule {}
