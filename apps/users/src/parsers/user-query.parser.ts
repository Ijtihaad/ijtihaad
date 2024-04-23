import {
  EmailTable,
  UserTable,
  UserWhereInput,
  userWhereInputSchema,
  UserWhereUniqueInput,
  userWhereUniqueInputSchema,
} from '@lib/common';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { and, eq, or } from 'drizzle-orm';

@Injectable()
export class UserQueryParser {
  where(data: UserWhereInput) {
    const result = userWhereInputSchema.safeParse(data);
    if (!result.success) {
      throw new BadRequestException(result.error);
    }
    const whereOpr: any[] = [];

    if (data.role) {
      whereOpr.push(eq(UserTable.role, data.role));
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
      whereOpr.push(eq(UserTable.id, data.id));
    }

    if (data.username) {
      whereOpr.push(eq(UserTable.username, data.username));
    }

    if (data.email) {
      whereOpr.push(eq(EmailTable.value, data.email));
    }

    if (!whereOpr.length) {
      throw new InternalServerErrorException();
    }

    return and(...whereOpr);
  }

  search(data: string | undefined) {
    const searchOpr: any[] = [];
    if (data?.length) {
      searchOpr.push(eq(EmailTable.value, data));
      searchOpr.push(eq(UserTable.firstName, data));
      searchOpr.push(eq(UserTable.lastName, data));
      searchOpr.push(eq(UserTable.username, data));
    }
    return or(...searchOpr);
  }
}
