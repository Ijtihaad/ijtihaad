import {
  EmailTable,
  PasswordTable,
  UserTable,
} from '@apps/server/drizzle/drizzle.schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export abstract class AbstractOAuthService {
  async validateUser(authCode: string): Promise<any> {
    return null;
  }
  async getAuthUrl(): Promise<string> {
    return '';
  }
}

export type SelectUser = InferSelectModel<typeof UserTable>;
export type InsertUser = InferInsertModel<typeof UserTable>;

export type InsertEmail = InferInsertModel<typeof EmailTable>;
export type InsertPassword = InferInsertModel<typeof PasswordTable>;
