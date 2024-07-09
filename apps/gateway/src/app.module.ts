import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RpcClient } from '@repo/shared-svc';
import Joi from 'joi';
import { AuthController } from './auth.controller';
import { JamasController } from './jamas.controller';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NATS_SERVER_URL: Joi.string().required(),
        JWT_SERVICE_SECRETE_KEY: Joi.string().required(),
      }),
      envFilePath: ['./.env', '../../../.env'],
    }),

    ClientsModule.register([
      {
        name: 'RPC_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_SERVER_URL!],
        },
      },
    ]),
  ],
  controllers: [
    AuthController,
    UsersController,
    JamasController,
  ],
  providers: [RpcClient],
})
export class AppModule { }
