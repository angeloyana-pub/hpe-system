import { useEffect, useMemo, useState } from 'react';

import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useDeleteOrder } from '@/features/orders/mutations';
import { useOrders } from '@/features/orders/queries';

import { OrderItemsDialog } from './_components/order-items-dialog';
import { OrdersTable } from './_components/orders-table';
import { getColumns } from './_lib/columns';

function Orders() {
  const deleteOrder = useDeleteOrder();
  const { data = { orders: [], pageCount: 0 } } = useOrders();

  const [rowAction, setRowAction] = useState(null);
  const columns = useMemo(() => getColumns({ setRowAction }), []);

  useEffect(() => {
    if (rowAction === null || rowAction.variant != 'delete') return;
    deleteOrder.mutate(rowAction.row.original.id);
  }, [rowAction]);

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b gap-2">
        <SidebarTrigger />
        Orders
      </header>
      <div className="p-4 space-y-4">
        <OrdersTable data={data} columns={columns} />
        <OrderItemsDialog
          open={rowAction?.variant === 'viewOrderItems'}
          onOpenChange={() => setRowAction(null)}
          order={rowAction?.row.original ?? null}
        />
      </div>
    </SidebarInset>
  );
}

export default Orders;
