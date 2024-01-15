import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  console.log('process.env.SERVER_PORT ', process.env.SERVER_PORT);
  console.log('process.env.CLIENT_URL ', process.env.CLIENT_URL);
  setupSwagger(app);
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
