import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import {
  User,
  RegisterUser,
  UpdateMe,
  UpdateUser,
  UserWhereInput,
  UserWhereUniqueInput,
  VerifyUserPassword
} from '@repo/common';

import * as argon from 'argon2';
import { and, eq } from 'drizzle-orm';
import { usersTable } from './drizzle/drizzle.schema';
import { DrizzleService } from './drizzle/drizzle.service';
import { UserQueryParser } from './parsers/user-query.parser';

@Injectable()
export class UsersService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly userQueryParser: UserQueryParser,
  ) { }

  async create(data: RegisterUser): Promise<User> {

    const emailExist = await this.drizzle.db.query.usersTable.findFirst({
      where: eq(usersTable.email, data.email),
    });

    console.log(data);

    if (emailExist) {
      throw new ConflictException('User already exists with this Email');
    }

    const hash = await argon.hash(data.password);
    const user = (
      await this.drizzle.db
        .insert(usersTable)
        .values({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hash,
        })
        .returning()
    )[0];

    if (!user) {
      throw new NotFoundException('User not created');
    }

    return user;
  }

  async findMany(where?: UserWhereInput, search?: string): Promise<User[]> {
    const whereOpr = this.userQueryParser.where(where);
    const searchOpr = this.userQueryParser.search(search);

    const users = await this.drizzle.db.query.usersTable.findMany({
      where: and(whereOpr, searchOpr),
    });

    return users;
  }

  async findOne(where: UserWhereUniqueInput): Promise<User> {
    const whereOpr = this.userQueryParser.whereUnique(where);
    const user = await this.drizzle.db.query.usersTable.findFirst({
      where: whereOpr,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(where: UserWhereUniqueInput, data: UpdateUser): Promise<User> {
    const whereOpr = this.userQueryParser.whereUnique(where);
    const user = (
      await this.drizzle.db
        .update(usersTable)
        .set(data)
        .where(whereOpr)
        .returning()
    )[0];

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user
  }

  async updateMe(where: UserWhereUniqueInput, data: UpdateMe): Promise<User> {
    const whereOpr = this.userQueryParser.whereUnique(where);
    const user = (
      await this.drizzle.db
        .update(usersTable)
        .set(data)
        .where(whereOpr)
        .returning()
    )[0];

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user
  }

  async delete(where: UserWhereUniqueInput): Promise<User> {
    const whereOpr = this.userQueryParser.whereUnique(where);
    const user = (await this.drizzle.db.delete(usersTable).where(whereOpr))[0];
    return user;
  }

  async verifyUserPassword(data: VerifyUserPassword): Promise<boolean> {
    const user = await this.drizzle.db.query.usersTable.findFirst({
      where: eq(usersTable.id, data.userId),
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const verifiedPassword = await argon.verify(user.password, data.password);

    return verifiedPassword;
  }
}
