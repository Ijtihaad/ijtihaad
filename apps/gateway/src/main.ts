import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from '@repo/shared-svc';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('ijtihaad::gateway');

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [process.env.CLIENT_HOST ?? ''],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8000);
  logger.debug('App is listening...');
}
bootstrap();
