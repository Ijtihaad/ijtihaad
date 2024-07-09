import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcExceptionFilter } from '@repo/shared-svc';
import { JamasModule } from './jamas.module';

async function bootstrap() {
  const logger = new Logger('Jama::Microservice');
  const jamas = await NestFactory.createMicroservice<MicroserviceOptions>(
    JamasModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_SERVER_URL!],
      },
    },
  );
  jamas.useGlobalFilters(new RpcExceptionFilter());
  await jamas.listen();
  logger.debug('Microservice is listening...');
}
bootstrap();