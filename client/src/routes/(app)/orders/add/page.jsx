import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useAddOrder } from '@/features/orders/mutations';

import { OrderForm } from '../_components/order-form';

function AddOrder() {
  const navigate = useNavigate();
  const addOrder = useAddOrder();

  const handleSubmit = async (form, data) => {
    try {
      const { id } = await addOrder.mutateAsync({
        ...data,
        customer: { id: data.customer },
        orderItems: data.orderItems.map((item) => ({
          ...item,
          part: { id: item.part.id },
        })),
      });
      toast.success('Order has been added', {
        action: {
          label: 'View',
          onClick: () => navigate(`/orders?id=${id}`),
        },
      });
      form.reset();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status == 409) {
        toast.error('Unable to proceed. This action would reduce stock below zero.');
      } else {
        throw err;
      }
    }
  };

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b">
        <SidebarTrigger />
        <Separator orientation="vertical" className="ml-2 mr-4" />
        Add Order
      </header>
      <div className="p-4 space-y-4">
        <OrderForm variant="add" onSubmit={handleSubmit} />
      </div>
    </SidebarInset>
  );
}

export default AddOrder;
