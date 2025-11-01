import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string({ message: 'Invalid username' })
    .min(1, { message: 'Username is required' })
    .max(255, { message: 'Username must be less than 255 characters' }),
  password: z.string({ message: 'Invalid password' }).min(1, { message: 'Password is required' }),
});
