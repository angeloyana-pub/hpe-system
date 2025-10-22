import { client } from './client';

export async function getPurchases() {
  const res = await client.get('/purchases');
  return res.data.data;
}

export async function addPurchase(data) {
  const res = await client.post('/purchases', data);
  return res.data.data;
}

export async function updatePurchase(data) {
  const res = await client.patch(`/purchases/${data.id}`, data.updatedPurchase);
  return res.data.data;
}

export async function deletePurchase(purchaseId) {
  const res = await client.delete(`/purchases/${purchaseId}`);
  return res.data.data;
}
