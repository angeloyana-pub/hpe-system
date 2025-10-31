import { client } from '@/api/client';

export async function getSalesReport(params) {
  const res = await client.get('/reports/sales', { params });
  return res.data.data;
}
