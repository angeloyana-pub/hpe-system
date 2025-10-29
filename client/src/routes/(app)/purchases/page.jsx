import { useEffect, useMemo, useState } from 'react';

import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useDeletePurchase } from '@/features/purchases/mutations';
import { usePurchases } from '@/features/purchases/queries';

import { PurchasesTable } from './_components/purchases-table';
import { UpdatePurchaseDialog } from './_components/update-purchase-dialog';
import { getColumns } from './_lib/columns';

function Purchases() {
  const deletePurchase = useDeletePurchase();
  const { data = { purchases: [], pageCount: 0 } } = usePurchases();

  const [rowAction, setRowAction] = useState(null);
  const columns = useMemo(() => getColumns({ setRowAction }), []);

  useEffect(() => {
    if (rowAction === null || rowAction.variant != 'delete') return;
    deletePurchase.mutate(rowAction.row.original.id);
  }, [rowAction]);

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b gap-2">
        <SidebarTrigger />
        Purchases
      </header>
      <div className="p-4 space-y-4">
        <PurchasesTable data={data} columns={columns} />
        <UpdatePurchaseDialog
          open={rowAction?.variant === 'update'}
          onOpenChange={() => setRowAction(null)}
          purchase={rowAction?.row.original ?? null}
        />
      </div>
    </SidebarInset>
  );
}

export default Purchases;
