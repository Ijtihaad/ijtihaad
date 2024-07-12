import {
  Thought,
  _CreateThought,
  _ThoughtQuery,
  _ThoughtQueryUnique,
  _UpdateThought
} from '@repo/common';
import { Rpc } from '../core/rpc-client';

export interface ThoughtServiceController {
  create(payload: _CreateThought): Promise<Thought>;

  findMany(payload: _ThoughtQuery): Promise<Thought[]>;

  findOne(payload: _ThoughtQueryUnique): Promise<Thought>;

  updateThought(payload: _ThoughtQueryUnique & _UpdateThought): Promise<Thought>;

  delete(payload: _ThoughtQueryUnique): Promise<any>;
}

export type ThoughtRpcService = Rpc<ThoughtServiceController>;
