import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { purchaseStatus } from '@/data/purchase-status';
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
      accessorKey: 'supplier.name',
      header: 'Supplier',
      meta: {
        label: 'Supplier',
      },
    },
    {
      accessorKey: 'total',
      header: () => <div className="text-right font-medium">Total</div>,
      cell: ({ getValue }) => (
        <div className="text-right font-medium">{formatCurrency(getValue())}</div>
      ),
      meta: {
        label: 'Total',
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue();
        return (
          <Badge variant="outline">{purchaseStatus.find((s) => s.value === status)?.label}</Badge>
        );
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
      id: 'actions',
      cell: ({ row }) => {
        const handleViewPurchaseItems = () => {
          setRowAction({ row, variant: 'viewPurchaseItems' });
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
                <DropdownMenuItem onClick={handleViewPurchaseItems}>
                  View Purchase Items
                </DropdownMenuItem>
                {row.original.status != 'COMPLETED' && (
                  <DropdownMenuItem asChild>
                    <Link to={`/purchases/update/${row.original.id}`}>Edit</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
