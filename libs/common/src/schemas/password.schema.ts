import { PasswordTable } from '@app/users/drizzle/drizzle.schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const insertPasswordSchema = createInsertSchema(PasswordTable);
export const selectPasswordSchema = createSelectSchema(PasswordTable);

export type InsertPassword = z.infer<typeof insertPasswordSchema>;
export type SelectPassword = z.infer<typeof selectPasswordSchema>;
