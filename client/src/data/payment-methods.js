import { CreditCard, HandCoins, Wallet } from 'lucide-react';

export const paymentMethods = [
  { icon: HandCoins, label: 'Cash', value: 'cash' },
  { icon: Wallet, label: 'GCash', value: 'gcash' },
  { icon: CreditCard, label: 'Credit Card', value: 'credit_card' },
];
