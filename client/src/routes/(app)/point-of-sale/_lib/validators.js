import { z } from 'zod';

export const paymentSchema = z.object({
  paymentAmount: z.number({ message: 'Invalid payment' }),
  paymentMethod: z.enum(['cash', 'gcash', 'credit_card']),
  customer: z.number({ message: 'Invalid customer' }),
});
