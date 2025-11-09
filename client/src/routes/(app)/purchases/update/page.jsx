import axios from 'axios';
import { Cloud } from 'lucide-react';
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
import { useUpdatePurchase } from '@/features/purchases/mutations';
import { usePurchase } from '@/features/purchases/queries';

import { PurchaseForm } from '../_components/purchase-form';

function UpdatePurchase() {
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id);
  const {
    data: purchase,
    error,
    isError,
    isLoading,
  } = usePurchase(id, {
    enabled: !isNaN(id),
    staleTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const updatePurchase = useUpdatePurchase();

  const handleSubmit = async (data) => {
    await updatePurchase.mutateAsync({
      id,
      updatedPurchase: {
        ...data,
        supplier: { id: data.supplier },
        purchaseItems: data.purchaseItems.map((item) => ({
          ...item,
          part: { id: item.part.id },
        })),
      },
    });
    toast.success('Purchase has been updated', {
      action: {
        label: 'View',
        onClick: () => navigate('/purchases'),
      },
    });
  };

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b">
        <SidebarTrigger />
        <Separator orientation="vertical" className="ml-2 mr-4" />
        Update Purchase
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
                Cannot find purchase of id <span className="font-medium">“{id}”</span>
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Link to="/purchases/add" className={buttonVariants()}>
                  Add Purchase
                </Link>
                <Link to="/purchases" className={buttonVariants({ variant: 'outline' })}>
                  View Purchases
                </Link>
              </div>
            </EmptyContent>
          </Empty>
        ) : (
          <PurchaseForm
            variant="update"
            defaultValues={{
              ...purchase,
              supplier: purchase.supplier.id,
            }}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </SidebarInset>
  );
}

export default UpdatePurchase;
