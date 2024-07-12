import {
  User,
  _LocalRegister,
  _OAuthRegister,
  _UpdateMe,
  _UpdateUser,
  _UserQuery,
  _UserQueryUnique,
  _VerifyUserPassword,
} from '@repo/common';
import { Rpc } from '../core/rpc-client';

export interface UsersServiceController {
  create(payload: _LocalRegister | _OAuthRegister): Promise<User>;

  findMany(payload: _UserQuery): Promise<User[]>;

  findOne(payload: _UserQueryUnique): Promise<User>;

  updateMe(payload: _UserQueryUnique & _UpdateMe): Promise<User>;

  updateUser(payload: _UserQueryUnique & _UpdateUser): Promise<User>;

  delete(payload: any): Promise<any>;

  verifyUserPassword(payload: _VerifyUserPassword): Promise<boolean>;
}

export type UserRpcService = Rpc<UsersServiceController>;
