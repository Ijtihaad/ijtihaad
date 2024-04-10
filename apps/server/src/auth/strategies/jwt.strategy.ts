import { AccessTokenPayload } from '@common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../global/constants/jwt.constant';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.accessSecretKey,
    });
  }
  async validate(validationPayload: AccessTokenPayload) {
    const user = await this.authService.findUser({
      id: validationPayload.userId,
    });
    if (user.blocked) {
      throw new UnauthorizedException('User Blocked By Admin');
    }
    return user;
  }
}

