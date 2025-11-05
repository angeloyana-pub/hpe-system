import { z } from 'zod';

export const changePasswordSchema = z.object({
  oldPassword: z
    .string({ message: 'Invalid old password' })
    .min(1, { message: 'Old password is required' }),
  newPassword: z
    .string({ message: 'Invalid new password' })
    .min(1, { message: 'New password is required' }),
});
