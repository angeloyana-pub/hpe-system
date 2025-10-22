import { client } from './client';

export async function getSuppliers() {
  const res = await client.get('/suppliers');
  return res.data.data;
}

export async function addSupplier(data) {
  const res = await client.post('/suppliers', data);
  return res.data.data;
}

export async function updateSupplier(data) {
  const res = await client.patch(`/suppliers/${data.id}`, data.updatedSupplier);
  return res.data.data;
}

export async function deleteSupplier(supplierId) {
  const res = await client.delete(`/suppliers/${supplierId}`);
  return res.data.data;
}
