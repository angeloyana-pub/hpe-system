import { client } from './client';

export async function getParts() {
  const res = await client.get('/parts');
  return res.data.data;
}

export async function addPart(data) {
  const res = await client.post('/parts', data);
  return res.data.data;
}

export async function updatePart(data) {
  const res = await client.patch(`/parts/${data.id}`, data.updatedPart);
  return res.data.data;
}

export async function deletePart(partId) {
  const res = await client.delete(`/parts/${partId}`);
  return res.data.data;
}
