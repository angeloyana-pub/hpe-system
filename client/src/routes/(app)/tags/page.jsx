import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useDeleteTag } from '@/features/tags/mutations';
import { useTags } from '@/features/tags/queries';

import { TagsTable } from './_components/tags-table';
import { UpdateTagDialog } from './_components/update-tag-dialog';
import { getColumns } from './_lib/columns';

function Tags() {
  const deleteTag = useDeleteTag({
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        toast.error('This record can’t be deleted because it’s linked to other records.');
      }
    },
  });
  const { data = { tags: [], pageCount: 0 } } = useTags();

  const [rowAction, setRowAction] = useState(null);
  const columns = useMemo(() => getColumns({ setRowAction }), []);

  useEffect(() => {
    if (rowAction === null || rowAction.variant != 'delete') return;
    deleteTag.mutate(rowAction.row.original.id);
  }, [rowAction]);

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b">
        <SidebarTrigger />
        <Separator orientation="vertical" className="ml-2 mr-4" />
        Tags
      </header>
      <div className="p-4 space-y-4">
        <TagsTable data={data} columns={columns} />
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
