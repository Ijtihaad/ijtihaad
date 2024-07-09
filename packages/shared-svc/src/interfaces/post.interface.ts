import {
  CreatePost,
  Post,
  PostWhereInput,
  PostWhereUniqueInput,
  UpdateMyPost,
  UpdatePost
} from '@repo/common';
import { Rpc } from '../core/rpc-client';

export interface PostsServiceController {
  create(payload: CreatePost): Promise<Post>;

  findMany(payload: PostWhereInput): Promise<Post[]>;

  findOne(payload: PostWhereUniqueInput): Promise<Post>;

  updateMyPost(payload: PostWhereUniqueInput & UpdateMyPost): Promise<Post>;

  updatePost(payload: PostWhereUniqueInput & UpdatePost): Promise<Post>;

  delete(payload: any): Promise<any>;
}

export type PostRpcService = Rpc<PostsServiceController>;
