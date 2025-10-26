import { client } from '@/api/client';

export async function getPurchases() {
  const res = await client.get('/purchases');
  return res.data.data;
}

export async function addPurchase(payload) {
  const res = await client.post('/purchases', payload);
  return res.data.data;
}

export async function updatePurchase(id, payload) {
  const res = await client.patch(`/purchases/${id}`, payload);
  return res.data.data;
}

export async function deletePurchase(id) {
  const res = await client.delete(`/purchases/${id}`);
  return res.data.data;
}
