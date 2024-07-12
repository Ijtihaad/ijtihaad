import { z } from 'zod';
import { AccountType, _accountQueryUniqueSchema, accountQueryUniqueSchema, accountSchema } from './account.schema';
import { assetSchema } from './asset.schema';
import { bookmarkSchema } from './bookmark.schema';
import { commentSchema } from './comment.schema';
import { reactionSchema } from './reaction.schema';
import { voteSchema } from './vote.schema';


export const thoughtSchema = z.object({
  _id: z.string(),
  content: z.string().max(255),
  asset: assetSchema.nullable(),
  author: accountSchema.extend({
    accountType: z.literal(AccountType.user)
  }).nullable(),
  account: accountSchema,
  comments: z.array(commentSchema),
  reactions: z.array(reactionSchema),
  votes: z.array(voteSchema),
  bookmarks: z.array(bookmarkSchema),
});

export type Thought = z.infer<typeof thoughtSchema>;

// =======================API===========================

export const createThoughtSchema = z.object({
  content: z.string().max(255),
  asset: assetSchema.optional(),
  account: accountQueryUniqueSchema,
});

export const updateThoughtSchema = z.object({
  content: z.string().max(255),
  asset: assetSchema.optional(),
});


export const thoughtQuerySchema = z.object({
  account: accountQueryUniqueSchema.optional(),
});

export const thoughtQueryUniqueSchema = z.object({
  _id: z.string().optional(),
});

export type CreateThought = z.infer<typeof createThoughtSchema>;
export type UpdateThought = z.infer<typeof updateThoughtSchema>;
export type ThoughtQuery = z.infer<typeof thoughtQuerySchema>;
export type ThoughtQueryUnique = z.infer<typeof thoughtQueryUniqueSchema>;

// ======================SVC============================

export const _createThoughtSchema = z.object({
  userId: z.string(),
  content: z.string().max(255),
  asset: assetSchema.optional(),
  account: _accountQueryUniqueSchema,
});

export const _updateThoughtSchema = z.object({
  content: z.string().max(255),
  asset: assetSchema.optional(),
});

export const _thoughtQuerySchema = z.object({
  account: _accountQueryUniqueSchema.optional(),
});

export const _thoughtQueryUniqueSchema = z.object({
  _id: z.string().optional(),
});

export type _CreateThought = z.infer<typeof _createThoughtSchema>;
export type _UpdateThought = z.infer<typeof _updateThoughtSchema>;
export type _ThoughtQuery = z.infer<typeof _thoughtQuerySchema>;
export type _ThoughtQueryUnique = z.infer<typeof _thoughtQueryUniqueSchema>;
