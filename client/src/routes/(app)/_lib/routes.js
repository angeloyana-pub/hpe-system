import {
  Calculator,
  Component,
  LayoutDashboard,
  LineChart,
  ShoppingCart,
  Tags,
  Truck,
  Warehouse,
} from 'lucide-react';

export const routes = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
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
  {
    title: 'Reports',
    path: '/reports',
    icon: LineChart,
  },
];
