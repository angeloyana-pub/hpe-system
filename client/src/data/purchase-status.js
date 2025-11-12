import { CircleCheck, CircleX, Timer } from 'lucide-react';

export const purchaseStatus = [
  { icon: Timer, label: 'Processing', value: 'PROCESSING' },
  { icon: CircleCheck, label: 'Completed', value: 'COMPLETED' },
  { icon: CircleX, label: 'Cancelled', value: 'CANCELLED' },
];
