import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function getColumns({ setRowAction }) {
  return [
    {
      id: 'id',
      accessorKey: 'id',
      header: 'Tag ID',
      enableColumnFilter: true,
      meta: {
        label: 'Tag ID',
        placeholder: 'Search id...',
        variant: 'number',
      },
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
      enableColumnFilter: true,
      meta: {
        label: 'Name',
        placeholder: 'Search names...',
        variant: 'text',
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const handleEdit = () => {
          setRowAction({ row, variant: 'update' });
        };

        const handleDelete = () => {
          setRowAction({ row, variant: 'delete' });
        };

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="data-[state=open]:bg-accent">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
