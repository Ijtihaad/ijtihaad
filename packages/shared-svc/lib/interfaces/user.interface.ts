import { LocalRegister, OAuthRegister, UpdateMe, UpdateUser, User, UserWhereInput, UserWhereUniqueInput, VerifyUserPassword } from '@repo/common';
import { Rpc } from '../core/rpc-client';

export interface UsersServiceController {
  create(payload: LocalRegister | OAuthRegister): Promise<User>;

  findMany(payload: UserWhereInput): Promise<User[]>;

  findOne(payload: UserWhereUniqueInput): Promise<User>;

  updateMe(payload: UpdateMe & UserWhereUniqueInput): Promise<User>;

  updateUser(payload: UpdateUser & UserWhereUniqueInput): Promise<User>;

  delete(payload: any): Promise<User>;

  verifyUserPassword(payload: VerifyUserPassword): Promise<boolean>;
}

export type UserRpcService = Rpc<UsersServiceController>
