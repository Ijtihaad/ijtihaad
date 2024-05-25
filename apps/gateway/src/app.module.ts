import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RpcClient } from '@repo/shared-svc';
import { AuthController } from './auth.controller';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', './apps/app-ijtihaad/.env'],
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
  controllers: [UsersController, AuthController],
  providers: [RpcClient],
})
export class AppModule { }
