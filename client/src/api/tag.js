import { client } from './client';

export async function getTags() {
  const res = await client.get('/tags');
  return res.data.data;
}

export async function addTag(data) {
  const res = await client.post('/tags', data);
  return res.data.data;
}

export async function updateTag(data) {
  const res = await client.patch(`/tags/${data.id}`, data.updatedTag);
  return res.data.data;
}

export async function deleteTag(tagId) {
  const res = await client.delete(`/tags/${tagId}`);
  return res.data.data;
}
