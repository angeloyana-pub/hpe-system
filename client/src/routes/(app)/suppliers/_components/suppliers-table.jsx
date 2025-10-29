import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';

import { AddSupplierDialog } from './add-supplier-dialog';

export function SuppliersTable({ data, columns }) {
  const { suppliers, pageCount } = data;
  const { table } = useDataTable({
    data: suppliers,
    columns,
    pageCount,
    shallow: false,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <AddSupplierDialog />
      </DataTableToolbar>
    </DataTable>
  );
}
