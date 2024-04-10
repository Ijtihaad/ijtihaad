import {
  UserCreateInput,
  UserUpdateInput,
  UserWhereInput,
  UserWhereUniqueInput,
} from '@common';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../global/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserCreateInput) {
    const userPhoneExist = await this.prisma.user.findFirst({
      where: {
        phone: data.phone,
      },
    });

    if (userPhoneExist) {
      throw new ConflictException('User already exists with this Phone Number');
    }

    const userEmailExist = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userEmailExist) {
      throw new ConflictException('User already exists with this Email Number');
    }

    const user = await this.prisma.user.create({
      data: data,
    });

    return user;
  }

  async findMany(where: UserWhereInput, options?: any) {
    const users = await this.prisma.user.findMany({
      where: where,
    });

    return users;
  }

  async findOne(where: UserWhereUniqueInput) {
    const user = await this.prisma.user.findFirst({
      where: where,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(where: UserWhereUniqueInput, data: UserUpdateInput) {
    const userExist = await this.prisma.user.findFirst({
      where: where,
    });

    if (!userExist) {
      throw new NotFoundException('User not found');
    }
    if (typeof data.email === 'string' && !data.email.length) {
      delete data.email;
    }
    const user = await this.prisma.user.update({
      where: where,
      data: data,
    });

    return user;
  }

  async delete(where: UserWhereUniqueInput) {
    const user = await this.prisma.user.findFirst({
      where: where,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.user.delete({
      where: where,
    });
    return null;
  }
}
