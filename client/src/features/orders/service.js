import { client } from '@/api/client';

export async function getOrders(params) {
  const res = await client.get('/orders', { params });
  return res.data.data;
}

export async function getOrder(id) {
  const res = await client.get(`/orders/${id}`);
  return res.data.data;
}

export async function addOrder(payload) {
  const res = await client.post('/orders', payload);
  return res.data.data;
}

export async function updateOrder(id, payload) {
  const res = await client.patch(`/orders/${id}`, payload);
  return res.data.data;
}

export async function deleteOrder(id) {
  const res = await client.delete(`/orders/${id}`);
  return res.data.data;
}

export async function deleteOrders(ids) {
  const res = await client.delete('/orders', { params: { ids } });
  return res.data.data;
}
