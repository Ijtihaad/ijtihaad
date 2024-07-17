import { z } from 'zod';
import { AssetType, assetSchema } from './asset.schema';

export enum Gender {
  male = "male",
  female = "female",
}

export enum UserEligibilityPermission {
  askTahqiq = "askTahqiq",
  answerTahqiq = "answerTahqiq",
  postThought = "postThought",
  postReels = "postReels",
  postVideo = "postVideo",
  createJama = "createJama",
  createChannel = "createChannel",
}


export const userEligibilitySchema = z.object({
  name: z.string().min(4).max(16),
  description: z.string().min(4).max(255),
  activated: z.boolean(),
  permissions: z.object({
    askTahqiq: z.boolean(),
    answerTahqiq: z.boolean(),
    postThought: z.boolean(),
    postReels: z.boolean(),
    postVideo: z.boolean(),
    createJama: z.boolean(),
    createChannel: z.boolean(),
  }),
})

export enum UserRolePermission {
  addRole = "addRole",
  verifyEligibility = "verifyEligibility"
}


export const userRoleSchema = z.object({
  name: z.string().min(4).max(16),
  description: z.string().min(4).max(255),
  permissions: z.object({
    addRole: z.boolean(),
    verifyEligibility: z.boolean(),
  }),
})


export const userSchema = z.object({
  _id: z.any(),

  // ==========basicEligibility=============
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  gender: z.nativeEnum(Gender),
  age: z.number().min(7).max(100),
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
  password: z.string().nullable(),

  // =========standardEligibility============
  picture: assetSchema.extend({
    assetType: z.literal(AssetType.image)
  }).nullable(),
  phone: z.string().nullable(),
  phoneVerified: z.boolean().default(false),
  address: z.object({
    country: z.string(),
    state: z.string(),
    street: z.string(),
  }).nullable(),


  // =========intermediateEligibility============
  frontIdCard: assetSchema.extend({
    assetType: z.literal(AssetType.image)
  }).nullable(),
  backIdCard: assetSchema.extend({
    assetType: z.literal(AssetType.image)
  }).nullable(),

  frontPassport: assetSchema.extend({
    assetType: z.literal(AssetType.image)
  }).nullable(),
  backPassport: assetSchema.extend({
    assetType: z.literal(AssetType.image)
  }).nullable(),

  faceVideo: assetSchema.extend({
    assetType: z.literal(AssetType.video)
  }).nullable(),

  // =============advancedEligibility===============


  // =============tahqiqEligibility===============

  // ==========Status================
  roles: z.array(userRoleSchema),
  eligibilities: z.array(userEligibilitySchema),
  blocked: z.boolean().default(false),
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
  blocked: z.boolean().optional(),
  emailVerified: z.boolean().default(false),
});

export const _userQueryUniqueSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
});

export const _userQuerySchema = z.object({
  blocked: z.boolean().optional(),
});

export const _verifyUserPasswordSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

export type UserRole = z.infer<typeof userRoleSchema>;
export type UserEligibility = z.infer<typeof userEligibilitySchema>;
export type _UpdateMe = z.infer<typeof _updateMeSchema>;
export type _UpdateUser = z.infer<typeof _updateUserSchema>;
export type _UserQuery = z.infer<typeof _userQuerySchema>;
export type _UserQueryUnique = z.infer<typeof _userQueryUniqueSchema>;
export type _VerifyUserPassword = z.infer<typeof _verifyUserPasswordSchema>;