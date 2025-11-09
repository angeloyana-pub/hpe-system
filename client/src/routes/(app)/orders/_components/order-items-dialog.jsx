import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency } from '@/lib/utils';

export function OrderItemsDialog({ order, ...props }) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Items</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px]">
          <div className="grid gap-4">
            {order?.orderItems.map((item) => (
              <div key={item.id} className="p-4 rounded-md border bg-card text-card-foreground">
                <div className="font-medium">{item.part.name}</div>
                <div className="text-muted-foreground">Price: {formatCurrency(item.price)}</div>
                <div className="text-muted-foreground">Quantity: {item.quantity}</div>
                <div className="text-muted-foreground">
                  Total: {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => props?.onOpenChange()}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
