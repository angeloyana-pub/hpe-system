import { Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FormControl } from '@/components/ui/form';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAllParts } from '@/features/parts/queries';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { formatCurrency } from '@/lib/utils';

export function PartPickerDialog({ onPick }) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { data: parts = [] } = useAllParts();
  const filteredParts = useMemo(
    () => parts.filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase())),
    [parts, searchValue]
  );

  const handleSearch = useDebouncedCallback((e) => {
    setSearchValue(e.target.value);
  }, 300);

  return (
    <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
      <FormControl>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-dashed">
            <Plus />
            Add Item
          </Button>
        </DialogTrigger>
      </FormControl>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Parts</DialogTitle>
        </DialogHeader>
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search parts..."
            defaultValue={searchValue ?? ''}
            onChange={handleSearch}
          />
        </InputGroup>
        <ScrollArea className="max-h-[400px]">
          {filteredParts.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => {
                    onPick?.(part);
                    setOpen(false);
                  }}
                  className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md text-left p-4"
                >
                  <div className="">{part.name}</div>
                  <div className="text-muted-foreground text-sm">Size: {part.size}</div>
                  <div className="text-muted-foreground text-sm">
                    Price: {formatCurrency(part.price)}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-4 text-center">No result.</div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
