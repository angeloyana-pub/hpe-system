import { z } from 'zod';

export const addPartSchema = z.object({
  name: z
    .string({ message: 'Invalid name' })
    .min(1, { message: 'Name is required' })
    .max(255, { message: 'Name must be less than 255 characters' }),
  size: z
    .string({ message: 'Invalid size' })
    .min(1, { message: 'Size is required' })
    .max(255, { message: 'Size must be less than 255 characters' }),
  stock: z
    .number({ message: 'Invalid stock' })
    .min(0, { message: 'Stock must be greater than or equal to 0' }),
  lowStockThreshold: z
    .number({ message: 'Invalid threshold' })
    .min(0, { message: 'Threshold must be greater than or equal to 0' }),
  price: z.number({ message: 'Invalid price' }).min(1, { message: 'Price must be greater than 0' }),
  tags: z.array(z.number()),
});

export const updatePartSchema = addPartSchema.omit({
  stock: true,
});
