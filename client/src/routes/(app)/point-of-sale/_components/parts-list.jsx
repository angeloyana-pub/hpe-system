import { ChevronLeft, ChevronRight, Grid2x2Plus, ShoppingCart, X } from 'lucide-react';
import { parseAsArrayOf, parseAsInteger, useQueryState } from 'nuqs';

import { NumberInput } from '@/components/custom/number-input';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
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
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useParts } from '@/features/parts/queries';
import { useAllTags } from '@/features/tags/queries';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { formatCurrency } from '@/lib/utils';

import { useCart } from './cart-context';

export function PartsList() {
  const { addToCart, getCartItem, setQuantity } = useCart();

  const [name, setName] = useQueryState('name');
  const [tagIds, setTagIds] = useQueryState(
    'tagIds',
    parseAsArrayOf(parseAsInteger).withDefault([])
  );
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage, setPerPage] = useQueryState('perPage', parseAsInteger.withDefault(10));

  const { data = { parts: [], pageCount: 0 } } = useParts();
  const { parts, pageCount } = data;
  const { data: tags = [] } = useAllTags();

  const handleSearch = useDebouncedCallback((e) => {
    setName(e.target.value);
    setPage(1);
  }, 300);

  const handleAddAll = () => {
    parts.forEach((part) => addToCart(part));
  };

  const handlePreviousPage = () => {
    setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="@container flex-1 flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 items-center">
        <Input
          defaultValue={name ?? ''}
          onChange={handleSearch}
          placeholder="Search names..."
          className="h-8 w-40 lg:w-56"
        />
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
            <MultiSelectGroup>
              {tags.map((tag) => (
                <MultiSelectItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="add all to cart"
                size="sm"
                onClick={handleAddAll}
                className="mr-auto"
              >
                <Grid2x2Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add all to cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ButtonGroup>
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
        </ButtonGroup>
      </div>
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
          {parts.map((part) => {
            const cartItem = getCartItem(part.id);

            return (
              <Card key={part.id}>
                <CardHeader>
                  <Skeleton className="aspect-square w-full" />
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="font-medium">{part.name}</div>
                  <div className="text-muted-foreground text-sm">{formatCurrency(part.price)}</div>
                </CardContent>
                <CardFooter>
                  {cartItem === null ? (
                    <Button
                      variant="outline"
                      disabled={part.stock <= 0}
                      onClick={() => addToCart(part)}
                      className="w-full"
                    >
                      {part.stock <= 0 ? (
                        <>
                          <X />
                          Out of Stock
                        </>
                      ) : (
                        <>
                          <ShoppingCart />
                          Add to cart
                        </>
                      )}
                    </Button>
                  ) : (
                    <NumberInput
                      value={cartItem.quantity}
                      onChange={(val) => setQuantity(cartItem.id, val)}
                      min={0}
                      max={part.stock}
                    />
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
      <div className="text-right text-muted-foreground">
        Page {page} of {pageCount}
      </div>
    </div>
  );
}
