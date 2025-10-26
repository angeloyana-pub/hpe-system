import { client } from '@/api/client';

export async function getSuppliers() {
  const res = await client.get('/suppliers');
  return res.data.data;
}

export async function addSupplier(payload) {
  const res = await client.post('/suppliers', payload);
  return res.data.data;
}

export async function updateSupplier(id, payload) {
  const res = await client.patch(`/suppliers/${id}`, payload);
  return res.data.data;
}

export async function deleteSupplier(id) {
  const res = await client.delete(`/suppliers/${id}`);
  return res.data.data;
}
