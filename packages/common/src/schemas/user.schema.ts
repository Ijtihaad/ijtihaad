import { z } from 'zod';
import { AssetType, assetSchema } from './asset.schema';

export enum UserRole {
  user = "user",
  admin = "admin",
  superAdmin = "superAdmin",
}

export enum Gender {
  male = "male",
  female = "female",
}

export const userPermissionSchema = z.object({
  askTahqiq: z.boolean(),
  answerTahqiq: z.boolean(),
  postThought: z.boolean(),
  postReels: z.boolean(),
  postVideo: z.boolean(),
  createJama: z.boolean(),
  createChannel: z.boolean(),
})

export const userSchema = z.object({
  _id: z.any(),
  blocked: z.boolean().default(false),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string().nullable(),
  gender: z.nativeEnum(Gender),
  age: z.number().min(7).max(100),
  picture: assetSchema.extend({
    assetType: z.literal(AssetType.image)
  }),
  role: z.nativeEnum(UserRole),
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
});


export type User = z.infer<typeof userSchema>;

// ================API======================


// =====================SVC=================

export const _updateMeSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
  picture: z.string().optional(),
  email: z.string().email().optional(),
});


export const _updateUserSchema = z.object({
  role: z.nativeEnum(UserRole).optional(),
  blocked: z.boolean().optional(),
  emailVerified: z.boolean().default(false),
  permission: userPermissionSchema.optional(),
});

export const _userQueryUniqueSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
});

export const _userQuerySchema = z.object({
  blocked: z.boolean().optional(),
  role: z.nativeEnum(UserRole).optional(),
});

export const _verifyUserPasswordSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

export type _UpdateMe = z.infer<typeof _updateMeSchema>;
export type _UpdateUser = z.infer<typeof _updateUserSchema>;
export type _UserQuery = z.infer<typeof _userQuerySchema>;
export type _UserQueryUnique = z.infer<typeof _userQueryUniqueSchema>;
export type _VerifyUserPassword = z.infer<typeof _verifyUserPasswordSchema>;