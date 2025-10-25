import { PhilippinePeso, ShoppingCart, TrendingDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLowStockParts, useTotalRevenue, useTotalSales } from '@/hooks/use-dashboard';
import { formatCurrency } from '@/lib/utils';

function Dashboard() {
  const { data: totalRevenue } = useTotalRevenue({
    initialData: {
      totalRevenue: 0,
    },
  });
  const { data: totalSales } = useTotalSales({
    initialData: {
      totalSales: 0,
    },
  });
  const { data: lowStockParts } = useLowStockParts({ initialData: [] });

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b gap-2">
        <SidebarTrigger />
        Dashboard
      </header>
      <div className="p-4 space-y-4 @container">
        <div className="grid gap-4 @sm:grid-cols-2">
          <Card className="gap-0">
            <CardHeader className="flex justify-between">
              <CardTitle>Total Revenue</CardTitle>
              <PhilippinePeso />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-medium">
                {formatCurrency(totalRevenue.totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card className="gap-0">
            <CardHeader className="flex justify-between">
              <CardTitle>Sales</CardTitle>
              <ShoppingCart />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-medium">+{totalSales.totalSales}</div>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockParts.map((part) => (
                  <TableRow>
                    <TableCell>{part.name}</TableCell>
                    <TableCell>{part.size}</TableCell>
                    <TableCell>
                      {part.tags.length > 0 ? (
                        <div className="flex gap-2">
                          {part.tags.map((tag) => (
                            <Badge variant="outline">{tag.name}</Badge>
                          ))}
                        </div>
                      ) : (
                        <div className="text-muted-foreground italic">N/A</div>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-medium">{part.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}

export default Dashboard;
