import z from 'zod';

export const productSchema = z.object({
  name: z.string(),
  createdAt: z.string(),
  quantity: z.number().positive(),
  sentBy: z.string(),
  expires: z.string(),
  localImg: z.string(),
  localDesc: z.string(),
});
