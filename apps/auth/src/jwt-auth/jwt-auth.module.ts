import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt-auth.constant';
import { JwtAuthService } from './jwt-auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.accessSecretKey,
      signOptions: { expiresIn: jwtConstants.accessTokenLifetime },
    }),
  ],
  controllers: [],
  providers: [JwtAuthService, JwtService],
})
export class JwtAuthModule {}
