import { z } from 'zod';

export const paymentSchema = z.object({
  paymentAmount: z.number(),
  paymentMethod: z.enum(['cash', 'gcash', 'credit_card']),
});
