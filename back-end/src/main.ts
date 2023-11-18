import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'https://midterm-project-webnc.vercel.app',
    credentials: true,
  });
  setupSwagger(app);
  await app.listen(5000);
}
bootstrap();
