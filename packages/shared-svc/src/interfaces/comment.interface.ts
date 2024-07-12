import {
  Comment,
  _CommentQueryUnique,
  _CreateComment,
  _UpdateComment
} from '@repo/common';
import { Rpc } from '../core/rpc-client';

export interface CommentServiceController {
  create(payload: _CreateComment): Promise<Comment>;

  findOne(payload: _CommentQueryUnique): Promise<Comment>;

  updateComment(payload: _CommentQueryUnique & _UpdateComment): Promise<Comment>;

  delete(payload: _CommentQueryUnique): Promise<any>;
}

export type CommentRpcService = Rpc<CommentServiceController>;
