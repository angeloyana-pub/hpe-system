import { LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import { useAuth } from '@/auth/context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

import { routes } from '../_lib/routes';

export function AppSidebar() {
  const { isMobile } = useSidebar();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success('Successfully logged out');
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar>
                <AvatarImage src="/logo.png" />
                <AvatarFallback>HP</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="truncate font-medium">Hydro-Pro</span>
                <span className="truncate text-xs text-muted-foreground">
                  Inventory and POS System
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem key={routes.dashboard.title}>
                <SidebarMenuButton asChild>
                  <Link to={routes.dashboard.path}>
                    <routes.dashboard.icon />
                    {routes.dashboard.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Inventory</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.inventory.map((route) => (
                <SidebarMenuItem key={route.title}>
                  <SidebarMenuButton asChild>
                    <Link to={route.path}>
                      <route.icon />
                      {route.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Sales</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.sales.map((route) => (
                <SidebarMenuItem key={route.title}>
                  <SidebarMenuButton asChild>
                    <Link to={route.path}>
                      <route.icon />
                      {route.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Reports</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem key={routes.reports.title}>
                <SidebarMenuButton asChild>
                  <Link to={routes.reports.path}>
                    <routes.reports.icon />
                    {routes.reports.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?backgroundColor=b6e3f4,c0aede,d1d4f9" />
                    <AvatarFallback>KP</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="truncate font-medium">{user?.username}</span>
                    <span className="truncate text-xs text-muted-foreground">Admin</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel>
                  <div className="flex gap-2 items-center font-normal">
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?backgroundColor=b6e3f4,c0aede,d1d4f9" />
                      <AvatarFallback>KP</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="truncate font-medium">{user?.username}</span>
                      <span className="truncate text-xs text-muted-foreground">Admin</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <Settings />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
