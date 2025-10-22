import { z } from 'zod';

export const addSupplierSchema = z.object({
  name: z.string().min(1).max(255),
});

export const updateSupplierSchema = addSupplierSchema;
