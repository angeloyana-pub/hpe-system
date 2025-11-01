import { z } from 'zod';

export const addSupplierSchema = z.object({
  name: z
    .string({ message: 'Invalid name' })
    .min(1, { message: 'Name is required' })
    .max(255, { message: 'Name must be less than 255 characters' }),
});

export const updateSupplierSchema = addSupplierSchema;
