import {
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Tahqiq } from '../schemas/tahqiq.schema';

@Injectable()
export class TahqiqService {
  constructor(
    @InjectModel(Tahqiq.name) private tahqiqModel: Model<Tahqiq>,
  ) { }

  async create(data: any) {
    const tahqiq = await this.tahqiqModel.create(data)
    return tahqiq;
  }

  async findMany(where?: any, search?: string) {
    const filterQuery: FilterQuery<Tahqiq> = where ? where : {}

    if (search) {
      filterQuery.$text = {
        $search: search,
        $caseSensitive: true,
      }
    }

    const tahqiq = await this.tahqiqModel.find(filterQuery);
    return tahqiq;
  }

  async findOne(where: any) {
    const tahqiq = await this.tahqiqModel.findOne(where);

    if (!tahqiq) {
      throw new NotFoundException('Tahqiq not found');
    }
    return tahqiq;
  }

  async updateTahqiq(where: any, data: any) {
    const tahqiq = await this.tahqiqModel.findOneAndUpdate(where, data);

    if (!tahqiq) {
      throw new NotFoundException('Tahqiq not found');
    }
    return tahqiq;
  }

  async delete(where: any) {
    const tahqiq = await this.tahqiqModel.deleteOne(where)
    return { deletedCount: tahqiq.deletedCount };
  }
}
