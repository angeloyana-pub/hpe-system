import { client } from '@/api/client';

export async function getCustomers(params) {
  const res = await client.get('/customers', { params });
  return res.data.data;
}

export async function getAllCustomers() {
  const res = await client.get('/customers/all');
  return res.data.data;
}

export async function addCustomer(payload) {
  const res = await client.post('/customers', payload);
  return res.data.data;
}

export async function updateCustomer(id, payload) {
  const res = await client.patch(`/customers/${id}`, payload);
  return res.data.data;
}

export async function deleteCustomer(id) {
  const res = await client.delete(`/customers/${id}`);
  return res.data.data;
}

export async function deleteCustomers(ids) {
  const res = await client.delete('/customers', { params: { ids } });
  return res.data.data;
}
