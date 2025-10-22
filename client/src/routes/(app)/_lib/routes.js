import { Calculator, Component, ShoppingCart, Tags, Truck, Warehouse } from 'lucide-react';

export const routes = [
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
];
