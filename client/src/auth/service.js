import axios from 'axios';

import { client } from '@/api/client';

export async function getCurrentUser() {
  try {
    const res = await client.get('/auth/me');
    return res.data.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return null;
    }
    throw err;
  }
}

export async function login(data) {
  await client.post('/auth/login', data);
}

export async function logout() {
  await client.post('/auth/logout');
}

export async function changePassword(data) {
  await client.patch('/auth/change-password', data);
}
