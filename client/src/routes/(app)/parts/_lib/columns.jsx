import { MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/utils';

export function getColumns({ setRowAction, tags }) {
  return [
    {
      accessorKey: 'id',
      header: 'Part ID',
      meta: {
        label: 'Part ID',
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
      accessorKey: 'size',
      header: 'Size',
      meta: {
        label: 'Size',
      },
    },
    {
      accessorKey: 'stock',
      header: () => <div className="text-right font-medium">Stock</div>,
      cell: ({ getValue }) => <div className="text-right font-medium">{getValue()}</div>,
      meta: {
        label: 'Stock',
      },
    },
    {
      accessorKey: 'lowStockThreshold',
      header: () => <div className="text-right font-medium">Low Stock Threshold</div>,
      cell: ({ getValue }) => <div className="text-right font-medium">{getValue()}</div>,
      meta: {
        label: 'Low Stock Threshold',
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
      id: 'tagIds',
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ getValue }) => {
        const tags = getValue();
        if (tags.length <= 0) {
          return <div className="text-muted-foreground italic">N/A</div>;
        }

        return (
          <div className="flex gap-2">
            {tags.map((tag) => (
              <Badge key={tag.id} variant="outline">
                {tag.name}
              </Badge>
            ))}
          </div>
        );
      },
      enableColumnFilter: true,
      meta: {
        label: 'Tags',
        variant: 'multiSelect',
        options: tags.map((tag) => ({ label: tag.name, value: tag.id })),
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
