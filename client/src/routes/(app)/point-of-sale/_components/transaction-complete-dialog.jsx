import { CircleCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { paymentMethods } from '@/data/payment-methods';
import { formatCurrency } from '@/lib/utils';

import { useCart } from './cart-context';

export function TransactionCompleteDialog({ transactionInfo, ...props }) {
  const { paymentAmount = 0, paymentMethod, total = 0 } = transactionInfo || {};
  const { setCart, clearCart } = useCart();

  const handleClose = () => {
    props.onOpenChange?.(false);
    // Re-calculate part stock for each cart item.
    setCart((prev) =>
      prev
        .map((cartItem) => {
          const part = {
            ...cartItem.part,
            stock: cartItem.part.stock - cartItem.quantity,
          };
          if (part.stock <= 0) return null;
          return {
            ...cartItem,
            part,
            quantity: Math.min(cartItem.quantity, part.stock),
          };
        })
        .filter((cartItem) => cartItem !== null)
    );
  };

  const handleClearOrder = () => {
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
          <Button variant="outline" onClick={handleClearOrder}>
            Clear Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
