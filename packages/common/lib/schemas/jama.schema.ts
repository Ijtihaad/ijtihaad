import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.string(),
  type: z.string(),
  account: z.string().optional(),
  jama: z.string().min(2).max(50),
  images: z.array(z.string()).optional(),
  video: z.string().optional(),
});
