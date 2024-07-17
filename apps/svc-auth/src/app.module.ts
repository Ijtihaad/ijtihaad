import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
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
      envFilePath: ['./.env', '../../../.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
