import { useMemo, useState } from 'react';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { usePurchases } from '@/features/purchases/queries';

import { DeletePurchaseDialog } from './_components/delete-purchase-dialog';
import { PurchasesTable } from './_components/purchases-table';
import { UpdatePurchaseDialog } from './_components/update-purchase-dialog';
import { getColumns } from './_lib/columns';

function Purchases() {
  const { data = { purchases: [], pageCount: 0 } } = usePurchases();

  const [rowAction, setRowAction] = useState(null);
  const columns = useMemo(() => getColumns({ setRowAction }), []);

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b">
        <SidebarTrigger />
        <Separator orientation="vertical" className="ml-2 mr-4" />
        Purchases
      </header>
      <div className="p-4 space-y-4">
        <PurchasesTable data={data} columns={columns} />
        <UpdatePurchaseDialog
          open={rowAction?.variant === 'update'}
          onOpenChange={() => setRowAction(null)}
          purchase={rowAction?.row.original ?? null}
        />
        <DeletePurchaseDialog
          open={rowAction?.variant === 'delete'}
          onOpenChange={() => setRowAction(null)}
          purchase={rowAction?.row.original ?? null}
        />
      </div>
    </SidebarInset>
  );
}

export default Purchases;
