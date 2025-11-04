import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useDeletePart } from '@/features/parts/mutations';
import { useParts } from '@/features/parts/queries';
import { useAllTags } from '@/features/tags/queries';

import { PartsTable } from './_components/parts-table';
import { UpdatePartDialog } from './_components/update-part-dialog';
import { getColumns } from './_lib/columns';

function Parts() {
  const deletePart = useDeletePart({
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        toast.error('This record can’t be deleted because it’s linked to other records.');
      }
    },
  });
  const {
    data = {
      parts: [],
      pageCount: 0,
    },
  } = useParts();
  const { data: tags = [], isInitialLoading: isTagsInitialLoading } = useAllTags();

  const [rowAction, setRowAction] = useState(null);
  const columns = useMemo(() => getColumns({ setRowAction, tags: tags ?? [] }), [tags]);

  useEffect(() => {
    if (rowAction === null || rowAction.variant != 'delete') return;
    deletePart.mutate(rowAction.row.original.id);
  }, [rowAction]);

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b">
        <SidebarTrigger />
        <Separator orientation="vertical" className="ml-2 mr-4" />
        Parts
      </header>
      <div className="p-4 space-y-4">
        {isTagsInitialLoading ? (
          <DataTableSkeleton
            columnCount={7}
            filterCount={2}
            cellWidths={['2rem', '10rem', '5rem', '5rem', '2rem']}
            shrinkZero
          />
        ) : (
          <PartsTable columns={columns} data={data} />
        )}
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
