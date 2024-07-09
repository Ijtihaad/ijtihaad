import { z } from 'zod';

export const postSchema = z.object({
  _id: z.any(),
  content: z.string().min(3).max(100),
  blocked: z.boolean().default(false),
  imageUrl: z.string().max(255).nullable().default(null),
  externalUrl: z.string().max(255).nullable().default(null),
});

export const postsSchema = z.array(postSchema)

export const createPostSchema = z.object({
  content: z.string().min(3).max(100).optional(),
  imageUrl: z.string().min(3).max(100).nullable().optional(),
  externalUrl: z.string().max(255).nullable().optional(),
});

export const updateMyPostSchema = postSchema.pick({
  content: true,
  imageUrl: true,
  externalUrl: true,
});

export const updatePostSchema = z.object({
  blocked: z.boolean().optional(),
});

export const postWhereUniqueInputSchema = z.object({
  _id: z.string().optional(),
});

export const postWhereInputSchema = z.object({
  blocked: z.boolean().optional(),
});

export type Post = z.infer<typeof postSchema>;
export type Posts = z.infer<typeof postsSchema>;
export type CreatePost = z.infer<typeof createPostSchema>;
export type UpdatePost = z.infer<typeof updatePostSchema>;
export type UpdateMyPost = z.infer<typeof updateMyPostSchema>;
export type PostWhereInput = z.infer<typeof postWhereInputSchema>;
export type PostWhereUniqueInput = z.infer<typeof postWhereUniqueInputSchema>;