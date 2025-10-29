import { client } from '@/api/client';

export async function getOrders(params) {
  const res = await client.get('/orders', { params });
  return res.data.data;
}

export async function addOrder(payload) {
  const res = await client.post('/orders', payload);
  return res.data.data;
}
