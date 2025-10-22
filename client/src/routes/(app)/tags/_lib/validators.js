import { z } from 'zod';

export const addTagSchema = z.object({
  name: z.string().min(1).max(255),
});

export const updateTagSchema = addTagSchema;
