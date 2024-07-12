import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import Joi from 'joi';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NATS_SERVER_URL: Joi.string().required(),
        JWT_SERVICE_SECRETE_KEY: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
      envFilePath: ['./.env', '../../../.env'],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('DATABASE_NAME'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    UsersModule,
  ],
})
export class AppModule { }
