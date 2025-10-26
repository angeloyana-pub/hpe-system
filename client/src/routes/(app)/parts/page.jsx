import { useEffect, useState } from 'react';

import { DataTable } from '@/components/custom/data-table';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useDeletePart } from '@/features/parts/mutations';
import { useParts } from '@/features/parts/queries';

import { AddPartDialog } from './_components/add-part-dialog';
import { UpdatePartDialog } from './_components/update-part-dialog';
import { getColumns } from './_lib/columns';

function Parts() {
  const deletePart = useDeletePart();
  const { data } = useParts();

  const [rowAction, setRowAction] = useState(null);
  const columns = getColumns({ setRowAction });

  useEffect(() => {
    if (rowAction === null || rowAction.variant != 'delete') return;
    deletePart.mutate(rowAction.row.original.id);
  }, [rowAction]);

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b gap-2">
        <SidebarTrigger />
        Parts
      </header>
      <div className="p-4 space-y-4">
        <div className="flex">
          <AddPartDialog />
        </div>
        <DataTable data={data} columns={columns} />
        <UpdatePartDialog
          open={rowAction?.variant === 'update'}
          onOpenChange={() => setRowAction(null)}
          part={rowAction?.row.original ?? null}
        />
      </div>
    </SidebarInset>
  );
}

export default Parts;
