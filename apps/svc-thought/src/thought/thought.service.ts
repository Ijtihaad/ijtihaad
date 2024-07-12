import { THOUGHT_MODEL_NAME } from '@/schemas/thought.schema';
import {
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Thought } from '@repo/common';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ThoughtService {
  constructor(
    @InjectModel(THOUGHT_MODEL_NAME) private thoughtModel: Model<Thought>,
  ) { }

  async create(data: any) {
    const thought = await this.thoughtModel.create(data)
    return thought;
  }

  async findMany(where?: any, search?: string) {
    const filterQuery: FilterQuery<Thought> = where ? where : {}

    if (search) {
      filterQuery.$text = {
        $search: search,
        $caseSensitive: true,
      }
    }

    const thought = await this.thoughtModel.find(filterQuery);
    return thought;
  }

  async findOne(where: any) {
    const thought = await this.thoughtModel.findOne(where);

    if (!thought) {
      throw new NotFoundException('Thought not found');
    }
    return thought;
  }

  async updateThought(where: any, data: any) {
    const thought = await this.thoughtModel.findOneAndUpdate(where, data);

    if (!thought) {
      throw new NotFoundException('Thought not found');
    }
    return thought;
  }

  async delete(where: any) {
    const thought = await this.thoughtModel.deleteOne(where)
    return { deletedCount: thought.deletedCount };
  }
}
