import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, PhilippinePeso, Plus, X } from 'lucide-react';
import { useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { PartPickerDialog } from '@/components/custom/part-picker-dialog';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { purchaseStatus } from '@/data/purchase-status';
import { useAllSuppliers } from '@/features/suppliers/queries';

import { addPurchaseSchema, updatePurchaseSchema } from '../_lib/validators';

export function PurchaseForm({ variant, defaultValues, onSubmit }) {
  const { data: suppliers = [] } = useAllSuppliers();
  const [isSubmitPending, startSubmitTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(variant === 'add' ? addPurchaseSchema : updatePurchaseSchema),
    defaultValues: defaultValues ?? {
      status: 'PROCESSING',
      purchaseItems: [],
    },
  });
  const purchaseItemsField = useFieldArray({
    name: 'purchaseItems',
    control: form.control,
  });

  const handleAddPurchaseItem = (part) => {
    const items = form.getValues('purchaseItems');
    const index = items.findIndex((item) => item.part.id === part.id);
    if (index >= 0) {
      form.setValue(`purchaseItems.${index}.quantity`, items[index].quantity + 1);
    } else {
      purchaseItemsField.append({
        quantity: 1,
        price: part.price,
        part,
      });
    }
  };

  const handleAddPurchaseItems = (parts) => {
    const items = form.getValues('purchaseItems');
    const itemPartIds = new Set(items.map((item) => item.part.id));
    const filteredItems = parts
      .filter((part) => !itemPartIds.has(part.id))
      .map((part) => ({ quantity: 1, price: part.price, part }));
    purchaseItemsField.append(filteredItems);
  };

  const handleSubmit = (data) => {
    startSubmitTransition(async () => {
      await onSubmit(form, data);
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <Form {...form}>
        <FormField
          name="supplier"
          control={form.control}
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
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={String(supplier.id)}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select value={field.value ?? ''} onValueChange={(val) => field.onChange(val)}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {purchaseStatus.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="purchaseItems"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Items</FormLabel>
              <div className="grid gap-2">
                {purchaseItemsField.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-muted border rounded-md p-4 space-y-4 shadow-xs"
                  >
                    <div className="flex justify-between">
                      <div className="">
                        <div className="">{field.part.name}</div>
                        <div className="text-muted-foreground text-sm">{field.part.size}</div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => purchaseItemsField.remove(index)}
                        className="size-5"
                      >
                        <X />
                      </Button>
                    </div>
                    <div className="flex gap-4 [&>[data-slot=form-item]]:w-full">
                      <FormField
                        name={`purchaseItems.${index}.quantity`}
                        control={form.control}
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
                          </FormItem>
                        )}
                      />
                      <FormField
                        name={`purchaseItems.${index}.price`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                              <InputGroupAddon>
                                <PhilippinePeso />
                              </InputGroupAddon>
                              <FormControl>
                                <InputGroupInput
                                  type="number"
                                  inputMode="decimal"
                                  placeholder="0.00"
                                  {...field}
                                  value={String(field.value ?? '')}
                                  onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    field.onChange(!isNaN(value) ? value : undefined);
                                  }}
                                />
                              </FormControl>
                            </InputGroup>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <PartPickerDialog onPick={handleAddPurchaseItem} onPickMany={handleAddPurchaseItems}>
                <FormControl>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-dashed">
                      <Plus />
                      Add Items
                    </Button>
                  </DialogTrigger>
                </FormControl>
              </PartPickerDialog>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Button type="submit" disabled={isSubmitPending || !form.formState.isDirty}>
        {isSubmitPending ? <Loader className="animate-spin" /> : <Plus />}
        {variant === 'add' ? 'Add' : 'Update'} Purchase
      </Button>
    </form>
  );
}
