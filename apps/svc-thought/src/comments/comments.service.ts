import { COMMENT_MODEL_NAME, CommentModel } from '@/schemas/comment.schema';
import {
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(COMMENT_MODEL_NAME) private commentModel: Model<CommentModel>,
  ) { }

  async create(data: any) {
    const comments = await this.commentModel.create(data)
    return comments;
  }

  async findMany(where?: any, search?: string) {
    const filterQuery: FilterQuery<Comment> = where ? where : {}

    if (search) {
      filterQuery.$text = {
        $search: search,
        $caseSensitive: true,
      }
    }

    const comments = await this.commentModel.find(filterQuery);
    return comments;
  }

  async findOne(where: any) {
    const comments = await this.commentModel.findOne(where);

    if (!comments) {
      throw new NotFoundException('Comments not found');
    }
    return comments;
  }

  async updateComments(where: any, data: any) {
    const comments = await this.commentModel.findOneAndUpdate(where, data);

    if (!comments) {
      throw new NotFoundException('Comments not found');
    }
    return comments;
  }

  async delete(where: any) {
    const comments = await this.commentModel.deleteOne(where)
    return { deletedCount: comments.deletedCount };
  }
}
