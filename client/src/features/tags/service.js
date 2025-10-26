import { client } from '@/api/client';

export async function getTags() {
  const res = await client.get('/tags');
  return res.data.data;
}

export async function addTag(payload) {
  const res = await client.post('/tags', payload);
  return res.data.data;
}

export async function updateTag(id, payload) {
  const res = await client.patch(`/tags/${id}`, payload);
  return res.data.data;
}

export async function deleteTag(id) {
  const res = await client.delete(`/tags/${id}`);
  return res.data.data;
}
