import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DrizzleModule, DrizzleService } from '@lib/common';
import { UserQueryParser } from './parsers/user-query.parser';
import { JwtAuthService } from '../auth/jwt-auth/jwt-auth.service';

@Module({
  imports: [DrizzleModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtService,
    AuthService,
    DrizzleService,
    UserQueryParser,
    JwtAuthService
  ],
})
export class UsersModule {}
