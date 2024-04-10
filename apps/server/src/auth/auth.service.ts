import {
  AccessTokenPayload,
  RefreshTokenPayload,
  Role,
  UserCreateInput,
  UserWhereUniqueInput,
} from '@common';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { jwtConstants } from '../global/constants/jwt.constant';
import { JwtTokenService } from '../global/services/jwt-token.service';
import { PrismaService } from '../global/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async register(data: UserCreateInput) {
    const userExist = await this.prisma.user.findFirst({
      where: {
        phone: data.phone,
      },
    });

    if (userExist) {
      throw new ConflictException('User already exists with this Phone Number');
    }

    const user = await this.prisma.user.create({
      data: data,
    });

    return user;
  }

  async login(userId: string) {
    const accessTokenPayload: AccessTokenPayload = { userId };
    const refreshTokenPayload: RefreshTokenPayload = { userId };

    const accessToken = this.jwtTokenService.encryptJwtToken(
      accessTokenPayload,
      {
        expiresIn: jwtConstants.expiresAccessToken,
        secret: jwtConstants.accessSecretKey,
      },
    );

    const refreshToken = this.jwtTokenService.encryptJwtToken(
      refreshTokenPayload,
      {
        expiresIn: jwtConstants.expiresRefreshToken,
        secret: jwtConstants.refreshSecretKey,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async findUser(where: UserWhereUniqueInput) {
    const user = await this.prisma.user.findFirst({
      where: where,
      include: {
        password: true,
      },
    });
    return user;
  }

  async refreshAccessToken(refreshToken: string) {
    const refreshTokenData =
      this.jwtTokenService.decryptJwtAccessToken<RefreshTokenPayload>(
        refreshToken,
        {
          secret: jwtConstants.refreshSecretKey,
        },
      );
    if (!refreshTokenData) {
      throw new UnauthorizedException();
    }
    const user = await this.prisma.user.findFirst({
      where: { id: refreshTokenData.userId },
    });
    return user;
  }

  async createOrUpdatePassword(
    where: UserWhereUniqueInput,
    data: { value: string; userId: string },
  ) {
    const passwordExist = await this.prisma.password.findFirst({
      where: {
        user: where,
      },
    });

    const hashedPassword = await argon.hash(data.value);
    if (passwordExist) {
      await this.prisma.password.update({
        where: {
          id: passwordExist.id,
        },
        data: {
          value: hashedPassword,
          userId: data.userId,
        },
      });
    } else {
      await this.prisma.password.create({
        data: {
          value: hashedPassword,
          userId: data.userId,
        },
      });
    }

    return { message: 'Password Updated' };
  }

  async verifyPassword(hashedPassword: string, planePassword: string) {
    return await argon.verify(hashedPassword, planePassword);
  }

  async isAdminExist() {
    const user = await this.prisma.user.findFirst({
      where: {
        role: Role.ADMIN,
      },
    });
    return user;
  }
}
