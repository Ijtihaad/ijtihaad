import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@repo/shared-svc';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('app-ijtihaad::App');

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [process.env.CLIENT_HOST ?? ''],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8000);
  logger.debug('App is listening...');
}
bootstrap();
