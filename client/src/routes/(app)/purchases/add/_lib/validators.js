import { z } from 'zod';

export const addPurchaseSchema = z.object({
  supplier: z.number({ message: 'Supplier is required' }),
  purchaseItems: z
    .array(
      z.object({
        part: z.object({
          id: z.number(),
        }),
        quantity: z.number().min(1),
        price: z.number().min(1),
      })
    )
    .min(1, { message: 'Items is required' }),
});
