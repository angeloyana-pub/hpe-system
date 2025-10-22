import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, Plus } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAddSupplier } from '@/hooks/use-suppliers';

import { addSupplierSchema } from '../_lib/validators';

export function AddSupplierDialog() {
  const addSupplierMutation = useAddSupplier();

  const [open, setOpen] = useState(false);
  const [isCreatePending, startCreateTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(addSupplierSchema),
  });

  const handleSubmit = (data) => {
    startCreateTransition(async () => {
      await addSupplierMutation.mutateAsync(data);
      form.reset();
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Add Supplier
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supplier Information</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isCreatePending}>
                {isCreatePending && <Loader aria-hidden="true" className="animate-spin" />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
