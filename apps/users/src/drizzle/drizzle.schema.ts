import { relations } from 'drizzle-orm';
import {
  boolean,
  pgEnum,
  pgTable,
  primaryKey,
  varchar
} from 'drizzle-orm/pg-core';
import { v4 as uuidV4 } from 'uuid';

export const userRole = pgEnum('userRole', ['ADMIN', 'BASIC']);

export const UserTable = pgTable('user', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => uuidV4()),
  firstName: varchar('firstName', { length: 64 }).notNull(),
  lastName: varchar('lastName', { length: 64 }).notNull(),
  role: userRole('role').default('BASIC').notNull(),
  username: varchar('name', { length: 64 }),
  picture: varchar('picture', { length: 255 }),
  blocked: boolean('blocked').default(false).notNull(),
});

export const EmailTable = pgTable(
  'email',
  {
    value: varchar('value', { length: 64 }).notNull().unique(),
    verified: boolean('verified').default(false).notNull(),
    userId: varchar('userId', { length: 32 })
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull()
      .unique(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId] }),
    };
  }
);

export const PasswordTable = pgTable(
  'password',
  {
    value: varchar('value', { length: 100 }).notNull(),
    userId: varchar('userId', { length: 32 })
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull()
      .unique(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId] }),
    };
  }
);

export const UserRelations = relations(UserTable, ({ one, many }) => ({
  password: one(PasswordTable),
  emails: many(EmailTable),
}));

export const EmailRelations = relations(EmailTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [EmailTable.userId],
    references: [UserTable.id],
  }),
}));

export const PasswordRelations = relations(PasswordTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [PasswordTable.userId],
    references: [UserTable.id],
  }),
}));
