import { client } from '@/api/client';

export async function getParts(params) {
  const res = await client.get('/parts', { params });
  return res.data.data;
}

export async function getAllParts() {
  const res = await client.get('/parts/all');
  return res.data.data;
}

export async function addPart(payload) {
  const res = await client.post('/parts', payload);
  return res.data.data;
}

export async function updatePart(id, payload) {
  const res = await client.patch(`/parts/${id}`, payload);
  return res.data.data;
}

export async function deletePart(id) {
  const res = await client.delete(`/parts/${id}`);
  return res.data.data;
}

export async function deleteParts(ids) {
  const res = await client.delete('/parts', { params: { ids } });
  return res.data.data;
}
