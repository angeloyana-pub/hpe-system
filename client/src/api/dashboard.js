import { client } from './client';

export async function getLowStockParts() {
  const res = await client.get('/dashboard/low-stock-parts');
  return res.data.data;
}

export async function getTotalSales() {
  const res = await client.get('/dashboard/total-sales');
  return res.data.data;
}

export async function getTotalOrders() {
  const res = await client.get('/dashboard/total-orders');
  return res.data.data;
}
