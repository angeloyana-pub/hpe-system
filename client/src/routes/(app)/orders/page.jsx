import { useMemo, useState } from 'react';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useUpdateOrder } from '@/features/orders/mutations';
import { useOrders } from '@/features/orders/queries';

import { DeleteOrderDialog } from './_components/delete-order-dialog';
import { OrderItemsDialog } from './_components/order-items-dialog';
import { OrdersTable } from './_components/orders-table';
import { getColumns } from './_lib/columns';

function Orders() {
  const { data = { orders: [], pageCount: 0 } } = useOrders();
  const updateOrder = useUpdateOrder();

  const [rowAction, setRowAction] = useState(null);
  const columns = useMemo(() => getColumns({ updateOrder, setRowAction }), []);

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b">
        <SidebarTrigger />
        <Separator orientation="vertical" className="ml-2 mr-4" />
        Orders
      </header>
      <div className="p-4 space-y-4">
        <OrdersTable data={data} columns={columns} />
        <OrderItemsDialog
          open={rowAction?.variant === 'viewOrderItems'}
          onOpenChange={() => setRowAction(null)}
          order={rowAction?.row.original ?? null}
        />
        <DeleteOrderDialog
          open={rowAction?.variant === 'delete'}
          onOpenChange={() => setRowAction(null)}
          order={rowAction?.row.original ?? null}
        />
      </div>
    </SidebarInset>
  );
}

export default Orders;
