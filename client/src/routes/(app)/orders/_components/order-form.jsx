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
import { orderStatus } from '@/data/order-status';
import { paymentMethods } from '@/data/payment-methods';
import { useAllCustomers } from '@/features/customers/queries';
import { formatCurrency } from '@/lib/utils';

import { addOrderSchema, updateOrderSchema } from '../_lib/validators';
import { PartPickerDialog } from './part-picker-dialog';

export function OrderForm({ variant, defaultValues, onSubmit }) {
  const { data: customers = [] } = useAllCustomers();
  const [isSubmitPending, startSubmitTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(variant === 'add' ? addOrderSchema : updateOrderSchema),
    defaultValues: defaultValues ?? {
      status: 'PROCESSING',
      orderItems: [],
    },
  });
  const orderItemsField = useFieldArray({
    name: 'orderItems',
    control: form.control,
  });

  const handleAddOrderItem = (part) => {
    const items = form.getValues('orderItems');
    const index = items.findIndex((item) => item.part.id === part.id);
    if (index >= 0) {
      form.setValue(`orderItems.${index}.quantity`, items[index].quantity + 1);
    } else {
      orderItemsField.append({
        quantity: 1,
        price: part.price,
        part,
      });
    }
  };

  const handleSubmit = (data) => {
    const total = data.orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    if (data.paymentAmount < total) {
      form.setError('paymentAmount', {
        type: 'manual',
        message: `Insufficient payment amount. Must be greater than or equal to ${formatCurrency(total)}`,
      });
      return;
    }

    startSubmitTransition(async () => {
      await onSubmit(data);
      form.reset();
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <Form {...form}>
        <FormField
          name="customer"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer</FormLabel>
              <Select
                value={String(field.value ?? '')}
                onValueChange={(val) => field.onChange(parseInt(val))}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={String(customer.id)}>
                      {customer.firstName} {customer.lastName}
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
                  {orderStatus.map((status) => (
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
          name="paymentAmount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment</FormLabel>
              <InputGroup>
                <InputGroupAddon>
                  <PhilippinePeso />
                </InputGroupAddon>
                <FormControl>
                  <InputGroupInput
                    type="number"
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="paymentMethod"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select value={field.value ?? ''} onValueChange={(val) => field.onChange(val)}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="orderItems"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Items</FormLabel>
              <div className="grid gap-2">
                {orderItemsField.fields.map((field, index) => (
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
                        onClick={() => orderItemsField.remove(index)}
                        className="size-5"
                      >
                        <X />
                      </Button>
                    </div>
                    <div className="flex gap-4 [&>[data-slot=form-item]]:w-full">
                      <FormField
                        name={`orderItems.${index}.quantity`}
                        control={form.control}
                        render={({ field: qtyField }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Quantity"
                                {...qtyField}
                                value={String(qtyField.value ?? '')}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  qtyField.onChange(!isNaN(value) ? value : undefined);
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        name={`orderItems.${index}.price`}
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
              <PartPickerDialog onPick={handleAddOrderItem} />
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Button type="submit" disabled={isSubmitPending}>
        {isSubmitPending ? <Loader className="animate-spin" /> : <Plus />}
        {variant === 'add' ? 'Add' : 'Update'} Order
      </Button>
    </form>
  );
}
