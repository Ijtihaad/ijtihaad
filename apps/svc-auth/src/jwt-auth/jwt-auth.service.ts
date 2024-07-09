import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenPayload,
  JwtAuthToken,
  RefreshTokenPayload,
  UserRole,
} from '@repo/common';
import { jwtConstants } from './jwt-auth.constant';

@Injectable()
export class JwtAuthService {
  private readonly logger = new Logger(JwtAuthService.name);
  constructor(private readonly jwtService: JwtService) { }

  encryptAuthTokens(user: { _id?: string; role: UserRole }): JwtAuthToken {
    this.logger.log(this.encryptAuthTokens.name);

    const jwt = {
      accessToken: this.jwtService.sign(
        {
          userId: user._id,
          role: user.role,
        },
        {
          secret: jwtConstants.accessSecretKey,
          expiresIn: jwtConstants.accessTokenLifetime,
        },
      ),

      refreshToken: this.jwtService.sign(
        {
          userId: user._id,
        },
        {
          secret: jwtConstants.refreshSecretKey,
          expiresIn: jwtConstants.refreshTokenLifetime,
        },
      ),
    };

    return jwt;
  }

  decryptJwtAccessToken(accessToken: string): AccessTokenPayload | null {
    this.logger.log(this.decryptJwtAccessToken.name);
    const tokenData = this.jwtService.verify<AccessTokenPayload>(accessToken, {
      secret: jwtConstants.accessSecretKey,
    });
    return tokenData;
  }

  decryptJwtRefreshToken(accessToken: string): RefreshTokenPayload | null {
    this.logger.log(this.decryptJwtRefreshToken.name);
    const tokenData = this.jwtService.verify<RefreshTokenPayload>(accessToken, {
      secret: jwtConstants.refreshSecretKey,
    });
    return tokenData;
  }
}
