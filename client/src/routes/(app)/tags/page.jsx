import { useEffect, useState } from 'react';

import { DataTable } from '@/components/custom/data-table';
import { useDeleteTag, useTags } from '@/hooks/use-tags';

import { AddTagDialog } from './_components/add-tag-dialog';
import { UpdateTagDialog } from './_components/update-tag-dialog';
import { getColumns } from './_lib/columns';

function Tags() {
  const deleteTagMutation = useDeleteTag();
  const { data } = useTags({ initialData: [] });

  const [rowAction, setRowAction] = useState(null);
  const columns = getColumns({ setRowAction });

  useEffect(() => {
    if (rowAction === null || rowAction.variant != 'delete') return;
    deleteTagMutation.mutate(rowAction.row.original.id);
  }, [rowAction]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex">
        <AddTagDialog />
      </div>
      <DataTable columns={columns} data={data} />
      <UpdateTagDialog
        open={rowAction?.variant === 'update'}
        onOpenChange={() => setRowAction(null)}
        tag={rowAction?.row.original ?? null}
      />
    </div>
  );
}

export default Tags;
