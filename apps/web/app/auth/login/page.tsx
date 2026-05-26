'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!', {
        style: {
          background: '#1A1A1A',
          color: '#FAFAFA',
          border: '1px solid rgba(250,250,250,0.1)',
          fontFamily: 'Syne, sans-serif',
        },
      });
      router.push('/dashboard');
    } catch {
      toast.error('Invalid email or password.', {
        style: {
          background: '#1A1A1A',
          color: '#FAFAFA',
          border: '1px solid rgba(255,80,80,0.3)',
          fontFamily: 'Syne, sans-serif',
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-dot-bg opacity-30"
        style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,92,0,0.08) 0%, transparent 60%)' }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-10">
          <Link href="/" className="flex items-center gap-2 mb-10 group w-fit">
            <div className="w-7 h-7 bg-[#FF5C00] rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-xs">N</span>
            </div>
            <span className="font-bold tracking-tight" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em' }}>
              Nova<span style={{ color: '#FF5C00' }}>Pay</span>
            </span>
          </Link>

          <h1
            className="text-3xl font-extrabold tracking-[-0.03em] mb-2"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Welcome back
          </h1>
          <p className="text-white/40 text-sm">Sign in to your NovaPay account.</p>
        </motion.div>

        {/* Form card */}
        <motion.div
          variants={itemVariants}
          className="rounded-lg p-8"
          style={{ background: '#111111', border: '1px solid rgba(250,250,250,0.08)' }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2"
                     style={{ fontFamily: 'DM Mono, monospace' }}>
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                className="input-field"
                placeholder="you@company.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-400/80 text-xs mt-1.5">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest"
                       style={{ fontFamily: 'DM Mono, monospace' }}>
                  Password
                </label>
                <a href="#" className="text-xs text-[#FF5C00] hover:text-[#FF7020] transition-colors">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  className="input-field pr-12"
                  placeholder="Your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400/80 text-xs mt-1.5">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Register link */}
        <motion.p variants={itemVariants} className="text-center text-sm text-white/30 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-[#FF5C00] hover:text-[#FF7020] transition-colors font-semibold">
            Create one free
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}