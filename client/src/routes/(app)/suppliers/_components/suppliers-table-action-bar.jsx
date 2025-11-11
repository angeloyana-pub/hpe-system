import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from '@/components/data-table/data-table-action-bar';
import { useDeleteSuppliers } from '@/features/suppliers/mutations';

export function SuppliersTableActionBar({ table }) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const deleteSuppliers = useDeleteSuppliers();

  const handleDeleteSuppliers = () => {
    startDeleteTransition(async () => {
      try {
        const { rows } = table.getFilteredSelectedRowModel();
        await deleteSuppliers.mutateAsync(rows.map((row) => row.original.id));
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
        tooltip="Delete suppliers"
        isPending={isDeletePending}
        onClick={handleDeleteSuppliers}
      >
        <Trash2 />
      </DataTableActionBarAction>
    </DataTableActionBar>
  );
}
