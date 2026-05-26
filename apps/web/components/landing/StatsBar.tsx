'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import useCounter from '@/hooks/useCounter';

const stats = [
  { label: 'Transactions Processed', value: 2500000, suffix: '+', prefix: '$', display: 'volume' },
  { label: 'Active Businesses', value: 15000, suffix: '+', prefix: '', display: 'count' },
  { label: 'Countries Supported', value: 120, suffix: '+', prefix: '', display: 'count' },
  { label: 'Uptime SLA', value: 99.99, suffix: '%', prefix: '', display: 'percent' },
];

function StatItem({ label, value, suffix, prefix, index }: {
  label: string;
  value: number;
  suffix: string;
  prefix: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCounter(isInView ? value : 0, 2200);

  const formatValue = () => {
    if (value >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
      return (count / 1000).toFixed(0) + 'K';
    }
    if (value < 100) {
      return count.toFixed(2);
    }
    return count.toLocaleString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center md:items-start group"
    >
      <div
        className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] mb-2 transition-colors duration-300"
        style={{
          fontFamily: 'Syne, sans-serif',
          color: isInView ? 'var(--white)' : 'rgba(250,250,250,0.2)',
        }}
      >
        <span className="text-[#FF5C00]">{prefix}</span>
        {formatValue()}
        <span
          style={{
            background: 'linear-gradient(135deg, #FF5C00, #FF8C40)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {suffix}
        </span>
      </div>
      <p className="text-sm text-white/35 uppercase tracking-widest font-medium"
         style={{ fontFamily: 'DM Mono, monospace' }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <section className="py-24 px-6 relative">
      {/* Dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,92,0,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="label-sm mb-3">By the numbers</p>
          <h2
            className="text-2xl font-extrabold tracking-[-0.03em] text-white/80"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Trusted at scale
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 md:grid-cols-4 gap-15 md:gap-6">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} />
          ))}
        </div>

        {/* API snippet teaser */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 mx-auto max-w-lg"
        >
          <div
            className="rounded-lg overflow-hidden"
            style={{ background: '#111111', border: '1px solid rgba(250,250,250,0.08)' }}
          >
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(250,250,250,0.06)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              <span className="ml-2 text-xs text-white/25 mono">terminal</span>
            </div>
            <pre className="p-5 text-sm mono overflow-x-auto">
              <code>
                <span className="text-white/30">$ </span>
                <span className="text-white/70">curl </span>
                <span className="text-[#FF5C00]">https://api.novapay.io/v1</span>
                <span className="text-white/70">/payments \</span>
                {'\n'}
                <span className="text-white/30">  </span>
                <span className="text-white/50">-H </span>
                <span className="text-green-400/80">"Authorization: Bearer sk_live_..."</span>
                {'\n'}
                <span className="text-white/30">  </span>
                <span className="text-white/50">-d </span>
                <span className="text-blue-400/80">&#123;"amount": 4999, "currency": "usd"&#125;</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}