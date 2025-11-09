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
      accessorKey: 'id',
      header: 'Supplier ID',
      meta: {
        label: 'Supplier ID',
      },
    },
    {
      id: 'firstName',
      accessorKey: 'firstName',
      header: 'First Name',
      enableColumnFilter: true,
      meta: {
        label: 'First Name',
        placeholder: 'Search first name...',
        variant: 'text',
      },
    },
    {
      id: 'lastName',
      accessorKey: 'lastName',
      header: 'Last Name',
      enableColumnFilter: true,
      meta: {
        label: 'Last Name',
        placeholder: 'Search last name...',
        variant: 'text',
      },
    },
    {
      accessorKey: 'phone',
      header: 'Phone Number',
      meta: {
        label: 'Phone Number',
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      meta: {
        label: 'Email',
      },
    },
    {
      accessorKey: 'address',
      header: 'Address',
      meta: {
        label: 'Address',
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
