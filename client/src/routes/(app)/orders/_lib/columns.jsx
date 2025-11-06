import { MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { paymentMethods } from '@/data/payment-methods';
import { formatCurrency, formatDate } from '@/lib/utils';

export function getColumns({ setRowAction }) {
  return [
    {
      accessorKey: 'id',
      header: 'Order ID',
      meta: {
        label: 'Order ID',
      },
    },
    {
      accessorKey: 'paymentAmount',
      header: () => <div className="text-right font-medium">Payment Amount</div>,
      cell: ({ getValue }) => (
        <div className="text-right font-medium">{formatCurrency(getValue())}</div>
      ),
      meta: {
        label: 'Payment Amount',
      },
    },
    {
      accessorKey: 'paymentMethod',
      header: 'Payment Method',
      cell: ({ getValue }) => {
        const paymentMethod = paymentMethods.find((pm) => pm.value === getValue());
        return <Badge variant="outline">{paymentMethod?.label}</Badge>;
      },
      meta: {
        label: 'Payment Method',
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
        const handleViewOrderItems = () => {
          setRowAction({ row, variant: 'viewOrderItems' });
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
                <DropdownMenuItem onClick={handleViewOrderItems}>View Order Items</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
