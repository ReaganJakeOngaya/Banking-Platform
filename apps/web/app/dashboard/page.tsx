'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Nav from '@/components/Nav';
import StatCard from '@/components/dashboard/StatCard';
import BarChart from '@/components/dashboard/BarChart';
import TransactionRow from '@/components/dashboard/TransactionRow';
import RegionBreakdown from '@/components/dashboard/RegionBreakdown';
import Coin3D from '@/components/ui/Coin3D';
import { useTransactions } from '@/hooks/useTransactions';
import { useAnalytics } from '@/hooks/useAnalytics';
import { DollarSign, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const { data: transactions, isLoading: txLoading } = useTransactions();
  const { data: analytics } = useAnalytics();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const stats = [
    {
      title: 'Total Volume',
      value: `$${analytics?.totalVolume?.toLocaleString() ?? '0'}`,
      icon: DollarSign,
      trend: '+12.5%',
      trendUp: true,
    },
    {
      title: 'Success Rate',
      value: `${analytics?.successRate ?? 99.2}%`,
      icon: CheckCircle,
      trend: '+2.1%',
      trendUp: true,
    },
    {
      title: 'Active Users',
      value: analytics?.activeUsers?.toLocaleString() ?? '0',
      icon: Users,
      trend: '+8.3%',
      trendUp: true,
    },
    {
      title: 'Avg Transaction',
      value: `$${analytics?.avgTransaction?.toLocaleString() ?? '0'}`,
      icon: TrendingUp,
      trend: '+5.7%',
      trendUp: true,
    },
  ];

  return (
    <div className="min-h-screen bg-dark-300">
      <Nav />
      
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, {user?.name}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 glass rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold mb-4">Transaction Volume</h2>
            <BarChart data={analytics?.volumeData || []} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-2xl p-6 border border-white/10 flex flex-col items-center"
          >
            <Coin3D />
            <h3 className="text-lg font-semibold mt-4">Secure Crypto Payments</h3>
            <p className="text-gray-400 text-sm text-center mt-2">
              Powered by blockchain technology
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {txLoading ? (
                <div className="text-center py-8 text-gray-400">Loading transactions...</div>
              ) : (
                transactions?.slice(0, 5).map((tx) => (
                  <TransactionRow key={tx.id} transaction={tx} />
                ))
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold mb-4">Geographic Distribution</h2>
            <RegionBreakdown data={analytics?.regionData || []} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}