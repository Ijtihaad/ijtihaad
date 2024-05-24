import { z } from 'zod';
import { userRole } from './user.schema';

export const localRegisterSchema = z.object({
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

export const oauthRegisterSchema = z.object({
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  email: z.string().email().max(100),
  picture: z.string().optional(),
  emailVerified: z.boolean(),
});

export const localLoginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export const accessTokenPayloadSchema = z.object({
  userId: z.string(),
  role: userRole
})

export const refreshTokenPayloadSchema = z.object({
  userId: z.string(),
});

export type JwtAuthToken = {
  accessToken: string;
  refreshToken: string
}

export type JwtAuthTokenPayload = {
  accessToken: AccessTokenPayload;
  refreshToken: RefreshTokenPayload
}

export type LocalLogin = z.infer<typeof localLoginSchema>;
export type LocalRegister = z.infer<typeof localRegisterSchema>;
export type OAuthRegister = z.infer<typeof oauthRegisterSchema>;
export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
export type RefreshTokenPayload = z.infer<typeof refreshTokenPayloadSchema>;
