import { Plus } from 'lucide-react';
import { Link } from 'react-router';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { buttonVariants } from '@/components/ui/button';
import { useDataTable } from '@/hooks/use-data-table';

export function PurchasesTable({ data, columns }) {
  const { purchases, pageCount } = data;
  const { table } = useDataTable({
    data: purchases,
    columns,
    pageCount,
    shallow: false,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <Link to="/purchases/add" className={buttonVariants()}>
          <Plus />
          Add Purchase
        </Link>
      </DataTableToolbar>
    </DataTable>
  );
}
