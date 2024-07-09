import {
  LocalRegister,
  OAuthRegister,
  UpdateMe,
  UpdateUser,
  User,
  UserWhereInput,
  UserWhereUniqueInput,
  VerifyUserPassword,
} from '@repo/common';
import { Rpc } from '../core/rpc-client';

export interface UsersServiceController {
  create(payload: LocalRegister | OAuthRegister): Promise<User>;

  findMany(payload: UserWhereInput): Promise<User[]>;

  findOne(payload: UserWhereUniqueInput): Promise<User>;

  updateMe(payload: UserWhereUniqueInput & UpdateMe): Promise<User>;

  updateUser(payload: UserWhereUniqueInput & UpdateUser): Promise<User>;

  delete(payload: any): Promise<any>;

  verifyUserPassword(payload: VerifyUserPassword): Promise<boolean>;
}

export type UserRpcService = Rpc<UsersServiceController>;
