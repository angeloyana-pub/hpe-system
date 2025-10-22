import { client } from './client';

export async function getOrders() {
  const res = await client.get('/orders');
  return res.data.data;
}

export async function addOrder(data) {
  const res = await client.post('/orders', data);
  return res.data.data;
}

export async function updateOrder(data) {
  const res = await client.patch(`/orders/${data.id}`, data.updatedOrder);
  return res.data.data;
}

export async function deleteOrder(orderId) {
  const res = await client.delete(`/orders/${orderId}`);
  return res.data.data;
}
