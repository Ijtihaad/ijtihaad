import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcExceptionFilter } from '@repo/shared-svc';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const logger = new Logger('Auth::Microservice');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_SERVER_URL!],
      },
    },
  );
  app.useGlobalFilters(new RpcExceptionFilter());

  await app.listen();
  logger.debug('Microservice is listening...');
}
bootstrap();
