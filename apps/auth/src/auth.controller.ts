import {
  Body,
  Get,
  Post,
  UsePipes,
  Controller,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';
import { LocalLoginPipe } from './pipes/local-login.pipe';
import { localRegisterPipe } from './pipes/local-register.pipe';
import { LocalLogin, LocalRegister } from '@lib/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly authService: AuthService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post('/local/register')
  @UsePipes(localRegisterPipe)
  async localRegister(@Body() data: LocalRegister) {
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

  @Post('/local/login')
  @UsePipes(LocalLoginPipe)
  async localLogin(@Body() data: LocalLogin) {
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

  @Get('/google/url')
  async googleUrl() {
    const url = await this.googleAuthService.getAuthUrl();
    return { authUrl: url };
  }

  @Post('/google/login')
  async googleLogin(@Body() data: { code: string }) {
    console.log({ data });

    const googleUser = await this.googleAuthService.validateUser(data.code);
    if (!googleUser) {
      throw new UnauthorizedException('Google Auth Filled');
    }

    const email = await this.authService.findEmail(googleUser.email);

    let user: any;
    if (email) {
      user = await this.authService.findUser({
        id: email.userId,
      });
    } else {
      user = await this.authService.oauthRegister({
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        picture: googleUser.picture,
        email: {
          value: googleUser.email,
          verified: googleUser.email_verified,
        },
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

  @Post('token/refresh')
  async refreshAccessToken(
    @Body() refreshAccessToken: { refreshToken: string },
  ) {
    console.log(refreshAccessToken);

    const data = await this.jwtAuthService.decryptJwtRefreshToken<{
      userId: string;
    }>(refreshAccessToken.refreshToken);

    if (!data) {
      throw new UnauthorizedException('Access Token Invalid or Expired!');
    }

    let user = await this.authService.findUser({
      id: data.userId,
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
