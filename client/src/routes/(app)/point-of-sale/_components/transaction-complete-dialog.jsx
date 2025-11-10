import { CircleCheck } from 'lucide-react';
import { Link } from 'react-router';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { orderStatus } from '@/data/order-status';
import { paymentMethods } from '@/data/payment-methods';
import { formatCurrency } from '@/lib/utils';

import { useCart } from './cart-context';

export function TransactionCompleteDialog({ transactionInfo, ...props }) {
  const {
    id,
    paymentAmount = 0,
    paymentMethod,
    total = 0,
    status,
    customer,
  } = transactionInfo ?? {};
  const { clearCart } = useCart();

  const handleClose = () => {
    clearCart();
    props.onOpenChange?.(false);
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <CircleCheck className="mx-auto size-10 text-green-500 md:mx-0" />
          <DialogTitle>Transaction Complete</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Customer</div>
            <div className="font-medium">
              {customer?.firstName} {customer?.lastName}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Payment</div>
            <div className="font-medium">{formatCurrency(paymentAmount)}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Change</div>
            <div className="font-medium">{formatCurrency(paymentAmount - total)}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Payment Method</div>
            <div className="font-medium">
              {(paymentMethod !== undefined
                ? paymentMethods.find((option) => option.value === paymentMethod)?.label
                : undefined) ?? 'N/A'}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Status</div>
            <div className="font-medium">{orderStatus.find((s) => s.value === status)?.label}</div>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Total</div>
            <div className="font-medium">{formatCurrency(total)}</div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Link to={`/orders?id=${id}`} className={buttonVariants({ variant: 'outline' })}>
            View Order
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
