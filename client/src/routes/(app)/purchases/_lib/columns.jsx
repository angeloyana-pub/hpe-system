import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency, formatDate } from '@/lib/utils';

export function getColumns({ setRowAction }) {
  return [
    {
      accessorKey: 'id',
      header: 'Purchase ID',
      meta: {
        label: 'Purchase ID',
      },
    },
    {
      accessorKey: 'part.name',
      header: 'Part',
      meta: {
        label: 'Part',
      },
    },
    {
      accessorKey: 'quantity',
      header: () => <div className="text-right font-medium">Quantity</div>,
      cell: ({ getValue }) => <div className="text-right font-medium">{getValue()}</div>,
      meta: {
        label: 'Quantity',
      },
    },
    {
      accessorKey: 'price',
      header: () => <div className="text-right font-medium">Price</div>,
      cell: ({ getValue }) => (
        <div className="text-right font-medium">{formatCurrency(getValue())}</div>
      ),
      meta: {
        label: 'Price',
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ getValue }) => formatDate(getValue()),
      meta: {
        label: 'Created At',
      },
    },
    {
      accessorKey: 'supplier.name',
      header: 'Supplier',
      meta: {
        label: 'Supplier',
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
