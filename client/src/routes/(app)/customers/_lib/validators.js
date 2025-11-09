import { z } from 'zod';

export const addCustomerSchema = z.object({
  firstName: z
    .string({ message: 'Invalid first name' })
    .min(1, { message: 'First name is required' })
    .max(255, { message: 'First name must be less than 255 characters' }),
  lastName: z
    .string({ message: 'Invalid last name' })
    .min(1, { message: 'Last name is required' })
    .max(255, { message: 'Last name must be less than 255 characters' }),
  phone: z
    .string({ message: 'Invalid phone number' })
    .length(11, { message: 'Phone number must be exactly 11 characters' }),
  email: z.string({ message: 'Invalid email' }).email({ message: 'Invalid email' }),
  address: z
    .string({ message: 'Invalid address' })
    .min(1, { message: 'Address is required' })
    .max(255, { message: 'Address must be less than 255 characters' }),
});

export const updateCustomerSchema = addCustomerSchema;
