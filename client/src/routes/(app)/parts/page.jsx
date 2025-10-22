import { useEffect, useState } from 'react';

import { DataTable } from '@/components/custom/data-table';
import { useDeletePart, useParts } from '@/hooks/use-parts';

import { AddPartDialog } from './_components/add-part-dialog';
import { UpdatePartDialog } from './_components/update-part-dialog';
import { getColumns } from './_lib/columns';

function Parts() {
  const deletePartMutation = useDeletePart();
  const { data } = useParts({ initialData: [] });

  const [rowAction, setRowAction] = useState(null);
  const columns = getColumns({ setRowAction });

  useEffect(() => {
    if (rowAction === null || rowAction.variant != 'delete') return;
    deletePartMutation.mutate(rowAction.row.original.id);
  }, [rowAction]);

  return (
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
  );
}

export default Parts;
