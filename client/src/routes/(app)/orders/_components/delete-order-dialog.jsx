import { Loader } from 'lucide-react';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteOrder } from '@/features/orders/mutations';

export function DeleteOrderDialog({ order, ...props }) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const deleteOrder = useDeleteOrder();

  const handleDelete = () => {
    startDeleteTransition(async () => {
      if (!order) return;
      await deleteOrder.mutateAsync(order.id);
      props.onOpenChange?.(false);
    });
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete order</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete order with ID{' '}
            <span className="font-medium">“{order?.id}”</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => props.onOpenChange?.(false)}>
            Cancel
          </Button>
          <Button variant="destructive" disabled={isDeletePending} onClick={handleDelete}>
            {isDeletePending && <Loader aria-hidden="true" className="animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
