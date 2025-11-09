import { useMemo, useState } from 'react';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useCustomers } from '@/features/customers/queries';

import { CustomersTable } from './_components/customers-table';
import { DeleteCustomerDialog } from './_components/delete-customer-dialog';
import { UpdateCustomerDialog } from './_components/update-customer-dialog';
import { getColumns } from './_lib/columns';

function Customers() {
  const { data = { customers: [], pageCount: 0 } } = useCustomers();

  const [rowAction, setRowAction] = useState(null);
  const columns = useMemo(() => getColumns({ setRowAction }), []);

  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b">
        <SidebarTrigger />
        <Separator orientation="vertical" className="ml-2 mr-4" />
        Customers
      </header>
      <div className="p-4 space-y-4">
        <CustomersTable data={data} columns={columns} />
        <UpdateCustomerDialog
          open={rowAction?.variant === 'update'}
          onOpenChange={() => setRowAction(null)}
          customer={rowAction?.row.original ?? null}
        />
        <DeleteCustomerDialog
          open={rowAction?.variant === 'delete'}
          onOpenChange={() => setRowAction(null)}
          customer={rowAction?.row.original ?? null}
        />
      </div>
    </SidebarInset>
  );
}

export default Customers;
