import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, Plus } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useParts } from '@/hooks/use-parts';
import { useAddPurchase } from '@/hooks/use-purchases';
import { useSuppliers } from '@/hooks/use-suppliers';

import { addPurchaseSchema } from '../_lib/validators';

export function AddPurchaseDialog() {
  const { data: partsData } = useParts({ initialData: [] });
  const { data: suppliersData } = useSuppliers({ initialData: [] });
  const addPurchaseMutation = useAddPurchase();

  const [open, setOpen] = useState(false);
  const [isCreatePending, startCreateTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(addPurchaseSchema),
  });
  const selectedPartId = form.watch('part');

  useEffect(() => {
    const part = partsData.find((p) => p.id === selectedPartId);
    if (part) {
      form.setValue('price', part.price);
    }
  }, [selectedPartId]);

  const handleSubmit = (data) => {
    startCreateTransition(async () => {
      await addPurchaseMutation.mutateAsync({
        ...data,
        part: { id: data.part },
        supplier: { id: data.supplier },
      });
      form.reset();
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Add Purchase
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase Information</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="part"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Part</FormLabel>
                  <Select
                    value={String(field.value ?? '')}
                    onValueChange={(val) => field.onChange(parseInt(val))}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select part" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {partsData.map((part) => (
                        <SelectItem key={part.name} value={String(part.id)}>
                          {part.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Quantity"
                      {...field}
                      value={String(field.value ?? '')}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        field.onChange(!isNaN(value) ? value : undefined);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      placeholder="Price"
                      {...field}
                      value={String(field.value ?? '')}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        field.onChange(!isNaN(value) ? value : undefined);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <Select
                    value={String(field.value ?? '')}
                    onValueChange={(val) => field.onChange(parseInt(val))}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {suppliersData.map((supplier) => (
                        <SelectItem key={supplier.name} value={String(supplier.id)}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
