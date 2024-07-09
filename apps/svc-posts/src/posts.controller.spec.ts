import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let postsController: PostsController;

  beforeEach(async () => {
    const posts: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    postsController = posts.get<PostsController>(PostsController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(postsController.getHello()).toBe('Hello World!');
  //   });
  // });
});
