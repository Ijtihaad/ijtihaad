import {
  DrizzleService,
  EmailTable,
  InsertEmail,
  InsertPassword,
  LocalLogin,
  LocalRegister,
  OAuthRegister,
  PasswordTable, UserTable,
  UserWhereUniqueInput,
} from '@lib/common';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import * as argon from 'argon2';
import { eq } from 'drizzle-orm';

import { omit } from '@lib/common';
import { UserQueryParser } from '../users/parsers/user-query.parser';

@Injectable()
export class AuthService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly userQueryParser: UserQueryParser,
  ) {}

  async findUser(where: UserWhereUniqueInput) {
    const whereOpr = this.userQueryParser.whereUnique(where);

    const user = await this.drizzle.db.query.UserTable.findFirst({
      where: whereOpr,
    });
    return user;
  }

  async findEmail(value: string) {
    const email = (
      await this.drizzle.db
        .select()
        .from(EmailTable)
        .where(eq(EmailTable.value, value))
    )?.[0];

    return email;
  }

  async localRegister(data: LocalRegister) {
    const emailExist = await this.drizzle.db.query.EmailTable.findFirst({
      where: eq(EmailTable.value, data.email),
      columns: {},
    });

    if (emailExist) {
      throw new ConflictException('User already exists with this Email');
    }

    const user = (
      await this.drizzle.db
        .insert(UserTable)
        .values(omit(data, ['password', 'email']))
        .returning()
    )[0];

    await this.createEmail({
      userId: user.id,
      value: data.email,
    });

    await this.createPassword({
      userId: user.id,
      value: data.password,
    });

    return user;
  }

  async localLogin(data: LocalLogin) {
    let user: Awaited<ReturnType<typeof this.findUser>>;

    if (data.identifier.includes('@')) {
      const email = await this.findEmail(data.identifier);
      if (!email) {
        throw new BadRequestException('User Not Found With this Email');
      }
      user = await this.findUser({
        id: email.userId,
      });
    } else {
      user = await this.findUser({
        username: data.identifier,
      });
      if (!user) {
        throw new BadRequestException('User Not Found With this Username');
      }
    }

    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    if (user.blocked) {
      throw new UnauthorizedException('User Blocked By Admin');
    }

    const verifiedPassword = await this.verifyUserPassword({
      userId: user.id,
      value: data.password,
    });

    if (!verifiedPassword) {
      throw new UnauthorizedException('Wrong Credential');
    }

    return user;
  }

  async oauthRegister(data: OAuthRegister) {
    const emailExist = await this.drizzle.db.query.EmailTable.findFirst({
      where: eq(EmailTable.value, data.email.value),
      columns: {},
    });

    if (emailExist) {
      throw new ConflictException('User already exists with this Email');
    }

    const user = (
      await this.drizzle.db
        .insert(UserTable)
        .values(omit(data, ['email']))
        .returning()
    )[0];

    await this.createEmail({
      userId: user.id,
      value: data.email.value,
      verified: data.email.verified,
    });
    return user;
  }

  async createPassword(data: InsertPassword) {
    const passwordExist = await this.drizzle.db.query.PasswordTable.findFirst({
      where: eq(PasswordTable.value, data.value),
      columns: {},
    });

    if (passwordExist) {
      throw new ConflictException('Password already exists');
    }

    const hashedValue = await argon.hash(data.value);

    const password = (
      await this.drizzle.db
        .insert(PasswordTable)
        .values({
          value: hashedValue,
          userId: data.userId,
        })
        .returning()
    )[0];
    return password;
  }

  async verifyUserPassword(data: InsertPassword) {
    const password = await this.drizzle.db.query.PasswordTable.findFirst({
      where: eq(PasswordTable.userId, data.userId),
    });

    if (!password) {
      throw new UnauthorizedException('Credential Not Set yet');
    }

    const verifiedPassword = await argon.verify(password.value, data.value);

    return verifiedPassword;
  }

  async createEmail(data: InsertEmail) {
    const emailExist = await this.drizzle.db.query.EmailTable.findFirst({
      where: eq(EmailTable.value, data.value),
      columns: {},
    });

    if (emailExist) {
      throw new ConflictException('Email already exists');
    }

    const email = (
      await this.drizzle.db.insert(EmailTable).values(data).returning()
    )[0];

    return email;
  }

  async isAdminExist() {
    const user = await this.drizzle.db.query.UserTable.findFirst({
      where: eq(UserTable.role, 'ADMIN'),
    });
    return !user;
  }
}
