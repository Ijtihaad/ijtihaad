import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePost, Post, PostWhereInput, PostWhereUniqueInput, UpdateMyPost, UpdatePost } from '@repo/common';
import { PostsServiceController } from '@repo/shared-svc';
import { PostsService } from './posts.service';

@Controller()
export class PostsController implements PostsServiceController {
  private readonly logger = new Logger(PostsController.name);
  constructor(private readonly postsService: PostsService) { }

  @MessagePattern('posts:create')
  create(@Payload('data') data: CreatePost): Promise<Post> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('posts:findMany')
  findMany(@Payload('data') data: PostWhereInput): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('posts:findOne')
  findOne(@Payload('data') data: PostWhereUniqueInput): Promise<Post> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('posts:updatePost')
  updateMyPost(@Payload('data') data: PostWhereUniqueInput & UpdateMyPost): Promise<Post> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('posts:updatePost')
  updatePost(@Payload('data') data: PostWhereUniqueInput & UpdatePost): Promise<Post> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('posts:delete')
  delete(@Payload('data') data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}