import { ACCOUNT_MODEL_NAME, AccountDoc } from '@/schemas/account.schema';
import {
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(ACCOUNT_MODEL_NAME) private accountsModel: Model<AccountDoc>,
  ) { }

  async create(data: any) {
    const accounts = await this.accountsModel.create(data)
    return accounts;
  }

  async findMany(query?: any, search?: string) {
    const filterQuery: FilterQuery<AccountDoc> = query ? query : {}

    if (search) {
      filterQuery.$text = {
        $search: search,
        $caseSensitive: true,
      }
    }

    const accounts = await this.accountsModel.find(filterQuery);
    return accounts;
  }


  async findOne(query: any) {
    const accounts = await this.accountsModel.findOne(query);

    if (!accounts) {
      throw new NotFoundException('Accounts not found');
    }
    return accounts;
  }

  async update(query: any, data: any) {
    const account = await this.accountsModel.findOneAndUpdate(query, data);

    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  async upsert(
    filterQuery: FilterQuery<AccountDoc>,
    document: Partial<AccountDoc>,
  ) {
    const account = await this.accountsModel.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account
  }


  async delete(query: any) {
    const accounts = await this.accountsModel.deleteOne(query)
    return { deletedCount: accounts.deletedCount };
  }
}
