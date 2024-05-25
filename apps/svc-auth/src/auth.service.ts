import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { LocalLogin, LocalRegister, OAuthRegister, User, UserWhereUniqueInput, VerifyUserPassword } from '@repo/common';

import { RpcClient, UserRpcService } from '@repo/shared-svc';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private usersRpc: UserRpcService;
  constructor(private rpcClient: RpcClient) {
    this.usersRpc = this.rpcClient.createRpcClient('users')
  }

  async findUser(where: UserWhereUniqueInput) {
    const user = await lastValueFrom(this.usersRpc('findOne', where));
    return user;
  }

  async localRegister(data: LocalRegister) {
    const user = this.usersRpc('create', data);

    return lastValueFrom(user);
  }

  async localLogin(data: LocalLogin) {
    let user: User;

    if (data.identifier.includes('@')) {
      user = await lastValueFrom(
        this.usersRpc('findOne', { email: data.identifier }),
      );
      if (!user) {
        throw new BadRequestException('User Not Found With this Email');
      }
    } else {
      user = await lastValueFrom(
        this.usersRpc('findOne', { username: data.identifier }),
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
    const user = this.usersRpc('create', data);

    return lastValueFrom(user);
  }

  async verifyUserPassword(data: VerifyUserPassword) {
    const verifiedPassword = this.usersRpc('verifyUserPassword', data);

    return lastValueFrom(verifiedPassword);
  }
}
