import { Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  private readonly logger = new Logger(JwtTokenService.name);
  constructor(private readonly jwtService: JwtService) {}

  encryptJwtToken(data: any, options?: JwtSignOptions): string {
    this.logger.log(this.encryptJwtToken.name);
    const tokenPayload = data;
    const token = this.jwtService.sign(tokenPayload, options);

    return token;
  }
  decryptJwtAccessToken<T extends object>(
    token: string,
    options?: JwtVerifyOptions
  ): T | null {
    this.logger.log(this.decryptJwtAccessToken.name);
    let tokenData: T | null = null;
    try {
      tokenData = this.jwtService.verify<T>(token, options);
    } catch (error: any) {
      return null;
    }
    return tokenData;
  }
}
