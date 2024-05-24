import {
  UserWhereInput,
  userWhereInputSchema,
  UserWhereUniqueInput,
  userWhereUniqueInputSchema,
} from '@repo/common';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { and, eq, or } from 'drizzle-orm';
import { usersTable } from '../drizzle/drizzle.schema';

@Injectable()
export class UserQueryParser {
  where(data: UserWhereInput | undefined) {
    const whereOpr: any[] = [];

    if (data) {
      const result = userWhereInputSchema.safeParse(data);
      if (!result.success) {
        throw new BadRequestException(result.error);
      }
      if (data.role) {
        whereOpr.push(eq(usersTable.role, data.role));
      }
    }

    return and(...whereOpr);
  }

  whereUnique(data: UserWhereUniqueInput) {
    const result = userWhereUniqueInputSchema.safeParse(data);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }
    const whereOpr: any[] = [];

    if (data.id) {
      whereOpr.push(eq(usersTable.id, data.id));
    }

    if (data.username) {
      whereOpr.push(eq(usersTable.username, data.username));
    }

    if (data.email) {
      whereOpr.push(eq(usersTable.email, data.email));
    }

    if (!whereOpr.length) {
      throw new InternalServerErrorException();
    }

    return and(...whereOpr);
  }

  search(data: string | undefined) {
    const searchOpr: any[] = [];
    if (data?.length) {
      searchOpr.push(eq(usersTable.firstName, data));
      searchOpr.push(eq(usersTable.lastName, data));
      searchOpr.push(eq(usersTable.username, data));
      searchOpr.push(eq(usersTable.email, data));
    }
    return or(...searchOpr);
  }
}
