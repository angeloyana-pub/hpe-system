import { useEffect, useState } from 'react';

import { DataTable } from '@/components/custom/data-table';
import { useDeletePurchase, usePurchases } from '@/hooks/use-purchases';

import { AddPurchaseDialog } from './_components/add-purchase-dialog';
import { UpdatePurchaseDialog } from './_components/update-purchase-dialog';
import { getColumns } from './_lib/columns';

function Purchases() {
  const deletePurchaseMutation = useDeletePurchase();
  const { data } = usePurchases({ initialData: [] });

  const [rowAction, setRowAction] = useState(null);
  const columns = getColumns({ setRowAction });

  useEffect(() => {
    if (rowAction === null || rowAction.variant != 'delete') return;
    deletePurchaseMutation.mutate(rowAction.row.original.id);
  }, [rowAction]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex">
        <AddPurchaseDialog />
      </div>
      <DataTable columns={columns} data={data} />
      <UpdatePurchaseDialog
        open={rowAction?.variant === 'update'}
        onOpenChange={() => setRowAction(null)}
        purchase={rowAction?.row.original ?? null}
      />
    </div>
  );
}

export default Purchases;
