import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';

import { AddPurchaseDialog } from './add-purchase-dialog';

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
        <AddPurchaseDialog />
      </DataTableToolbar>
    </DataTable>
  );
}
