import { useEffect, useState } from 'react';

import { DataTable } from '@/components/custom/data-table';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useDeleteSupplier, useSuppliers } from '@/hooks/use-suppliers';

import { AddSupplierDialog } from './_components/add-supplier-dialog';
import { UpdateSupplierDialog } from './_components/update-supplier-dialog';
import { getColumns } from './_lib/columns';

function Suppliers() {
  const deleteSupplierMutation = useDeleteSupplier();
  const { data } = useSuppliers({ initialData: [] });

  const [rowAction, setRowAction] = useState(null);
  const columns = getColumns({ setRowAction });

  useEffect(() => {
    if (rowAction === null || rowAction.variant != 'delete') return;
    deleteSupplierMutation.mutate(rowAction.row.original.id);
  }, [rowAction]);

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b gap-2">
        <SidebarTrigger />
        Suppliers
      </header>
      <div className="p-4 space-y-4">
        <div className="flex">
          <AddSupplierDialog />
        </div>
        <DataTable columns={columns} data={data} />
        <UpdateSupplierDialog
          open={rowAction?.variant === 'update'}
          onOpenChange={() => setRowAction(null)}
          supplier={rowAction?.row.original ?? null}
        />
      </div>
    </SidebarInset>
  );
}

export default Suppliers;
