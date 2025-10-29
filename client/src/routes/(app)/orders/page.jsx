import { useMemo } from 'react';

import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useOrders } from '@/features/orders/queries';

import { OrdersTable } from './_components/orders-table';
import { getColumns } from './_lib/columns';

function Orders() {
  const { data = { orders: [], pageCount: 0 } } = useOrders();
  const columns = useMemo(() => getColumns(), []);

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b gap-2">
        <SidebarTrigger />
        Orders
      </header>
      <div className="p-4 space-y-4">
        <OrdersTable data={data} columns={columns} />
      </div>
    </SidebarInset>
  );
}

export default Orders;
