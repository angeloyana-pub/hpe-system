import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useSalesReport } from '@/features/reports/queries';
import { formatCurrency } from '@/lib/utils';

const chartConfig = {
  totalSales: {
    label: 'Total Sales',
    color: 'var(--chart-1)',
  },
};

export function SalesChart() {
  const { data } = useSalesReport({ initialData: [] });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Report</CardTitle>
        <CardDescription>Summary of monthly sales performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="text-muted-foreground flex min-w-[130px] items-center text-xs">
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
