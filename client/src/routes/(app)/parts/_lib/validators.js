import { z } from 'zod';

export const addPartSchema = z.object({
  name: z.string().min(1).max(255),
  size: z.string().min(1).max(255),
  stock: z.number().min(0),
  lowStockThreshold: z.number().min(0),
  price: z.number().min(0),
  tags: z.array(z.number()),
});

export const updatePartSchema = addPartSchema;
