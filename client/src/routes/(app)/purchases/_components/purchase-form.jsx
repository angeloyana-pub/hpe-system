import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, PhilippinePeso, Plus, X } from 'lucide-react';
import { useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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
import { useAllSuppliers } from '@/features/suppliers/queries';

import { addPurchaseSchema, updatePurchaseSchema } from '../_lib/validators';
import { PartPickerDialog } from './part-picker-dialog';

export function PurchaseForm({ variant, defaultValues, onSubmit }) {
  const { data: suppliers = [] } = useAllSuppliers();
  const [isSubmitPending, startSubmitTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(variant === 'add' ? addPurchaseSchema : updatePurchaseSchema),
    defaultValues: defaultValues ?? {
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

  const handleSubmit = (data) => {
    startSubmitTransition(async () => {
      await onSubmit(data);
      form.reset();
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
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
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
              <PartPickerDialog onPick={handleAddPurchaseItem} />
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Button type="submit" disabled={isSubmitPending}>
        {isSubmitPending ? <Loader className="animate-spin" /> : <Plus />}
        {variant === 'add' ? 'Add' : 'Update'} Purchase
      </Button>
    </form>
  );
}
