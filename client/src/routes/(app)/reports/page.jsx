import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { parseAsIsoDateTime, useQueryState } from 'nuqs';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import { SalesChart } from './_components/sales-chart';

function Reports() {
  const [from, setFrom] = useQueryState('from', parseAsIsoDateTime);
  const [to, setTo] = useQueryState('to', parseAsIsoDateTime);
  const dateRange = useMemo(() => (from !== null && to !== null ? { from, to } : null), [from, to]);

  const handleClearDateRange = () => {
    setFrom(null);
    setTo(null);
  };

  const handleSelectDateRange = (val) => {
    setFrom(val !== null ? val.from : null);
    setTo(val !== null ? val.to : null);
  };

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b">
        <SidebarTrigger />
        <Separator orientation="vertical" className="ml-2 mr-4" />
        Reports
      </header>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-end">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'justify-start text-left font-normal',
                  !dateRange && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(dateRange.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto space-y-4" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                captionLayout="dropdown"
                selected={dateRange}
                onSelect={handleSelectDateRange}
                className="p-0"
              />
              {dateRange !== null && (
                <Button variant="outline" onClick={handleClearDateRange} className="w-full">
                  <X />
                  Clear
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <SalesChart />
      </div>
    </SidebarInset>
  );
}

export default Reports;
