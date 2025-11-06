import Cookies from 'js-cookie';
import { Outlet } from 'react-router';

import { SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from './_components/app-sidebar';

function AppLayout() {
  return (
    <SidebarProvider defaultOpen={Cookies.get('sidebar_state') === 'true'}>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  );
}

export default AppLayout;
