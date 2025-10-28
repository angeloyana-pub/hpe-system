import { client } from '@/api/client';

export async function getSalesReport(interval) {
  const res = await client.get('/reports/sales', {
    params: {
      interval,
    },
  });
  return res.data.data;
}
