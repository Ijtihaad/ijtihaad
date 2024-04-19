import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { DrizzleService } from '../drizzle/drizzle.service';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [GoogleAuthModule, DrizzleModule, JwtAuthModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService, DrizzleService, JwtAuthService,],
})
export class AuthModule {}
