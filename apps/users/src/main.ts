import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcExceptionFilter } from '@lib/common/filters';

async function bootstrap() {
  const logger = new Logger('Users::Microservice');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_SERVER_URL],
      },
    },
  );
  app.useGlobalFilters(new RpcExceptionFilter());

  await app.listen();
  logger.debug('Microservice is listening...');
}
bootstrap();
