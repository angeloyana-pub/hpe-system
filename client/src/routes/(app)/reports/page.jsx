import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

import { SalesChart } from './_components/sales-chart';

function Reports() {
  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b gap-2">
        <SidebarTrigger />
        Reports
      </header>
      <div className="p-4 space-y-4">
        <SalesChart />
      </div>
    </SidebarInset>
  );
}

export default Reports;
