import z from "zod"
import { assetSchema } from "./asset.schema";

export enum AccountType {
    user = "user",
}

export const accountSchema = z.object({
    _id: z.string(),
    accountId: z.string(),
    uniqueName: z.string(),
    displayName: z.string(),
    accountType: z.nativeEnum(AccountType),
    picture: assetSchema.nullable(),
})
export type Account = z.infer<typeof accountSchema>;

// ================API===========================

export const accountQueryUniqueSchema = z.object({
    accountId: z.string().optional(),
    uniqueName: z.string().optional(),
    accountType: z.nativeEnum(AccountType),
});

export type AccountQueryUnique = z.infer<typeof accountQueryUniqueSchema>;

// ================SVC===========================
export const _createAccountSchema = z.object({
    accountId: z.string(),
    uniqueName: z.string(),
    displayName: z.string(),
    accountType: z.nativeEnum(AccountType),
    picture: z.string(),
});

export const _updateMyAccountSchema = z.object({
    picture: z.string(),
    uniqueName: z.string(),
    displayName: z.string(),
});

export const _accountQueryUniqueSchema = z.object({
    accountId: z.string().optional(),
    uniqueName: z.string().optional(),
    accountType: z.nativeEnum(AccountType),
});

export type _CreateAccount = z.infer<typeof _createAccountSchema>;
export type _UpdateAccount = z.infer<typeof _updateMyAccountSchema>;
export type _AccountQueryUnique = z.infer<typeof _accountQueryUniqueSchema>;