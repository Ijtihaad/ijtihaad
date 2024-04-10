import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from '../global/services/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../global/constants/jwt.constant';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtTokenService } from '../global/services/jwt-token.service';
import { NotificationsService } from '../notification/notifications.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.accessSecretKey,
      signOptions: { expiresIn: jwtConstants.expiresAccessToken },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    JwtStrategy,
    AuthService,
    JwtTokenService,
    JwtService,
    NotificationsService,
  ],
})
export class AuthModule {}
