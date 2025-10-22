import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/utils';

export function getColumns({ setRowAction }) {
  return [
    {
      accessorKey: 'id',
      header: 'Purchase ID',
    },
    {
      accessorKey: 'part.name',
      header: 'Part',
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ getValue }) => <div className="text-right font-medium">{getValue()}</div>,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ getValue }) => (
        <div className="text-right font-medium">{formatCurrency(getValue())}</div>
      ),
    },
    {
      accessorKey: 'supplier.name',
      header: 'Supplier',
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
