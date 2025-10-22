import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { NumberInput } from '@/components/custom/number-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';

import { useCart } from './cart-context';
import { CheckoutDialog } from './checkout-dialog';

export function OrderSummary() {
  const { cart, total, setQuantity } = useCart();
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState();

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {cart.map(({ id, part, quantity }) => (
          <div key={id} className="flex items-center gap-4">
            <Skeleton className="size-10 shrink-0 rounded-md" />
            <div>
              <div className="line-clamp-1 text-sm">{part.name}</div>
              <div className="font-medium">{formatCurrency(part.price)}</div>
            </div>
            <NumberInput
              value={quantity}
              onChange={(val) => setQuantity(id, val)}
              min={0}
              max={part.stock}
              size="sm"
              className="ml-auto w-[100px] min-w-[100px]"
            />
          </div>
        ))}
      </CardContent>
      <CardFooter className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Total</div>
          <div className="font-medium">{formatCurrency(total)}</div>
        </div>
        <Button disabled={cart.length === 0} onClick={() => setCheckoutDialogOpen(true)}>
          <ShoppingCart />
          Checkout
        </Button>
        <CheckoutDialog
          open={checkoutDialogOpen}
          onOpenChange={(val) => setCheckoutDialogOpen(val)}
        />
      </CardFooter>
    </Card>
  );
}
