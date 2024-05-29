import {
  Controller,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LocalLogin, LocalRegister, User } from '@repo/common';
import { AuthServiceController } from '@repo/shared-svc';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';

@Controller()
export class AuthController implements AuthServiceController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @MessagePattern('auth:localRegister')
  async localRegister(@Payload('data') data: LocalRegister) {
    const user = await this.authService.localRegister(data);
    const jwt = this.jwtAuthService.encryptAuthTokens(user);
    return { user, jwt };
  }

  @MessagePattern('auth:localLogin')
  async localLogin(@Payload('data') data: LocalLogin) {
    const user = await this.authService.localLogin(data);

    const jwt = this.jwtAuthService.encryptAuthTokens(user);

    return { user, jwt };
  }

  @MessagePattern('auth:googleUrl')
  async googleUrl() {
    const url = await this.googleAuthService.getAuthUrl();
    return { authUrl: url };
  }

  @MessagePattern('auth:googleLogin')
  async googleLogin(@Payload('data') data: { code: string }) {
    const googleUser = await this.googleAuthService.validateUser(data.code);
    if (!googleUser) {
      throw new UnauthorizedException('Google Auth Filled');
    }

    let user: User = await this.authService.findUser({
      email: googleUser.email,
    });

    if (!user) {
      user = await this.authService.oauthRegister({
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        picture: googleUser.picture,
        emailVerified: googleUser.email_verified,
        email: googleUser.email,
      });
    }

    if (user.blocked) {
      throw new UnauthorizedException('User Blocked By Admin');
    }

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
      id: result.userId,
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
      id: result.userId,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const jwt = this.jwtAuthService.encryptAuthTokens(user);
    return { user, jwt };
  }
}
