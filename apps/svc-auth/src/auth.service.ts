import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LocalRegister, LocalLogin, User, VerifyUserPassword, OAuthRegister, UserWhereUniqueInput } from '@repo/common';

import { ClientProxy } from '@nestjs/microservices';
import { RpcHandler, UserRpcService } from '@repo/shared-svc';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private usersRpc: UserRpcService;
  constructor(@Inject('USERS_SERVICE') private usersClient: ClientProxy) {
    this.usersRpc = RpcHandler.createRpcClient('users', this.usersClient);
  }

  async findUser(where: UserWhereUniqueInput) {
    const user = await lastValueFrom(this.usersRpc('findOne', { data: where }));
    return user;
  }

  async localRegister(data: LocalRegister) {
    const user = this.usersRpc('create', {
      data: data,
    });

    return lastValueFrom(user);
  }

  async localLogin(data: LocalLogin) {
    let user: User;

    if (data.identifier.includes('@')) {
      user = await lastValueFrom(
        this.usersRpc('findOne', { data: { email: data.identifier } }),
      );
      if (!user) {
        throw new BadRequestException('User Not Found With this Email');
      }
    } else {
      user = await lastValueFrom(
        this.usersRpc('findOne', { data: { username: data.identifier } }),
      );
      if (!user) {
        throw new BadRequestException('User Not Found With this Username');
      }
    }

    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    if (user.blocked) {
      throw new UnauthorizedException('User Blocked By Admin');
    }

    const verifiedPassword = await this.verifyUserPassword({
      userId: user.id,
      password: data.password,
    });

    if (!verifiedPassword) {
      throw new UnauthorizedException('Wrong Credential');
    }

    return user;
  }

  async oauthRegister(data: OAuthRegister) {
    const user = this.usersRpc('create', {
      data: data,
    });

    return lastValueFrom(user);
  }

  async verifyUserPassword(data: VerifyUserPassword) {
    const verifiedPassword = this.usersRpc('verifyUserPassword', { data });

    return lastValueFrom(verifiedPassword);
  }
}
