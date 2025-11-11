import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from '@/components/data-table/data-table-action-bar';
import { useDeleteParts } from '@/features/parts/mutations';

export function PartsTableActionBar({ table }) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const deleteParts = useDeleteParts();

  const handleDeleteParts = () => {
    startDeleteTransition(async () => {
      try {
        const { rows } = table.getFilteredSelectedRowModel();
        await deleteParts.mutateAsync(rows.map((row) => row.original.id));
        table.toggleAllRowsSelected(false);
        toast.success('Selected rows has been deleted');
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 409) {
          toast.error('Unable to proceed because some records are linked to others.');
        } else {
          throw err;
        }
      }
    });
  };

  return (
    <DataTableActionBar table={table}>
      <DataTableActionBarSelection table={table} />
      <DataTableActionBarAction
        size="icon"
        tooltip="Delete parts"
        isPending={isDeletePending}
        onClick={handleDeleteParts}
      >
        <Trash2 />
      </DataTableActionBarAction>
    </DataTableActionBar>
  );
}
