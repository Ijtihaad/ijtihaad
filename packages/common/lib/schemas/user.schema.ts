import { z } from 'zod';

export const userRole = z.union([z.literal("ADMIN"), z.literal("BASIC")])
export const userSchema = z.object({
  id: z.string(),
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  email: z.string().email().max(100),
  username: z.string().min(3).max(100).nullable(),
  picture: z.string().max(255).nullable(),
  blocked: z.boolean(),
  role: userRole,
})

export const updateMeSchema = userSchema.pick({
  firstName: true,
  lastName: true,
  email: true
});

export const updateUserSchema = z.object({
  blocked: z.boolean().optional(),
  role: userRole.optional(),
});

export const userWhereUniqueInputSchema = z.object({
  id: z.string().optional(),
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

export type UserRole = z.infer<typeof userRole>
export type User = z.infer<typeof userSchema>;
export type UpdateMe = z.infer<typeof updateMeSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UserWhereInput = z.infer<typeof userWhereInputSchema>;
export type UserWhereUniqueInput = z.infer<typeof userWhereUniqueInputSchema>;
export type VerifyUserPassword = z.infer<typeof verifyUserPasswordSchema>;
