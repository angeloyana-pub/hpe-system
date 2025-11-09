import {
  Calculator,
  Component,
  LayoutDashboard,
  LineChart,
  ShoppingCart,
  Tags,
  Truck,
  Users,
  Warehouse,
} from 'lucide-react';

export const routes = {
  dashboard: {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  inventory: [
    {
      title: 'Parts',
      path: '/parts',
      icon: Component,
    },
    {
      title: 'Tags',
      path: '/tags',
      icon: Tags,
    },
    {
      title: 'Suppliers',
      path: '/suppliers',
      icon: Warehouse,
    },
    {
      title: 'Purchases',
      path: '/purchases',
      icon: Truck,
    },
  ],
  sales: [
    {
      title: 'Customers',
      path: '/customers',
      icon: Users,
    },
    {
      title: 'Orders',
      path: '/orders',
      icon: ShoppingCart,
    },
    {
      title: 'Point of Sale',
      path: '/point-of-sale',
      icon: Calculator,
    },
  ],
  reports: {
    title: 'Reports',
    path: '/reports',
    icon: LineChart,
  },
};
