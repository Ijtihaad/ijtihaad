import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { getAuthTokenFromContext } from '../helpers/getAuthTokenFromContext';
import { getRequestFromContext } from '../helpers/getRequestFromContext';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    this.logger.log(this.canActivate.name);

    const authHeader = getAuthTokenFromContext(context);
    const request = getRequestFromContext<{ user: any }>(context);
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const data = await this.jwtAuthService.decryptJwtAccessToken<{
      userId: string;
    }>(token);

    if (!data) {
      throw new UnauthorizedException('Access Token Invalid or Expired!');
    }

    const user = await this.authService.findUser({ id: +data.userId });
    if (!user) {
      throw new UnauthorizedException('User Not Found!');
    }
    request.user = user;
    return true;
  }
}
