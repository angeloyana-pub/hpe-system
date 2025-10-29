import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';

import { AddTagDialog } from './add-tag-dialog';

export function TagsTable({ data, columns }) {
  const { tags, pageCount } = data;
  const { table } = useDataTable({
    data: tags,
    columns,
    pageCount,
    shallow: false,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <AddTagDialog />
      </DataTableToolbar>
    </DataTable>
  );
}
