import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';

import { AddPartDialog } from './add-part-dialog';
import { PartsTableActionBar } from './parts-table-action-bar';

export function PartsTable({ data, columns }) {
  const { parts, pageCount } = data;
  const { table } = useDataTable({
    data: parts,
    columns,
    pageCount,
    shallow: false,
  });

  return (
    <DataTable table={table} actionBar={<PartsTableActionBar table={table} />}>
      <DataTableToolbar table={table}>
        <AddPartDialog />
      </DataTableToolbar>
    </DataTable>
  );
}
