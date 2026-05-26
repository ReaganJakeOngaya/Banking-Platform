// SWR/React Query hooks
import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '@/lib/api';

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });
}