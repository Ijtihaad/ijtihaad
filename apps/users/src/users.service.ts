import { UpdateUser } from '@lib/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { and, sql } from 'drizzle-orm';
import { UserWhereInput, UserWhereUniqueInput } from '@lib/common';
import { UserTable } from './drizzle/drizzle.schema';
import { DrizzleService } from './drizzle/drizzle.service';
import { UserQueryParser } from './parsers/user-query.parser';

@Injectable()
export class UsersService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly userQueryParser: UserQueryParser,
  ) {}

  async findMany(where: UserWhereInput, search?: string) {
    const whereOpr = this.userQueryParser.where(where);
    const searchOpr = this.userQueryParser.search(search);

    const users = await this.drizzle.db.query.UserTable.findMany({
      extras: {
        fullName:
          sql<string>`concat(${UserTable.firstName}, " ", ${UserTable.lastName})`.as(
            'full_name',
          ),
      },
      where: and(whereOpr, searchOpr),
    });

    return users;
  }

  async findOne(where: UserWhereUniqueInput) {
    const whereOpr = this.userQueryParser.whereUnique(where);
    const user = await this.drizzle.db.query.UserTable.findFirst({
      extras: {
        fullName:
          sql<string>`concat(${UserTable.firstName}, " ", ${UserTable.lastName})`.as(
            'full_name',
          ),
      },
      where: whereOpr,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(where: UserWhereUniqueInput, data: UpdateUser) {
    const whereOpr = this.userQueryParser.whereUnique(where);
    const user = (
      await this.drizzle.db
        .update(UserTable)
        .set(data)
        .where(whereOpr)
        .returning()
    )[0];

    return user;
  }

  async delete(where: UserWhereUniqueInput) {
    const whereOpr = this.userQueryParser.whereUnique(where);
    const user = (await this.drizzle.db.delete(UserTable).where(whereOpr))[0];
    return { success: true };
  }
}
