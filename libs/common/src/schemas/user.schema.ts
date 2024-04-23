import { userRole, UserTable } from '@app/users/drizzle/drizzle.schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const insertUserSchema = createInsertSchema(UserTable, {
  blocked: z.boolean().default(false)
});

export const selectUserSchema = createSelectSchema(UserTable);
export const updateUserSchema = insertUserSchema.pick({
  blocked: true,
  role: true,
});

export const userWhereUniqueInputSchema = z.object({
  id: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
});

export const userWhereInputSchema = selectUserSchema.pick({
  role: true,
  blocked: true,
});

export const UserRole = z.enum(userRole.enumValues).Enum;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type SelectUser = z.infer<typeof selectUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UserWhereInput = z.infer<typeof userWhereInputSchema>;
export type UserWhereUniqueInput = z.infer<typeof userWhereUniqueInputSchema>;
