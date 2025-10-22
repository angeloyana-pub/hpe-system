import { CartProvider } from './_components/cart-context';
import { OrderSummary } from './_components/order-summary';
import { PartsList } from './_components/parts-list';

function PointOfSale() {
  return (
    <CartProvider>
      <div className="p-4 flex gap-4 h-full">
        <div className="flex-1">
          <PartsList />
        </div>
        <OrderSummary />
      </div>
    </CartProvider>
  );
}

export default PointOfSale;
