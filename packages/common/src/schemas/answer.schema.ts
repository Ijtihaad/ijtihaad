import { z } from 'zod';
import { AccountType, accountQueryUniqueSchema, accountSchema } from './account.schema';
import { commentSchema } from './comment.schema';
import { voteSchema } from './vote.schema';

export const answerSchema = z.object({
  _id: z.any(),
  body: z.string(),
  comments: z.lazy(() => z.array(commentSchema)),
  votes: z.array(voteSchema),
  account: accountSchema,
  author: accountSchema.extend({
    accountType: z.literal(AccountType.user)
  }),
});
export type Answer = z.infer<typeof answerSchema>;

// =================API=================================

export const createAnswerSchema = z.object({
  body: z.string(),
  account: accountQueryUniqueSchema,
});

export const updateAnswerSchema = z.object({
  body: z.string(),
});

export const answerUniqueQuerySchema = z.object({
  _id: z.string().optional(),
});

export type CreateAnswer = z.infer<typeof createAnswerSchema>;
export type UpdateAnswer = z.infer<typeof updateAnswerSchema>;
export type AnswerQueryUnique = z.infer<typeof answerUniqueQuerySchema>;

// =================SVC=================================

export const _createAnswerSchema = z.object({
  body: z.string(),
  account: accountQueryUniqueSchema,
  author: z.object({
    accountId: z.string()
  })
});

export const _updateAnswerSchema = z.object({
  body: z.string(),
});

export const _answerUniqueQuerySchema = z.object({
  _id: z.string().optional(),
});

export type _CreateAnswer = z.infer<typeof _createAnswerSchema>;
export type _UpdateAnswer = z.infer<typeof _updateAnswerSchema>;
export type _AnswerQueryUnique = z.infer<typeof _answerUniqueQuerySchema>;