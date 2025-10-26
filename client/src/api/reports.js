import { client } from './client';

export async function getSalesReport() {
  const res = await client.get('/reports/sales');
  return res.data.data;
}
