import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { LocalLogin, LocalRegister, User, localLoginSchema, localRegisterSchema } from '@repo/common';
import { AuthServiceController, ServiceRequest, ValidationPipe } from '@repo/shared-svc';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';

@Controller('auth')
export class AuthController implements AuthServiceController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly jwtAuthService: JwtAuthService,
  ) { }

  @Post('local/register')
  @UsePipes(ValidationPipe(localRegisterSchema))
  async localRegister(@Body() { data }: ServiceRequest<LocalRegister>) {
    const user = await this.authService.localRegister(data);
    const jwt = {
      accessToken: await this.jwtAuthService.encryptJwtAccessToken({
        userId: user.id,
      }),
      refreshToken: await this.jwtAuthService.encryptJwtRefreshToken({
        userId: user.id,
      }),
    };

    return { user, jwt };
  }

  @Post('local/login')
  @UsePipes(ValidationPipe(localLoginSchema))
  async localLogin(@Body() { data }: ServiceRequest<LocalLogin>) {
    const user = await this.authService.localLogin(data);

    const jwt = {
      accessToken: await this.jwtAuthService.encryptJwtAccessToken({
        userId: user.id,
      }),
      refreshToken: await this.jwtAuthService.encryptJwtRefreshToken({
        userId: user.id,
      }),
    };

    return { user, jwt };
  }

  @Get('google/url')
  async googleUrl() {
    const url = await this.googleAuthService.getAuthUrl();
    return { authUrl: url };
  }

  @Post('google/login')
  async googleLogin(@Body() { data }: ServiceRequest<{ code: string }>) {
    const googleUser = await this.googleAuthService.validateUser(data.code);
    if (!googleUser) {
      throw new UnauthorizedException('Google Auth Filled');
    }

    let user: User = await this.authService.findUser({ email: googleUser.email });

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

    const jwt = {
      accessToken: await this.jwtAuthService.encryptJwtAccessToken({
        userId: user.id,
      }),
      refreshToken: await this.jwtAuthService.encryptJwtRefreshToken({
        userId: user.id,
      }),
    };

    return { user, jwt };
  }

  @Post('token/verify')
  async verifyAccessToken(
    @Body() { data }: ServiceRequest<{ accessToken: string }>,
  ) {
    const result = await this.jwtAuthService.decryptJwtAccessToken<{
      userId: string;
    }>(data.accessToken);

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

  @Post('token/refresh')
  async refreshAccessToken(
    @Body() { data }: ServiceRequest<{ refreshToken: string }>,
  ) {
    console.log({ data });

    const result = await this.jwtAuthService.decryptJwtRefreshToken<{
      userId: string;
    }>(data.refreshToken);

    if (!result) {
      throw new UnauthorizedException('Access Token Invalid or Expired!');
    }

    const user = await this.authService.findUser({
      id: result.userId,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const jwt = {
      accessToken: await this.jwtAuthService.encryptJwtAccessToken({
        userId: user.id,
      }),
      refreshToken: await this.jwtAuthService.encryptJwtRefreshToken({
        userId: user.id,
      }),
    };
    return { user, jwt };
  }
}
