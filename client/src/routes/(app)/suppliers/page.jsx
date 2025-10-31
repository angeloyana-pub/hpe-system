import { useEffect, useMemo, useState } from 'react';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useDeleteSupplier } from '@/features/suppliers/mutations';
import { useSuppliers } from '@/features/suppliers/queries';

import { SuppliersTable } from './_components/suppliers-table';
import { UpdateSupplierDialog } from './_components/update-supplier-dialog';
import { getColumns } from './_lib/columns';

function Suppliers() {
  const deleteSupplier = useDeleteSupplier();
  const { data = { suppliers: [], pageCount: 0 } } = useSuppliers();

  const [rowAction, setRowAction] = useState(null);
  const columns = useMemo(() => getColumns({ setRowAction }), []);

  useEffect(() => {
    if (rowAction === null || rowAction.variant != 'delete') return;
    deleteSupplier.mutate(rowAction.row.original.id);
  }, [rowAction]);

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b">
        <SidebarTrigger />
        <Separator orientation="vertical" className="ml-2 mr-4" />
        Suppliers
      </header>
      <div className="p-4 space-y-4">
        <SuppliersTable data={data} columns={columns} />
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
