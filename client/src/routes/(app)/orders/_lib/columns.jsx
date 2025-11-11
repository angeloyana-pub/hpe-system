import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { orderStatus } from '@/data/order-status';
import { paymentMethods } from '@/data/payment-methods';
import { formatCurrency, formatDate } from '@/lib/utils';

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
      header: 'Order ID',
      enableColumnFilter: true,
      meta: {
        label: 'Order ID',
        placeholder: 'Search id...',
        variant: 'number',
      },
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ getValue }) => {
        const { id, firstName, lastName } = getValue();
        return (
          <Link to={`/customers?id=${id}`}>
            {firstName} {lastName}
          </Link>
        );
      },
      meta: {
        label: 'Customer',
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
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue();
        return (
          <Badge variant="outline">{orderStatus.find((s) => s.value === status)?.label}</Badge>
        );
      },
      enableColumnFilter: true,
      meta: {
        label: 'Status',
        variant: 'multiSelect',
        options: orderStatus,
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
                {row.original.status != 'COMPLETED' && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to={`/orders/update/${row.original.id}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setRowAction({ row, variant: 'delete' })}>
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
