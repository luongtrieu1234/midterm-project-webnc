import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/users.module';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    UserModule,
    NestjsConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://admin1:admin1@cluster0.1npefek.mongodb.net/midterm',
    ),
    JwtModule,
    // ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
