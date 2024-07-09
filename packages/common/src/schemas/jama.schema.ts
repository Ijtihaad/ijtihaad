import { z } from 'zod';

export const jamaSchema = z.object({
  _id: z.any(),
  jamaName: z.string().min(3).max(100),
  displayName: z.string().min(3).max(100),
  blocked: z.boolean().default(false),
  picture: z.string().max(255).nullable().default(null),
});

export const jamasSchema = z.array(jamaSchema)

export const createJamaSchema = z.object({
  jamaName: z.string().min(3).max(100),
  displayName: z.string().min(3).max(100),
  picture: z.string().max(255).nullable().default(null),
});

export const updateMyJamaSchema = jamaSchema.pick({
  jamaName: true,
  displayName: true,
  picture: true,
});

export const updateJamaSchema = z.object({
  blocked: z.boolean().optional(),
});

export const jamaWhereUniqueInputSchema = z.object({
  _id: z.string().optional(),
  jamaName: z.string().optional(),
});

export const jamaWhereInputSchema = z.object({
  blocked: z.boolean().optional(),
});

export type Jama = z.infer<typeof jamaSchema>;
export type Jamas = z.infer<typeof jamasSchema>;
export type CreateJama = z.infer<typeof createJamaSchema>;
export type UpdateJama = z.infer<typeof updateJamaSchema>;
export type UpdateMyJama = z.infer<typeof updateMyJamaSchema>;
export type JamaWhereInput = z.infer<typeof jamaWhereInputSchema>;
export type JamaWhereUniqueInput = z.infer<typeof jamaWhereUniqueInputSchema>;