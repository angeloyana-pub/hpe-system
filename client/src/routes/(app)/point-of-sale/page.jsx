import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

import { CartProvider } from './_components/cart-context';
import { OrderSummary } from './_components/order-summary';
import { PartsList } from './_components/parts-list';

function PointOfSale() {
  return (
    <SidebarInset className="h-svh">
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b gap-2">
        <SidebarTrigger />
        Point of Sale
      </header>
      <CartProvider>
        <div className="p-4 flex gap-4 h-[calc(100%-var(--spacing)*14)]">
          <div className="@container flex-1 overflow-y-auto">
            <PartsList />
          </div>
          <OrderSummary />
        </div>
      </CartProvider>
    </SidebarInset>
  );
}

export default PointOfSale;
