import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.string(),
  type: z.string(),
  title: z.string().min(2).max(50),
  account: z.string().optional(),
  community: z.string().min(2).max(50),
});
