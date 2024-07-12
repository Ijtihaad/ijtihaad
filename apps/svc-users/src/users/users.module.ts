import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL_NAME, UserRepository, UserSchema } from '../schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_MODEL_NAME, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    ConfigService,
    UsersService,
    UserRepository,
    JwtService
  ],
})
export class UsersModule { }
