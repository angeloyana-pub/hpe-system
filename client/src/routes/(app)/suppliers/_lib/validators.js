import { z } from 'zod';

export const addSupplierSchema = z.object({
  name: z
    .string({ message: 'Invalid name' })
    .min(1, { message: 'Name is required' })
    .max(255, { message: 'Name must be less than 255 characters' }),
  phone: z
    .string({ message: 'Invalid phone number' })
    .length(11, { message: 'Phone number must be exactly 11 characters' }),
  email: z.string({ message: 'Invalid email' }).email({ message: 'Invalid email' }),
  address: z
    .string({ message: 'Invalid address' })
    .min(1, { message: 'Address is required' })
    .max(255, { message: 'Address must be less than 255 characters' }),
});

export const updateSupplierSchema = addSupplierSchema;
