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
import { useDeletePurchase } from '@/features/purchases/mutations';

export function DeletePurchaseDialog({ purchase, ...props }) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const deletePurchase = useDeletePurchase();

  const handleDelete = () => {
    startDeleteTransition(async () => {
      if (!purchase) return;
      await deletePurchase.mutateAsync(purchase.id);
      props.onOpenChange?.(false);
    });
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete purchase</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete purchase with ID{' '}
            <span className="font-medium">“{purchase?.id}”</span>? This action cannot be undone.
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
