import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

import { CartProvider } from './_components/cart-context';
import { OrderSummary } from './_components/order-summary';
import { PartsList } from './_components/parts-list';

function PointOfSale() {
  return (
    <SidebarInset className="h-svh">
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b">
        <SidebarTrigger />
        <Separator orientation="vertical" className="ml-2 mr-4" />
        Point of Sale
      </header>
      <CartProvider>
        <div className="p-4 flex gap-4 h-[calc(100%-var(--spacing)*14)]">
          <PartsList />
          <OrderSummary />
        </div>
      </CartProvider>
    </SidebarInset>
  );
}

export default PointOfSale;
