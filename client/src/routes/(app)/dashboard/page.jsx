import { PhilippinePeso, ShoppingCart, TrendingDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLowStockParts, useTotalOrders, useTotalSales } from '@/features/dashboard/queries';
import { formatCurrency } from '@/lib/utils';

function Dashboard() {
  const { data: totalSales = { currentTotalSales: 0, previousTotalSales: 0 } } = useTotalSales();
  const { data: totalOrders = { currentTotalOrders: 0, previousTotalOrders: 0 } } =
    useTotalOrders();
  const { data: lowStockParts = [] } = useLowStockParts();

  const { currentTotalSales, previousTotalSales } = totalSales;
  const { currentTotalOrders, previousTotalOrders } = totalOrders;
  const salesGrowth = ((currentTotalSales - previousTotalSales) / previousTotalSales) * 100;
  const ordersGrowth = ((currentTotalOrders - previousTotalOrders) / previousTotalOrders) * 100;

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b">
        <SidebarTrigger />
        <Separator orientation="vertical" className="ml-2 mr-4" />
        Dashboard
      </header>
      <div className="p-4 space-y-4 @container">
        <div className="grid gap-4 @sm:grid-cols-2">
          <Card className="gap-0">
            <CardHeader className="flex justify-between">
              <CardTitle className="text-muted-foreground font-normal">Total Sales</CardTitle>
              <PhilippinePeso />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-medium">{formatCurrency(currentTotalSales)}</div>
              <div className="text-muted-foreground">
                {previousTotalSales === 0
                  ? '-- --'
                  : `${salesGrowth >= 0 ? '+' : ''}${salesGrowth.toFixed(1)}% from last month`}
              </div>
            </CardContent>
          </Card>
          <Card className="gap-0">
            <CardHeader className="flex justify-between">
              <CardTitle className="text-muted-foreground font-normal">Total Orders</CardTitle>
              <ShoppingCart />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-medium">+{currentTotalOrders}</div>
              <div className="text-muted-foreground">
                {previousTotalOrders === 0
                  ? '-- --'
                  : `${ordersGrowth >= 0 ? '+' : ''}${ordersGrowth.toFixed(1)}% from last month`}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="flex justify-between">
            <div className="grid gap-2">
              <CardTitle>Low Stock Parts</CardTitle>
              <CardDescription>Parts that need to be restocked</CardDescription>
            </div>
            <TrendingDown />
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-auto">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow>
                    <TableHead>Part</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockParts.length > 0 ? (
                    lowStockParts.map((part) => (
                      <TableRow key={part.id}>
                        <TableCell>
                          <div>{part.name}</div>
                          <div className="text-muted-foreground text-sm">{part.size}</div>
                        </TableCell>
                        <TableCell>
                          {part.tags.length > 0 ? (
                            <div className="flex gap-2">
                              {part.tags.map((tag) => (
                                <Badge key={tag.id} variant="outline">{tag.name}</Badge>
                              ))}
                            </div>
                          ) : (
                            <div className="text-muted-foreground italic">N/A</div>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {formatCurrency(part.price)}
                        </TableCell>
                        <TableCell className="text-right font-medium">{part.stock}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="4" className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}

export default Dashboard;
