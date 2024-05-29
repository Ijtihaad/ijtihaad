import { boolean, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { v4 as uuidV4 } from 'uuid';

export const userRole = pgEnum('userRole', ['ADMIN', 'BASIC']);

export const usersTable = pgTable('users', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => uuidV4()),
  firstName: varchar('firstName', { length: 100 }).notNull(),
  lastName: varchar('lastName', { length: 100 }).notNull(),
  username: varchar('name', { length: 100 }),
  role: userRole('role').default('BASIC').notNull(),
  email: varchar('value', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 120 }),
  emailVerified: boolean('emailVerified').default(false).notNull(),
  blocked: boolean('blocked').default(false).notNull(),
  picture: varchar('picture', { length: 255 }),
});
