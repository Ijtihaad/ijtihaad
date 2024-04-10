import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { AddressService } from './address.service';
import { JwtTokenService } from '../global/services/jwt-token.service';
import { PrismaService } from '../global/services/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotificationsService } from '../notification/notifications.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersService,
    JwtTokenService,
    JwtService,
    AuthService,
    AddressService,
    NotificationsService,
  ],
})
export class UsersModule {}
