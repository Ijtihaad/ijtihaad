import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RpcClient } from '@repo/shared-svc';
import Joi from 'joi'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';

@Module({
  imports: [
    GoogleAuthModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NATS_SERVER_URL: Joi.string().required(),
        JWT_ACCESS_SECRETE_KEY: Joi.string().required(),
        JWT_REFRESH_SECRETE_KEY: Joi.string().required(),
        JWT_ACCESS_LIFETIME: Joi.string().required(),
        JWT_REFRESH_LIFETIME: Joi.string().required(),
        JWT_SERVICE_SECRETE_KEY: Joi.string().required(),
      }),
      envFilePath: ['./.env'],
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
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService, JwtAuthService, RpcClient],
})
export class AuthModule { }
