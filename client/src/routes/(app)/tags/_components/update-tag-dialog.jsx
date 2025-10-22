import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useEffect, useTransition } from 'react';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdateTag } from '@/hooks/use-tags';

import { updateTagSchema } from '../_lib/validators';

export function UpdateTagDialog({ tag, ...props }) {
  const updateTagMutation = useUpdateTag();

  const [isUpdatePending, startUpdateTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(updateTagSchema),
  });

  useEffect(() => {
    if (props.open && tag) {
      form.reset(tag);
    }
  }, [props.open]);

  const handleSubmit = (data) => {
    startUpdateTransition(async () => {
      if (!tag) return;
      await updateTagMutation.mutateAsync({
        id: tag.id,
        updatedTag: data,
      });
      props.onOpenChange?.(false);
    });
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tag Information</DialogTitle>
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
              <Button type="submit" disabled={isUpdatePending}>
                {isUpdatePending && <Loader aria-hidden="true" className="animate-spin" />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
