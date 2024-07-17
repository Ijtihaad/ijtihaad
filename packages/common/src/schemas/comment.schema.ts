import { z } from 'zod';
import { AccountType, accountSchema } from './account.schema';
import { reactionSchema } from './reaction.schema';

export const commentSchema = z.object({
  _id: z.any(),
  body: z.string(),
  user: accountSchema.extend({
    accountType: z.literal(AccountType.user)
  }),
  comments: z.array(z.any()),
  reactions: z.array(reactionSchema),
})

export type Comment = { comments: Comment[] } & Omit<z.infer<typeof commentSchema>, 'comments'>

// =================API=======================

export const createCommentSchema = z.object({
  body: z.string(),
  user: accountSchema.extend({
    accountType: z.literal(AccountType.user)
  }),
});

export const updateCommentSchema = z.object({
  body: z.string(),
});

export const commentQueryUniqueSchema = z.object({
  _id: z.string().optional(),
});

export type CreateComment = z.infer<typeof createCommentSchema>;
export type UpdateComment = z.infer<typeof updateCommentSchema>;
export type CommentQueryUnique = z.infer<typeof commentQueryUniqueSchema>;

// =================API=======================

export const _createCommentSchema = z.object({
  body: z.string(),
  user: accountSchema.extend({
    accountType: z.literal(AccountType.user)
  }),
});

export const _updateCommentSchema = z.object({
  body: z.string(),
});

export const _commentQueryUniqueSchema = z.object({
  _id: z.string().optional(),
});

export type _CreateComment = z.infer<typeof _createCommentSchema>;
export type _UpdateComment = z.infer<typeof _updateCommentSchema>;
export type _CommentQueryUnique = z.infer<typeof _commentQueryUniqueSchema>;