import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, PhilippinePeso, Plus } from 'lucide-react';
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
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/ui/multi-select';
import { useAddPart } from '@/features/parts/mutations';
import { useAllTags } from '@/features/tags/queries';

import { addPartSchema } from '../_lib/validators';

export function AddPartDialog() {
  const { data: tags = [] } = useAllTags();
  const addPart = useAddPart();

  const [open, setOpen] = useState(false);
  const [isCreatePending, startCreateTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(addPartSchema),
    defaultValues: {
      tags: [],
    },
  });

  const handleSubmit = (data) => {
    startCreateTransition(async () => {
      await addPart.mutateAsync({
        ...data,
        tags: data.tags.map((tagId) => {
          const tag = tags.find((t) => tagId === t.id);
          return { id: tag.id };
        }),
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
          Add Part
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Part Information</DialogTitle>
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
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input placeholder="Size" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Stock"
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
              name="lowStockThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Low Stock Threshold</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Threshold"
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <MultiSelect
                    values={field.value}
                    onValuesChange={(val) => {
                      field.onChange(val ?? []);
                    }}
                  >
                    <FormControl>
                      <MultiSelectTrigger className="w-full">
                        <MultiSelectValue placeholder="Select tags..." />
                      </MultiSelectTrigger>
                    </FormControl>
                    <MultiSelectContent>
                      <MultiSelectGroup>
                        {tags.map((tag) => (
                          <MultiSelectItem key={tag.id} value={tag.id}>
                            {tag.name}
                          </MultiSelectItem>
                        ))}
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isCreatePending}>
                {isCreatePending && <Loader aria-hidden="true" className="animate-spin" />}
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
