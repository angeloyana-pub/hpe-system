import { ShoppingCart, X } from 'lucide-react';

import { NumberInput } from '@/components/custom/number-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useParts } from '@/hooks/use-parts';
import { formatCurrency } from '@/lib/utils';

import { useCart } from './cart-context';

export function PartsList() {
  const { data: parts } = useParts({ initialData: [] });
  const { addToCart, getCartItem, setQuantity } = useCart();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {parts.map((part) => {
        const cartItem = getCartItem(part.id);

        return (
          <Card key={part.id}>
            <CardHeader>
              <Skeleton className="aspect-square w-full" />
            </CardHeader>
            <CardContent>
              <div className="font-medium">{part.name}</div>
              <div className="text-muted-foreground text-sm">{formatCurrency(part.price)}</div>
            </CardContent>
            <CardFooter>
              {cartItem === null ? (
                <Button
                  variant="outline"
                  disabled={part.stock <= 0}
                  onClick={() => addToCart(part)}
                  className="w-full"
                >
                  {part.stock <= 0 ? (
                    <>
                      <X />
                      Out of Stock
                    </>
                  ) : (
                    <>
                      <ShoppingCart />
                      Add to cart
                    </>
                  )}
                </Button>
              ) : (
                <NumberInput
                  value={cartItem.quantity}
                  onChange={(val) => setQuantity(cartItem.id, val)}
                  min={0}
                  max={part.stock}
                />
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
