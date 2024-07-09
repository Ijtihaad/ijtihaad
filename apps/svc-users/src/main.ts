import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcExceptionFilter } from '@repo/shared-svc';
import { UsersModule } from './users.module';

async function bootstrap() {
  const logger = new Logger('Users::Microservice');
  const users = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_SERVER_URL!],
      },
    },
  );
  users.useGlobalFilters(new RpcExceptionFilter());
  await users.listen();
  logger.debug('Microservice is listening...');
}
bootstrap();