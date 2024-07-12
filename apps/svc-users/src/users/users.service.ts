import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';

import {
  _LocalRegister,
  _OAuthRegister,
  _UpdateMe,
  _UpdateUser,
  _UserQuery,
  _UserQueryUnique,
  _VerifyUserPassword
} from '@repo/common';

import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { FilterQuery, Model } from 'mongoose';
import { USER_MODEL_NAME, UserDoc } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL_NAME) private userModel: Model<UserDoc>,
  ) { }

  async create(data: _LocalRegister | _OAuthRegister): Promise<UserDoc> {
    const userExist = await this.userModel.findOne({
      email: data.email
    });

    if (userExist) {
      throw new ConflictException('User already exists with this Email');
    }

    if ('password' in data) {
      data.password = await argon.hash(data.password);
    }

    const user = await this.userModel.create(data)

    return user;
  }

  async findMany(query?: _UserQuery, search?: string): Promise<UserDoc[]> {
    const filterQuery: FilterQuery<UserDoc> = query ? query : {}

    if (search) {
      filterQuery.$text = {
        $search: search,
        $caseSensitive: true,
      }
    }

    const users = await this.userModel.find(filterQuery);
    return users;
  }

  async findOne(query: _UserQueryUnique): Promise<UserDoc> {
    const user = await this.userModel.findOne(query);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(query: _UserQueryUnique, data: _UpdateMe | _UpdateUser): Promise<UserDoc> {
    const user = await this.userModel.findOneAndUpdate(query, data);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async delete(query: _UserQueryUnique) {
    const user = await this.userModel.deleteOne(query)
    return { deletedCount: user.deletedCount };
  }

  async verifyUserPassword(data: _VerifyUserPassword): Promise<boolean> {
    const user = await this.userModel.findOne({
      _id: data.userId,
    }).select(["password"]);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const verifiedPassword = await argon.verify(
      user.password ?? '',
      data.password,
    );

    return verifiedPassword;
  }

}
