import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { JamasController } from './jamas.controller';
import { JamasService } from './jamas.service';

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
  ],
  controllers: [JamasController],
  providers: [JamasService],
})
export class JamasModule { }
