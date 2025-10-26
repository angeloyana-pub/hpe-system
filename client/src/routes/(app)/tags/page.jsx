import { useEffect, useState } from 'react';

import { DataTable } from '@/components/custom/data-table';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useDeleteTag } from '@/features/tags/mutations';
import { useTags } from '@/features/tags/queries';

import { AddTagDialog } from './_components/add-tag-dialog';
import { UpdateTagDialog } from './_components/update-tag-dialog';
import { getColumns } from './_lib/columns';

function Tags() {
  const deleteTag = useDeleteTag();
  const { data } = useTags();

  const [rowAction, setRowAction] = useState(null);
  const columns = getColumns({ setRowAction });

  useEffect(() => {
    if (rowAction === null || rowAction.variant != 'delete') return;
    deleteTag.mutate(rowAction.row.original.id);
  }, [rowAction]);

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b gap-2">
        <SidebarTrigger />
        Tags
      </header>
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
    </SidebarInset>
  );
}

export default Tags;
