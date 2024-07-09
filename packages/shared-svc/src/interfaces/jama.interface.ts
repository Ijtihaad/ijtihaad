import {
  CreateJama,
  Jama,
  JamaWhereInput,
  JamaWhereUniqueInput,
  UpdateJama,
  UpdateMyJama
} from '@repo/common';
import { Rpc } from '../core/rpc-client';

export interface JamasServiceController {
  create(payload: CreateJama): Promise<Jama>;

  findMany(payload: JamaWhereInput): Promise<Jama[]>;

  findOne(payload: JamaWhereUniqueInput): Promise<Jama>;

  updateMyJama(payload: JamaWhereUniqueInput & UpdateMyJama): Promise<Jama>;

  updateJama(payload: JamaWhereUniqueInput & UpdateJama): Promise<Jama>;

  delete(payload: any): Promise<any>;
}

export type JamaRpcService = Rpc<JamasServiceController>;
