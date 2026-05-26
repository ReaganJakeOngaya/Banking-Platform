'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Sparkline from '@/components/ui/Sparkline';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  sparklineData?: number[];
}

export default function StatCard({ title, value, icon: Icon, trend, trendUp, sparklineData }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass rounded-2xl p-6 border border-white/10 hover:border-primary-500/30 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-primary-500/10 rounded-xl">
          <Icon className="w-6 h-6 text-primary-500" />
        </div>
        {trend && (
          <span className={`text-sm ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <div className="text-2xl font-bold">{value}</div>
      {sparklineData && (
        <div className="mt-3">
          <Sparkline data={sparklineData} />
        </div>
      )}
    </motion.div>
  );
}