import { Outlet, useLocation } from 'react-router';

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import { AppSidebar } from './_components/app-sidebar';
import { routes } from './_lib/routes';

function AppLayout() {
  const location = useLocation();
  const currentRoute = routes.find((route) => route.path === location.pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="p-4 flex items-center gap-4">
          <SidebarTrigger />
          {currentRoute?.title}
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AppLayout;
