import { z } from 'zod';
import { insertUserSchema } from './user.schema';

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least 1 numeric character');

export const localRegisterSchema = insertUserSchema
  .pick({
    firstName: true,
    lastName: true,
  })
  .extend({
    email: z.string().email(),
    password: passwordSchema,
  });

export const oauthRegisterSchema = insertUserSchema
  .pick({
    firstName: true,
    lastName: true,
  })
  .extend({
    picture: z.string().optional(),
    email: z.object({
      value: z.string().email(),
      verified: z.boolean().default(false),
    }),
  });

export const localLoginSchema = z.object({
  identifier: z.string().min(2).max(64),
  password: z.string(),
});

export type LocalLogin = z.infer<typeof localLoginSchema>;
export type LocalRegister = z.infer<typeof localRegisterSchema>;
export type OAuthRegister = z.infer<typeof oauthRegisterSchema>;
