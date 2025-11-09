import axios from 'axios';
import { Loader } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteCustomer } from '@/features/customers/mutations';

export function DeleteCustomerDialog({ customer, ...props }) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const deleteCustomer = useDeleteCustomer();

  const handleDelete = () => {
    startDeleteTransition(async () => {
      if (!customer) return;

      try {
        await deleteCustomer.mutateAsync(customer.id);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 409) {
          toast.error('This record can’t be deleted because it’s linked to other records.');
        } else {
          throw err;
        }
      } finally {
        props.onOpenChange?.(false);
      }
    });
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete customer</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{' '}
            <span className="font-medium">
              “{customer?.firstName} {customer?.lastName}”
            </span>
            ? This action cannot be undone.
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
