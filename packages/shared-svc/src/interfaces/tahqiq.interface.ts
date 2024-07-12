import {
  Tahqiq,
  UpdateTahqiq,
  _CreateTahqiq,
  _TahqiqQueryUnique
} from '@repo/common';
import { Rpc } from '../core/rpc-client';

export interface TahqiqServiceController {
  create(payload: _CreateTahqiq): Promise<Tahqiq>;

  findMany(payload: _TahqiqQueryUnique): Promise<Tahqiq[]>;

  findOne(payload: _TahqiqQueryUnique): Promise<Tahqiq>;

  updateTahqiq(payload: _TahqiqQueryUnique & UpdateTahqiq): Promise<Tahqiq>;

  delete(payload: _TahqiqQueryUnique): Promise<any>;
}

export type TahqiqRpcService = Rpc<TahqiqServiceController>;
