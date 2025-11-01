import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, PhilippinePeso } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { paymentMethods } from '@/data/payment-methods';
import { useAddOrder } from '@/features/orders/mutations';
import { formatCurrency } from '@/lib/utils';

import { paymentSchema } from '../_lib/validators';
import { useCart } from './cart-context';
import { TransactionCompleteDialog } from './transaction-complete-dialog';

export function CheckoutDialog(props) {
  const addOrder = useAddOrder();

  const { cart, total } = useCart();
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const [transactionInfo, setTransactionInfo] = useState(null);

  const form = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: 'cash',
    },
  });
  const paymentAmount = form.watch('paymentAmount');

  const handleSubmit = (data) => {
    if (data.paymentAmount < total) {
      form.setError('paymentAmount', {
        type: 'manual',
        message: 'Insufficient payment amount',
      });
      return;
    }

    startSubmitTransition(async () => {
      await addOrder.mutate({
        ...data,
        orderItems: cart.map((cartItem) => ({
          quantity: cartItem.quantity,
          price: cartItem.part.price,
          part: { id: cartItem.part.id },
        })),
      });
      setTransactionInfo({
        ...data,
        total,
      });
      props.onOpenChange?.(false);
      form.reset();
    });
  };

  return (
    <>
      <Dialog {...props} onOpenChange={!isSubmitPending ? props.onOpenChange : undefined}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="paymentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupAddon>
                          <PhilippinePeso />
                        </InputGroupAddon>
                        <InputGroupInput
                          type="number"
                          inputMode="numeric"
                          placeholder="0.00"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) => {
                            const value = e.target.valueAsNumber;
                            field.onChange(!isNaN(value) ? value : undefined);
                          }}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormDescription>
                      Change:{' '}
                      {formatCurrency(paymentAmount !== undefined ? paymentAmount - total : 0)}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        className="grid grid-cols-2 gap-4 md:grid-cols-3"
                      >
                        {paymentMethods.map((option) => {
                          const Icon = option.icon;
                          return (
                            <FormItem key={option.label}>
                              <FormLabel className="has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:text-primary flex flex-col gap-2 rounded-md border p-4 first:col-span-2 md:first:col-span-1">
                                <FormControl>
                                  <RadioGroupItem value={option.value} className="sr-only" />
                                </FormControl>
                                <Icon />
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isSubmitPending}>
                  {isSubmitPending && <Loader className="animate-spin" />}
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <TransactionCompleteDialog
        transactionInfo={transactionInfo}
        open={!!transactionInfo}
        onOpenChange={() => setTransactionInfo(null)}
      />
    </>
  );
}
