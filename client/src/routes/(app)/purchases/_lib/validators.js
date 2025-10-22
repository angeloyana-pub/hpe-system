import { z } from 'zod';

export const addPurchaseSchema = z.object({
  part: z.number(),
  quantity: z.number().min(0),
  price: z.number().min(0),
  supplier: z.number(),
});

export const updatePurchaseSchema = addPurchaseSchema;
