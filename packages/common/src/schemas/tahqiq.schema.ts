import { z } from 'zod';
import { AccountType, accountSchema } from './account.schema';
import { answerSchema } from './answer.schema';
import { AssetType, assetSchema } from './asset.schema';
import { bookmarkSchema } from './bookmark.schema';
import { voteSchema } from './vote.schema';

export const tahqiqSchema = z.object({
  _id: z.any(),
  question: z.string().max(255),
  asset: assetSchema.extend({
    assetType: z.literal(AssetType.audio)
  }).nullable(),
  user: accountSchema.extend({
    accountType: z.literal(AccountType.user)
  }),
  votes: z.array(voteSchema),
  answers: z.array(answerSchema),
  bookmarks: z.array(bookmarkSchema),
});

export type Tahqiq = z.infer<typeof tahqiqSchema>;

// =====================API==========================

export const createTahqiqSchema = z.object({
  question: z.string().max(255),
  asset: z.string().optional(),
  userId: z.string(),
});

export const updateTahqiqSchema = z.object({
  question: z.string().max(255).optional(),
  asset: z.string().optional().optional(),
});

export const tahqiqQueryUniqueSchema = z.object({
  _id: z.string().optional(),
});

export type CreateTahqiq = z.infer<typeof createTahqiqSchema>;
export type UpdateTahqiq = z.infer<typeof updateTahqiqSchema>;
export type TahqiqQueryUnique = z.infer<typeof tahqiqQueryUniqueSchema>;


// ============================SVC===============================

export const _createTahqiqSchema = z.object({
  question: z.string().max(255),
  asset: z.string().optional(),
  userId: z.string(),
});

export const _updateTahqiqSchema = z.object({
  question: z.string().max(255).optional(),
  asset: z.string().optional().optional(),
});

export const _tahqiqQueryUniqueSchema = z.object({
  _id: z.string().optional(),
});

export type _CreateTahqiq = z.infer<typeof _createTahqiqSchema>;
export type _UpdateTahqiq = z.infer<typeof _updateTahqiqSchema>;
export type _TahqiqQueryUnique = z.infer<typeof _tahqiqQueryUniqueSchema>;