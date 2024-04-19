import {
  LocalLogin,
  LocalRegister,
  OAuthRegister,
} from '@libs/common';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { eq, or } from 'drizzle-orm';
import {
  EmailTable,
  PasswordTable,
  UserTable,
} from '../drizzle/drizzle.schema';
import { DrizzleService } from '../drizzle/drizzle.service';

import { omit } from '@libs/common';

@Injectable()
export class AuthService {
  constructor(private readonly drizzle: DrizzleService) {}

  async findUser(where: { id?: number; username?: string }) {
    const whereOpr: any[] = [];

    if (where.id) {
      whereOpr.push(eq(UserTable.id, where.id));
    }
    if (where.username) {
      whereOpr.push(eq(UserTable.username, where.username));
    }
    if (!whereOpr.length) {
      throw new InternalServerErrorException();
    }

    const user = await this.drizzle.db.query.UserTable.findFirst({
      where: or(...whereOpr),
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
      password: data.password,
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

  async verifyUserPassword(data: { userId: number; password: string }) {
    const password = await this.drizzle.db.query.PasswordTable.findFirst({
      where: eq(PasswordTable.userId, data.userId),
    });

    if (!password) {
      throw new UnauthorizedException('Credential Not Set yet');
    }

    const verifiedPassword = await argon.verify(password.value, data.password);

    return verifiedPassword;
  }

  async createEmail(data: CreateEmail) {
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
