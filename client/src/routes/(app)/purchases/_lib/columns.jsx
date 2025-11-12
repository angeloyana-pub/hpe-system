import { MoreHorizontal } from 'lucide-react';
import { useTransition } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { purchaseStatus } from '@/data/purchase-status';
import { formatCurrency, formatDate } from '@/lib/utils';

export function getColumns({ updatePurchase, setRowAction }) {
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
      header: 'Purchase ID',
      enableColumnFilter: true,
      meta: {
        label: 'Purchase ID',
        placeholder: 'Search id...',
        variant: 'number',
      },
    },
    {
      accessorKey: 'supplier',
      header: 'Supplier',
      cell: ({ getValue }) => {
        const supplier = getValue();
        return <Link to={`/suppliers?id=${supplier.id}`}>{supplier.name}</Link>;
      },
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
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue();
        const statusInfo = purchaseStatus.find((s) => s.value === status);
        return (
          <Badge variant="outline" className="rounded-md">
            {statusInfo?.icon && <statusInfo.icon />}
            {statusInfo?.label}
          </Badge>
        );
      },
      enableColumnFilter: true,
      meta: {
        label: 'Status',
        variant: 'multiSelect',
        options: purchaseStatus,
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
      accessorKey: 'completedAt',
      header: 'Completed At',
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? formatDate(value) : <div className="text-muted-foreground italic">N/A</div>;
      },
      meta: {
        label: 'Completed At',
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isUpdatePending, startUpdateTransition] = useTransition();
        const handleViewPurchaseItems = () => {
          setRowAction({ row, variant: 'viewPurchaseItems' });
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
                  <>
                    <DropdownMenuItem asChild>
                      <Link to={`/purchases/update/${row.original.id}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup
                          value={row.original.status}
                          onValueChange={(val) => {
                            startUpdateTransition(async () => {
                              await updatePurchase.mutateAsync({
                                id: row.original.id,
                                updatedPurchase: { status: val },
                              });
                              toast.success('Status has been updated');
                            });
                          }}
                        >
                          {purchaseStatus.map((status) => (
                            <DropdownMenuRadioItem
                              key={status.value}
                              value={status.value}
                              disabled={isUpdatePending}
                            >
                              {status.label}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
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
