import { RegisterUser, UpdateMe, UpdateUser, User, UserWhereInput, UserWhereUniqueInput, VerifyUserPassword } from '@repo/common';
import { RpcHandler } from '../core/rpc-handler';
import { ServiceRequest } from './request.interface';

export interface UsersServiceController {
  create(payload: ServiceRequest<RegisterUser>): Promise<User>;

  findMany(payload: ServiceRequest<UserWhereInput>): Promise<User[]>;

  findOne(payload: ServiceRequest<UserWhereUniqueInput>): Promise<User>;

  updateMe(payload: ServiceRequest<UpdateMe & UserWhereUniqueInput>): Promise<User>;

  updateUser(payload: ServiceRequest<UpdateUser & UserWhereUniqueInput>): Promise<User>;

  delete(payload: ServiceRequest<any>): Promise<User>;

  verifyUserPassword(payload: ServiceRequest<VerifyUserPassword>): Promise<boolean>;
}

export type UserRpcService = ReturnType<
  typeof RpcHandler.createRpcClient<UsersServiceController>
>;
