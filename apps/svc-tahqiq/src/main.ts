import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcExceptionFilter } from '@repo/shared-svc';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Jama::Microservice');
  const tahqiq = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_SERVER_URL!],
      },
    },
  );
  tahqiq.useGlobalFilters(new RpcExceptionFilter());
  await tahqiq.listen();
  logger.debug('Microservice is listening...');
}
bootstrap();