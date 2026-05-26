'use client';

import Nav from '@/components/Nav';
import Hero from '@/components/landing/Hero';
import FeatureGrid from '@/components/landing/FeatureGrid';
import StatsBar from '@/components/landing/StatsBar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#080808] overflow-hidden">
      <Nav />
      <Hero />
      <FeatureGrid />
      <StatsBar />

      {/* CTA Section */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 grid-dot-bg opacity-30"
          style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <p className="label-sm mb-6">Get started today</p>
          <h2
            className="text-5xl md:text-7xl font-extrabold tracking-[-0.04em] mb-8 leading-[0.95]"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Build your first
            <br />
            payment in{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF5C00, #FF8C40)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              minutes.
            </span>
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-lg mx-auto">
            Free sandbox. No credit card required. Full API access from day one.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary">
              Create free account
              <FaArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/auth/login" className="btn-outline">
              Sign in
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 px-6"
        style={{ borderTop: '1px solid rgba(250,250,250,0.06)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#FF5C00] rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-xs" style={{ fontFamily: 'Syne, sans-serif' }}>N</span>
            </div>
            <span className="text-sm text-white/40" style={{ fontFamily: 'Syne, sans-serif' }}>
              &copy; 2025 NovaPay, Inc.
            </span>
          </div>

          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Security', 'Status'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-white/30 hover:text-white/60 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: FaGithub, label: 'GitHub' },
              { icon: FaTwitter, label: 'X' },
              { icon: FaLinkedin, label: 'Linkedin' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-sm text-white/30 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}