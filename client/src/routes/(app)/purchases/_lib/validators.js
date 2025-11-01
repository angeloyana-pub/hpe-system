import { z } from 'zod';

export const addPurchaseSchema = z.object({
  part: z.number({ message: 'Part is required' }),
  quantity: z
    .number({ message: 'Invalid quantity' })
    .min(1, { message: 'Quantity must be greater than 0' }),
  price: z.number({ message: 'Invalid price' }).min(1, { message: 'Price must be greater than 0' }),
  supplier: z.number({ message: 'Supplier is required' }),
});

export const updatePurchaseSchema = addPurchaseSchema;
