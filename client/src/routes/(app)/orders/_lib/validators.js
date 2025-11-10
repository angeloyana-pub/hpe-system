import { z } from 'zod';

import { orderStatus } from '@/data/order-status';
import { paymentMethods } from '@/data/payment-methods';

export const addOrderSchema = z.object({
  customer: z.number({ message: 'Customer is required' }),
  status: z.enum(
    orderStatus.map((s) => s.value),
    { message: 'Status is required' }
  ),
  paymentAmount: z.number({ message: 'Invalid payment' }),
  paymentMethod: z.enum(
    paymentMethods.map(({ value }) => value),
    { message: 'Payment method is required' }
  ),
  orderItems: z
    .array(
      z.object({
        part: z.object({
          id: z.number(),
        }),
        quantity: z.number().min(1),
        price: z.number().min(1),
      })
    )
    .min(1, { message: 'Items is required' }),
});

export const updateOrderSchema = addOrderSchema;
