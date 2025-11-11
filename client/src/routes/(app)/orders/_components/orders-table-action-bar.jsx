import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from '@/components/data-table/data-table-action-bar';
import { useDeleteOrders } from '@/features/orders/mutations';

export function OrdersTableActionBar({ table }) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const deleteOrders = useDeleteOrders();

  const handleDeleteOrders = () => {
    startDeleteTransition(async () => {
      try {
        const { rows } = table.getFilteredSelectedRowModel();
        await deleteOrders.mutateAsync(rows.map((row) => row.original.id));
        table.toggleAllRowsSelected(false);
        toast.success('Selected rows has been deleted');
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 403) {
          toast.error('Unable to proceed because some records are already completed.');
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
        tooltip="Delete orders"
        isPending={isDeletePending}
        onClick={handleDeleteOrders}
      >
        <Trash2 />
      </DataTableActionBarAction>
    </DataTableActionBar>
  );
}
