import { Calculator, Plus } from 'lucide-react';
import { Link } from 'react-router';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { buttonVariants } from '@/components/ui/button';
import { useDataTable } from '@/hooks/use-data-table';

import { OrdersTableActionBar } from './orders-table-action-bar';

export function OrdersTable({ data, columns }) {
  const { orders, pageCount } = data;
  const { table } = useDataTable({
    data: orders,
    columns,
    pageCount,
    shallow: false,
  });

  return (
    <DataTable table={table} actionBar={<OrdersTableActionBar table={table} />}>
      <DataTableToolbar table={table}>
        <Link to="/point-of-sale" className={buttonVariants({ variant: 'outline' })}>
          <Calculator />
          Point of Sale
        </Link>
        <Link to="/orders/add" className={buttonVariants({ size: 'icon' })}>
          <Plus />
        </Link>
      </DataTableToolbar>
    </DataTable>
  );
}
