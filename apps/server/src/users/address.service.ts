import {
  AddressCreateInput,
  AddressUpdateInput,
  AddressWhereInput,
  AddressWhereUniqueInput,
} from '@common';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@server/global/services/prisma.service';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(data: AddressCreateInput) {
    const address = await this.prisma.address.create({ data });
    return address;
  }

  async findOne(where: AddressWhereUniqueInput) {
    const address = await this.prisma.address.findFirst({ where });
    return address;
  }

  async findMany(where: AddressWhereInput) {
    const address = await this.prisma.address.findMany({ where });
    return address;
  }

  async update(where: AddressWhereUniqueInput, data: AddressUpdateInput) {
    const address = await this.prisma.address.update({ where, data });
    return address;
  }

  async delete(where: AddressWhereUniqueInput) {
    const address = await this.prisma.address.delete({ where });
    return address;
  }
}
