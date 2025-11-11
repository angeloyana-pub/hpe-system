import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function getColumns({ setRowAction }) {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      id: 'id',
      accessorKey: 'id',
      header: 'Customer ID',
      enableColumnFilter: true,
      meta: {
        label: 'Customer ID',
        placeholder: 'Search id...',
        variant: 'number',
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
