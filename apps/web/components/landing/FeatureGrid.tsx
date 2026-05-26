'use client';

import { motion } from 'framer-motion';
import { Cpu, Globe, Lock, BarChart3, RefreshCw, Headphones, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'AI Fraud Detection',
    desc: 'Real-time ML scoring catches bad actors before they strike. Sub-100ms decisions on every transaction.',
    stat: '0.01%',
    statLabel: 'fraud rate',
  },
  {
    icon: Globe,
    title: 'Global Payments',
    desc: '120+ countries, 100+ currencies. Local payment methods from cards to wallets to bank transfers.',
    stat: '120+',
    statLabel: 'countries',
  },
  {
    icon: Lock,
    title: 'Bank-grade Security',
    desc: '256-bit encryption at rest and in transit. PCI DSS Level 1 certified infrastructure.',
    stat: 'L1',
    statLabel: 'PCI DSS',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Real-time transaction insights, revenue reporting, and custom dashboards for your team.',
    stat: '<1s',
    statLabel: 'data latency',
  },
  {
    icon: RefreshCw,
    title: 'Instant Settlements',
    desc: 'T+0 settlement options. Access your funds faster than any traditional payment processor.',
    stat: 'T+0',
    statLabel: 'settlement',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Dedicated engineer support. Slack channel, priority SLA, and implementation help included.',
    stat: '< 2m',
    statLabel: 'avg response',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function FeatureGrid() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Section separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="label-sm mb-4">Features</p>
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05]"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Everything to
              <br />
              scale globally
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-base leading-relaxed md:text-right">
            One integration. Every payment method. The infrastructure 
            used by the world's fastest-growing companies.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group relative bg-[#080808] p-8 hover:bg-[#111111] transition-colors duration-300 cursor-default"
            >
              {/* Orange accent on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 0% 0%, rgba(255,92,0,0.06) 0%, transparent 60%)' }}
              />

              {/* Icon */}
              <div className="relative flex items-center justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(255,92,0,0.15)]"
                  style={{ background: 'rgba(250,250,250,0.06)' }}
                >
                  <feature.icon
                    className="w-5 h-5 transition-colors duration-300 text-white/50 group-hover:text-[#FF5C00]"
                  />
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#FF5C00] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              {/* Content */}
              <h3
                className="text-lg font-bold mb-3 tracking-[-0.02em]"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed mb-6">
                {feature.desc}
              </p>

              {/* Bottom stat */}
              <div
                className="flex items-baseline gap-2 pt-4"
                style={{ borderTop: '1px solid rgba(250,250,250,0.06)' }}
              >
                <span
                  className="text-2xl font-extrabold text-[#FF5C00]"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {feature.stat}
                </span>
                <span className="text-xs text-white/30 uppercase tracking-widest">{feature.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}