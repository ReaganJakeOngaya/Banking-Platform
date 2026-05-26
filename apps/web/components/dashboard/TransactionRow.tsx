'use client';

import { Transaction } from '@/lib/mockData';
import { format } from 'date-fns';

interface TransactionRowProps {
  transaction: Transaction;
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
  const statusColors = {
    completed: 'text-green-400 bg-green-400/10',
    pending: 'text-yellow-400 bg-yellow-400/10',
    failed: 'text-red-400 bg-red-400/10',
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center">
          <span className="text-lg">💳</span>
        </div>
        <div>
          <p className="font-medium">{transaction.customer_email}</p>
          <p className="text-sm text-gray-400">{format(new Date(transaction.created_at), 'MMM dd, h:mm a')}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">${transaction.amount.toLocaleString()}</p>
        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[transaction.status]}`}>
          {transaction.status}
        </span>
      </div>
    </div>
  );
}