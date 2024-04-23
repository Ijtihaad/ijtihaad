import { EmailTable } from '@app/users/drizzle/drizzle.schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const insertEmailSchema = createInsertSchema(EmailTable);
export const selectEmailSchema = createSelectSchema(EmailTable);

export type InsertEmail = z.infer<typeof insertEmailSchema>;
export type SelectEmail = z.infer<typeof selectEmailSchema>;
