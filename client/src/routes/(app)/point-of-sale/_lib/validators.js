import { z } from 'zod';

export const paymentSchema = z.object({
  paymentAmount: z.number({ message: 'Invalid payment' }),
  paymentMethod: z.enum(['cash', 'check']),
  customer: z.number({ message: 'Invalid customer' }),
});
