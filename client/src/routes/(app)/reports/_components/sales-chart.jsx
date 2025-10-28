import { useQueryState } from 'nuqs';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useSalesReport } from '@/features/reports/queries';
import { formatCurrency } from '@/lib/utils';

const chartConfig = {
  totalSales: {
    label: 'Total Sales',
    color: 'var(--chart-1)',
  },
};

export function SalesChart() {
  const { data } = useSalesReport();
  const [interval, setInterval] = useQueryState('salesInterval', { defaultValue: 'month' });

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Sales Report</CardTitle>
          <CardDescription>
            Summary of {interval === 'year' ? 'yearly' : 'monthly'} sales performance
          </CardDescription>
        </div>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={interval}
          onValueChange={(val) => setInterval(val)}
        >
          <ToggleGroupItem value="month">Monthly</ToggleGroupItem>
          <ToggleGroupItem value="year">Yearly</ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={interval === 'year' ? 'year' : 'month'}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => (interval === 'year' ? value : value.slice(0, 3))}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label, payload) => {
                    if (!payload.length) return label;
                    const data = payload[0].payload;
                    return interval === 'year' ? data.year : `${data.month} ${data.year}`;
                  }}
                  formatter={(value, name) => (
                    <div className="text-muted-foreground flex min-w-[130px] items-center text-xs gap-2">
                      {chartConfig[name]?.label || name}
                      <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-medium tabular-nums">
                        {formatCurrency(value)}
                      </div>
                    </div>
                  )}
                />
              }
            />
            <Bar dataKey="totalSales" fill="var(--color-totalSales)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
