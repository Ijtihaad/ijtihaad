import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

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
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule { }
