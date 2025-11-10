import { z } from 'zod';

import { purchaseStatus } from '@/data/purchase-status';

export const addPurchaseSchema = z.object({
  supplier: z.number({ message: 'Supplier is required' }),
  status: z.enum(
    purchaseStatus.map((s) => s.value),
    { message: 'Status is required' }
  ),
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

export const updatePurchaseSchema = addPurchaseSchema;
