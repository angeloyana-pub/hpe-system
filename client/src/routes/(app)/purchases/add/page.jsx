import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useAddPurchase } from '@/features/purchases/mutations';

import { PurchaseForm } from '../_components/purchase-form';

function AddPurchase() {
  const navigate = useNavigate();
  const addPurchase = useAddPurchase();

  const handleSubmit = async (data) => {
    await addPurchase.mutateAsync({
      ...data,
      supplier: { id: data.supplier },
      purchaseItems: data.purchaseItems.map((item) => ({
        ...item,
        part: { id: item.part.id },
      })),
    });
    toast.success('Purchase has been added', {
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
        Add Purchase
      </header>
      <div className="p-4 space-y-4">
        <PurchaseForm variant="add" onSubmit={handleSubmit} />
      </div>
    </SidebarInset>
  );
}

export default AddPurchase;
