import { z } from 'zod';
import { userRole } from './user.schema';

export const registerUserSchema = z.object({
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  email: z.string().email().max(100),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least 1 numeric character'),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const accessTokenPayloadSchema = z.object({
  userId: z.string(),
  role: userRole
})

export const refreshTokenPayloadSchema = z.object({
  userId: z.string(),
});


export type LoginUser = z.infer<typeof loginUserSchema>;
export type RegisterUser = z.infer<typeof registerUserSchema>;
export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
export type RefreshTokenPayload = z.infer<typeof refreshTokenPayloadSchema>;

export type JwtAuthToken = AccessTokenPayload & RefreshTokenPayload;
