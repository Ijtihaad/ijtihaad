import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Comment, _CommentQueryUnique, _CreateComment, _UpdateComment } from '@repo/common';
import { CommentServiceController } from '@repo/shared-svc';
import { CommentsService } from './comments.service';

@Controller()
export class CommentsController implements CommentServiceController {
  private readonly logger = new Logger(CommentsController.name);
  constructor(private readonly commentsService: CommentsService) { }

  @MessagePattern('comments:create')
  create(@Payload('data') data: _CreateComment): Promise<Comment> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('comments:findOne')
  findOne(@Payload('data') data: _CommentQueryUnique): Promise<Comment> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('comments:updateComment')
  updateComment(@Payload('data') data: _CommentQueryUnique & _UpdateComment): Promise<Comment> {
    throw new Error('Method not implemented.');
  }

  @MessagePattern('comments:delete')
  delete(@Payload('data') data: _CommentQueryUnique): Promise<any> {
    throw new Error('Method not implemented.');
  }

}