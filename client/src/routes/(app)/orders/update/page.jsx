import axios from 'axios';
import { Cloud, PenOff } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { buttonVariants } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useUpdateOrder } from '@/features/orders/mutations';
import { useOrder } from '@/features/orders/queries';

import { OrderForm } from '../_components/order-form';

function UpdateOrder() {
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id);
  const {
    data: order,
    error,
    isError,
    isLoading,
  } = useOrder(id, {
    enabled: !isNaN(id),
    staleTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const updateOrder = useUpdateOrder();

  const handleSubmit = async (_, data) => {
    try {
      await updateOrder.mutateAsync({
        id,
        updatedOrder: {
          ...data,
          customer: { id: data.customer },
          orderItems: data.orderItems.map((item) => ({
            ...item,
            part: { id: item.part.id },
          })),
        },
      });
      toast.success('Order has been updated', {
        action: {
          label: 'View',
          onClick: () => navigate(`/orders?id=${id}`),
        },
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        toast.error('Unable to proceed. This change would reduce stock below zero.');
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
        Update Order
      </header>
      <div className="p-4 space-y-4">
        {isLoading ? (
          <>
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10 w-[150px]" />
          </>
        ) : isNaN(id) ||
          (isError && axios.isAxiosError(error) && error.response?.status === 404) ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Cloud />
              </EmptyMedia>
              <EmptyTitle>404 Not Found</EmptyTitle>
              <EmptyDescription>
                Cannot find order of id <span className="font-medium">“{id}”</span>
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Link to="/orders/add" className={buttonVariants()}>
                  Add Order
                </Link>
                <Link to="/orders" className={buttonVariants({ variant: 'outline' })}>
                  View Orders
                </Link>
              </div>
            </EmptyContent>
          </Empty>
        ) : order.status === 'COMPLETED' ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PenOff />
              </EmptyMedia>
              <EmptyTitle>403 Forbidden</EmptyTitle>
              <EmptyDescription>
                The order with ID <span className="font-medium">“{id}”</span> has already been
                completed.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Link to="/orders/add" className={buttonVariants()}>
                  Add Order
                </Link>
                <Link to="/orders" className={buttonVariants({ variant: 'outline' })}>
                  View Orders
                </Link>
              </div>
            </EmptyContent>
          </Empty>
        ) : (
          <OrderForm
            variant="update"
            defaultValues={{
              ...order,
              customer: order.customer.id,
            }}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </SidebarInset>
  );
}

export default UpdateOrder;
