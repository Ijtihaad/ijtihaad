import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcExceptionFilter, ServiceAuthGuard } from '@repo/shared-svc';
import { UsersModule } from './users.module';

async function bootstrap() {
  const logger = new Logger('Users::Microservice');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
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
