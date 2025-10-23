import { Calculator } from 'lucide-react';
import { Link } from 'react-router';

import { DataTable } from '@/components/custom/data-table';
import { buttonVariants } from '@/components/ui/button';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useOrders } from '@/hooks/use-orders';

import { getColumns } from './_lib/columns';

function Orders() {
  const { data } = useOrders({ initialData: [] });
  const columns = getColumns();

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b gap-2">
        <SidebarTrigger />
        Orders
      </header>
      <div className="p-4 space-y-4">
        <div className="flex">
          <Link to="/point-of-sale" className={buttonVariants()}>
            <Calculator />
            Point of Sale
          </Link>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </SidebarInset>
  );
}

export default Orders;
