import {
  LoginEmail,
  RefreshAccessToken,
  RegisterEmail,
  Role,
  UpdatePassword,
  User,
  UserCreateInput,
} from '@common';
import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user-decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('register/email')
  async registerEmail(@Body() data: RegisterEmail) {
    this.logger.log(this.registerEmail.name);

    const isAdminExist = await this.authService.isAdminExist();

    const userData: UserCreateInput = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    };

    if (!isAdminExist) {
      userData.role = Role.ADMIN;
    } else {
      userData.role = Role.USER;
    }

    const user = await this.authService.register(userData);
    await this.authService.createOrUpdatePassword(
      { id: user.id },
      {
        userId: user.id,
        value: data.password,
      },
    );

    return this.authService.login(user.id);
  }

  @Post('login/email')
  async loginEmail(@Body() data: LoginEmail) {
    this.logger.log(this.loginEmail.name);
    console.log({ data });

    const user = await this.authService.findUser({
      email: data.email,
    });

    if (!user) {
      throw new BadRequestException('User Not Found With this Email');
    }

    if (user.blocked) {
      throw new UnauthorizedException('User Blocked By Admin');
    }
    const verifiedPassword = await this.authService.verifyPassword(
      user.password.value,
      data.password,
    );

    if (!user.password.value || !verifiedPassword) {
      throw new UnauthorizedException('Wrong Credential');
    }
    return this.authService.login(user.id);
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard)
  async updateMyPassword(
    @Body() data: UpdatePassword,
    @CurrentUser() user: User,
  ) {
    this.logger.log(this.updateMyPassword.name);
    const userData = await this.authService.findUser({ id: user.id });

    if (userData.password) {
      const verifiedPassword = await this.authService.verifyPassword(
        userData.password.value,
        data.oldPassword,
      );

      if (!userData.password.value || !verifiedPassword) {
        throw new UnauthorizedException('Wrong Credential');
      }
    }

    const password = await this.authService.createOrUpdatePassword(
      { id: user.id },
      {
        userId: user.id,
        value: data.newPassword,
      },
    );

    return password;
  }

  @Post('token/refresh')
  async refreshAccessToken(@Body() refreshAccessToken: RefreshAccessToken) {
    this.logger.log(this.refreshAccessToken.name);
    const user = await this.authService.refreshAccessToken(
      refreshAccessToken.refreshToken,
    );
    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }
    return this.authService.login(user.id);
  }
}
