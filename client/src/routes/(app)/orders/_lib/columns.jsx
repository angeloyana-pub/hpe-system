import { Badge } from '@/components/ui/badge';
import { paymentMethods } from '@/data/payment-methods';
import { formatCurrency } from '@/lib/utils';

export function getColumns() {
  return [
    {
      accessorKey: 'id',
      header: 'Order ID',
    },
    {
      accessorKey: 'paymentAmount',
      header: 'Payment Amount',
      cell: ({ getValue }) => (
        <div className="text-right font-medium">{formatCurrency(getValue())}</div>
      ),
    },
    {
      accessorKey: 'paymentMethod',
      header: 'Payment Method',
      cell: ({ getValue }) => {
        const paymentMethod = paymentMethods.find((pm) => pm.value === getValue());
        return <Badge variant="outline">{paymentMethod?.label}</Badge>;
      },
    },
  ];
}
