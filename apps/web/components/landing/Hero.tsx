'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';
import { useRef } from 'react';
import Card3D from '@/components/ui/Card3D';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-20 pb-16 px-6 overflow-hidden">
      {/* Grid dot background */}
      <div
        className="absolute inset-0 grid-dot-bg"
        style={{ maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)' }}
      />

      {/* Orange glow orb */}
      <motion.div
        style={{ y: yBg }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,92,0,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Geometric accent lines */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[rgba(255,92,0,0.1)] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] animate-pulse-orange" />
              <span
                className="label-sm"
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                Payments Infrastructure v2.0
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl lg:text-[88px] font-extrabold leading-[0.95] tracking-[-0.04em] mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Move
              <br />
              money
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #FF5C00 0%, #FF8C40 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                faster.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-white/50 mb-10 max-w-md leading-relaxed"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Banking-grade API infrastructure for developers. Accept, move, and manage 
              payments across 120+ countries — in hours, not months.
            </motion.p>

            {/* CTA row */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-12">
              <Link href="/auth/register" className="btn-primary">
                Start building
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/api-docs" className="btn-outline">
                View docs
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-5 pt-8"
              style={{ borderTop: '1px solid rgba(250,250,250,0.08)' }}
            >
              {[
                { icon: Shield, label: 'PCI DSS Level 1', color: '#22c55e' },
                { icon: Zap, label: '99.99% Uptime SLA', color: '#eab308' },
                { icon: TrendingUp, label: '$2.5B+ Processed', color: '#FF5C00' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" style={{ color }} />
                  <span className="text-sm text-white/50">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D card / visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <Card3D>
              <PaymentCard />
            </Card3D>
          </motion.div>
        </div>

        {/* Bottom scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={opacity ? { opacity: opacity as unknown as number } : {}}
        >
          <span className="text-xs text-white/30 tracking-widest uppercase mono">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

function PaymentCard() {
  return (
    <div className="relative w-[380px]">
      {/* Main card */}
      <div
        className="relative rounded-2xl p-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1A1A1A 0%, #111111 100%)',
          border: '1px solid rgba(250,250,250,0.1)',
        }}
      >
        {/* Card texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 30% 20%, rgba(255,92,0,0.3) 0%, transparent 60%)',
          }}
        />

        {/* Card header */}
        <div className="relative flex justify-between items-start mb-10">
          <div>
            <p className="label-sm mb-1 opacity-50">NovaPay</p>
            <p className="text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Business</p>
          </div>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,92,0,0.15)', border: '1px solid rgba(255,92,0,0.3)' }}
          >
            <div
              className="w-6 h-6 rounded-full"
              style={{ background: 'var(--orange)' }}
            />
          </div>
        </div>

        {/* Card number */}
        <p
          className="mono text-lg tracking-[0.15em] text-white/50 mb-8"
        >
          •••• •••• •••• 4291
        </p>

        {/* Card footer */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Card Holder</p>
            <p className="font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>Acme Corp.</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Expires</p>
            <p className="font-semibold mono">12/28</p>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full border border-white/[0.04]" />
        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full border border-white/[0.06]" />
      </div>

      {/* Floating stat cards */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-6 -right-10 rounded-xl px-4 py-3 shadow-2xl"
        style={{ background: '#1A1A1A', border: '1px solid rgba(255,92,0,0.2)' }}
      >
        <p className="text-xs text-white/40 mb-0.5">Last 24h</p>
        <p className="font-bold text-[#FF5C00] text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>+$84,210</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-6 -left-10 rounded-xl px-4 py-3 shadow-2xl"
        style={{ background: '#1A1A1A', border: '1px solid rgba(250,250,250,0.08)' }}
      >
        <p className="text-xs text-white/40 mb-0.5">Success rate</p>
        <p className="font-bold text-white text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>99.8%</p>
      </motion.div>
    </div>
  );
}