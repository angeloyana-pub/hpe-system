import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';

import { AddCustomerDialog } from './add-customer-dialog';
import { CustomersTableActionBar } from './customers-table-action-bar';

export function CustomersTable({ data, columns }) {
  const { customers, pageCount } = data;
  const { table } = useDataTable({
    data: customers,
    columns,
    pageCount,
    shallow: false,
  });

  return (
    <DataTable table={table} actionBar={<CustomersTableActionBar table={table} />}>
      <DataTableToolbar table={table}>
        <AddCustomerDialog />
      </DataTableToolbar>
    </DataTable>
  );
}
