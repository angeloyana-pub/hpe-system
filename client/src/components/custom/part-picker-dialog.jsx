import { ChevronLeft, ChevronRight, Grid2x2Plus, Search } from 'lucide-react';
import { parseAsArrayOf, parseAsInteger, useQueryState } from 'nuqs';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/ui/multi-select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useParts } from '@/features/parts/queries';
import { useAllTags } from '@/features/tags/queries';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { formatCurrency } from '@/lib/utils';

export function PartPickerDialog({ children, onPick, onPickMany }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useQueryState('partName');
  const [tagIds, setTagIds] = useQueryState(
    'partTagIds',
    parseAsArrayOf(parseAsInteger).withDefault([])
  );
  const [page, setPage] = useQueryState('partPage', parseAsInteger.withDefault(1));
  const [perPage, setPerPage] = useQueryState('partPerPage', parseAsInteger.withDefault(10));

  const { data = { parts: [], pageCount: 0 } } = useParts({
    queryKeys: {
      name: 'partName',
      tagIds: 'partTagIds',
      page: 'partPage',
      perPage: 'partPerPage',
    },
  });
  const { parts, pageCount } = data;
  const { data: tags = [] } = useAllTags();

  const handleSearch = useDebouncedCallback((e) => {
    setName(e.target.value);
    setPage(1);
  }, 300);

  const handlePickAll = () => {
    onPickMany?.(parts);
    setOpen(false);
  };

  const handlePreviousPage = () => {
    setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
      {children}
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
            defaultValue={name ?? ''}
            onChange={handleSearch}
          />
        </InputGroup>
        <div className="flex flex-wrap gap-4">
          <MultiSelect
            values={tagIds}
            onValuesChange={(val) => {
              setTagIds(val ?? []);
              setPage(1);
            }}
          >
            <MultiSelectTrigger className="min-h-8 h-8">
              <MultiSelectValue placeholder="Tags" />
            </MultiSelectTrigger>
            <MultiSelectContent>
              {tags.map((tag) => (
                <MultiSelectItem key={tag.id} value={String(tag.id)}>
                  {tag.name}
                </MultiSelectItem>
              ))}
            </MultiSelectContent>
          </MultiSelect>
          <Button size="sm" onClick={handlePickAll}>
            <Grid2x2Plus />
          </Button>
        </div>
        <ScrollArea className="max-h-[400px]">
          {parts.length ? (
            <div className="grid gap-4 ">
              {parts.map((part) => (
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
        <div className="flex gap-4 items-center">
          <ButtonGroup>
            <ButtonGroup>
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={handlePreviousPage}>
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= pageCount}
                onClick={handleNextPage}
              >
                <ChevronRight />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Select
                value={String(perPage)}
                onValueChange={(val) => {
                  setPerPage(Number(val));
                  setPage(1);
                }}
              >
                <SelectTrigger className="!h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </ButtonGroup>
          </ButtonGroup>
          <div className="ml-auto text-muted-foreground text-sm">
            Page {page} of {pageCount}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
