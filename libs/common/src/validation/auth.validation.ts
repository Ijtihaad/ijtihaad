import { z } from 'zod';

export const userRegisterSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export const userLoginSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});
