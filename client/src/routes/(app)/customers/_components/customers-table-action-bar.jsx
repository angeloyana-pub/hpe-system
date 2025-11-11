import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from '@/components/data-table/data-table-action-bar';
import { useDeleteCustomers } from '@/features/customers/mutations';

export function CustomersTableActionBar({ table }) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const deleteCustomers = useDeleteCustomers();

  const handleDeleteCustomers = () => {
    startDeleteTransition(async () => {
      try {
        const { rows } = table.getFilteredSelectedRowModel();
        await deleteCustomers.mutateAsync(rows.map((row) => row.original.id));
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
        tooltip="Delete customers"
        isPending={isDeletePending}
        onClick={handleDeleteCustomers}
      >
        <Trash2 />
      </DataTableActionBarAction>
    </DataTableActionBar>
  );
}
