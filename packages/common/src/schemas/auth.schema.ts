import { z } from 'zod';
import { Gender } from './user.schema';

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least 1 numeric character')

// ===========================================================

export const registerSchema = z.object({
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  email: z.string().email().max(100),
  gender: z.nativeEnum(Gender),
  age: z.number().min(7).max(100),
  password: passwordSchema,
});

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});


export type Login = z.infer<typeof loginSchema>;
export type Register = z.infer<typeof registerSchema>;

// ================SVC=========================


export const _registerSchema = z.object({
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  email: z.string().email().max(100),
  gender: z.nativeEnum(Gender),
  age: z.number().min(7).max(100),
  password: passwordSchema,
});


export const _loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});


export type _Login = z.infer<typeof _loginSchema>;
export type _Register = z.infer<typeof _registerSchema>;

// =========================GBL===================================


export const accessTokenPayloadSchema = z.object({
  email: z.string().email(),
  image: z.string().nullable(),
  fullName: z.string(),
  gender: z.nativeEnum(Gender),
  age: z.number().min(7).max(100),
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