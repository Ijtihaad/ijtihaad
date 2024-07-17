import {
  Controller,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { _Login, _Register } from '@repo/common';
import { AuthServiceController } from '@repo/shared-svc';
import { AuthService } from './auth.service';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';

@Controller()
export class AuthController implements AuthServiceController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtAuthService: JwtAuthService,
  ) { }

  @MessagePattern('auth:register')
  async register(@Payload('data') data: _Register) {
    const user = await this.authService.register(data);
    const jwt = this.jwtAuthService.encryptAuthTokens(user);
    return { user, jwt };
  }

  @MessagePattern('auth:login')
  async login(@Payload('data') data: _Login) {
    const user = await this.authService.login(data);

    const jwt = this.jwtAuthService.encryptAuthTokens(user);

    return { user, jwt };
  }

  @MessagePattern('auth:verifyAccessToken')
  async verifyAccessToken(@Payload('data') data: { accessToken: string }) {
    const result = this.jwtAuthService.decryptJwtAccessToken(data.accessToken);

    if (!result) {
      throw new UnauthorizedException('Access Token Invalid or Expired!');
    }

    const user = await this.authService.findUser({
      _id: result.userId,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @MessagePattern('auth:refreshAccessToken')
  async refreshAccessToken(@Payload('data') data: { refreshToken: string }) {
    console.log(data);

    const result = this.jwtAuthService.decryptJwtRefreshToken(
      data.refreshToken,
    );

    if (!result) {
      throw new UnauthorizedException('Access Token Invalid or Expired!');
    }

    const user = await this.authService.findUser({
      _id: result.userId,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const jwt = this.jwtAuthService.encryptAuthTokens(user);
    return { user, jwt };
  }
}
