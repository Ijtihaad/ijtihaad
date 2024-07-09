import { z } from 'zod';

export const userRole = z.union([z.literal('ADMIN'), z.literal('BASIC')]);

export const userSchema = z.object({
  _id: z.any(),
  blocked: z.boolean().default(false),
  emailVerified: z.boolean().default(false),
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  username: z.string().min(3).max(100).nullable(),
  picture: z.string().max(255).nullable().default(null),
  email: z.string().email().max(100),
  role: userRole.default('BASIC'),
});

export const usersSchema = z.array(userSchema)

export const updateMeSchema = userSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
});

export const updateUserSchema = z.object({
  blocked: z.boolean().optional(),
  role: userRole.optional(),
});

export const userWhereUniqueInputSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
});

export const userWhereInputSchema = z.object({
  blocked: z.boolean().optional(),
  role: userRole.optional(),
});

export const verifyUserPasswordSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type Users = z.infer<typeof usersSchema>;
export type UserRole = z.infer<typeof userRole>;
export type UpdateMe = z.infer<typeof updateMeSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UserWhereInput = z.infer<typeof userWhereInputSchema>;
export type UserWhereUniqueInput = z.infer<typeof userWhereUniqueInputSchema>;
export type VerifyUserPassword = z.infer<typeof verifyUserPasswordSchema>;