import { z } from 'zod';
import { Gender, UserRole } from './user.schema';

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least 1 numeric character')

// ===========================================================

export const localRegisterSchema = z.object({
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  email: z.string().email().max(100),
  gender: z.nativeEnum(Gender),
  age: z.number().min(7).max(100),
  password: passwordSchema,
});

export const localLoginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});


export type LocalLogin = z.infer<typeof localLoginSchema>;
export type LocalRegister = z.infer<typeof localRegisterSchema>;

// ================SVC=========================

export const _oauthRegisterSchema = z.object({
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  email: z.string().email().max(100),
  picture: z.string().optional(),
  emailVerified: z.boolean(),
});


export const _localRegisterSchema = z.object({
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  email: z.string().email().max(100),
  gender: z.nativeEnum(Gender),
  age: z.number().min(7).max(100),
  password: passwordSchema,
});


export const _localLoginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});


export type _LocalLogin = z.infer<typeof _localLoginSchema>;
export type _LocalRegister = z.infer<typeof _localRegisterSchema>;
export type _OAuthRegister = z.infer<typeof _oauthRegisterSchema>;

// =========================GBL===================================


export const accessTokenPayloadSchema = z.object({
  email: z.string().email(),
  image: z.string().nullable(),
  fullName: z.string(),
  gender: z.nativeEnum(Gender),
  age: z.number().min(7).max(100),
  role: z.nativeEnum(UserRole),
  userId: z.string(),
});

export const refreshTokenPayloadSchema = z.object({
  userId: z.string(),
});


export type JwtAuthToken = {
  accessToken: string;
  refreshToken: string;
};

export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
export type RefreshTokenPayload = z.infer<typeof refreshTokenPayloadSchema>;
export type JwtAuthTokenPayload = { accessToken: AccessTokenPayload; refreshToken: RefreshTokenPayload; };