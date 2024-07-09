import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import {
  LocalRegister,
  OAuthRegister,
  UpdateMe,
  UpdateUser,
  UserWhereInput,
  UserWhereUniqueInput,
  VerifyUserPassword,
  userSchema
} from '@repo/common';

import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { FilterQuery, Model } from 'mongoose';
import { User } from './user.database';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private db: Model<User>,
  ) { }

  async create(data: LocalRegister | OAuthRegister): Promise<User> {
    const userExist = await this.db.findOne({
      email: data.email
    });

    if (userExist) {
      throw new ConflictException('User already exists with this Email');
    }

    if ('password' in data) {
      data.password = await argon.hash(data.password);
    }

    const user = await this.db.create(data)

    return user;
  }

  async findMany(where?: UserWhereInput, search?: string): Promise<User[]> {
    const filterQuery: FilterQuery<User> = where ? where : {}

    if (search) {
      filterQuery.$text = {
        $search: search,
        $caseSensitive: true,
      }
    }

    const users = await this.db.find(filterQuery);
    return users;
  }

  async findOne(where: UserWhereUniqueInput): Promise<User> {
    const user = await this.db.findOne(where);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(where: UserWhereUniqueInput, data: UpdateMe | UpdateUser): Promise<User> {
    const user = await this.db.findOneAndUpdate(where, data);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async delete(where: UserWhereUniqueInput) {
    const user = await this.db.deleteOne(where)
    return { deletedCount: user.deletedCount };
  }

  async verifyUserPassword(data: VerifyUserPassword): Promise<boolean> {
    const user = await this.db.findOne({
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
