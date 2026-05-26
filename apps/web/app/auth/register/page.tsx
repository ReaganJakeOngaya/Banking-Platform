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

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success('Account created!', {
        style: {
          background: '#1A1A1A',
          color: '#FAFAFA',
          border: '1px solid rgba(250,250,250,0.1)',
          fontFamily: 'Syne, sans-serif',
        },
      });
      router.push('/dashboard');
    } catch {
      toast.error('Registration failed. Please try again.', {
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
    <div className="min-h-screen bg-[#080808] flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 grid-dot-bg opacity-40" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,92,0,0.08) 0%, transparent 70%)' }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-sm"
        >
          {/* Testimonial / social proof */}
          <div
            className="rounded-lg p-6 mb-6"
            style={{ background: '#111111', border: '1px solid rgba(250,250,250,0.08)' }}
          >
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 text-[#FF5C00] text-xs">★</div>
              ))}
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              "NovaPay cut our integration time from 3 weeks to 2 days. The API is 
              exactly what modern fintech should look like."
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'rgba(255,92,0,0.15)', color: '#FF5C00' }}
              >
                MK
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>Marcus Kim</p>
                <p className="text-xs text-white/40">CTO, Vault Finance</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: '2 min', label: 'To first payment' },
              { val: 'Free', label: 'Sandbox forever' },
            ].map(({ val, label }) => (
              <div
                key={label}
                className="rounded-lg p-4 text-center"
                style={{ background: '#111111', border: '1px solid rgba(250,250,250,0.06)' }}
              >
                <p className="text-xl font-extrabold text-[#FF5C00]" style={{ fontFamily: 'Syne, sans-serif' }}>{val}</p>
                <p className="text-xs text-white/40 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div
          className="absolute top-0 left-0 right-0 bottom-0 lg:left-0"
          style={{ borderLeft: '1px solid rgba(250,250,250,0.06)' }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-sm relative z-10"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
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
              Create account
            </h1>
            <p className="text-white/40 text-sm">Start accepting payments in minutes.</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2"
                     style={{ fontFamily: 'DM Mono, monospace' }}>
                Full name
              </label>
              <input
                {...register('name')}
                type="text"
                className="input-field"
                placeholder="Your name"
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-red-400/80 text-xs mt-1.5">{errors.name.message}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2"
                     style={{ fontFamily: 'DM Mono, monospace' }}>
                Work email
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
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2"
                     style={{ fontFamily: 'DM Mono, monospace' }}>
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  className="input-field pr-12"
                  placeholder="8+ characters"
                  autoComplete="new-password"
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
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2"
                     style={{ fontFamily: 'DM Mono, monospace' }}>
                Confirm password
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirm ? 'text' : 'password'}
                  className="input-field pr-12"
                  placeholder="Repeat password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400/80 text-xs mt-1.5">{errors.confirmPassword.message}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Sign in link */}
          <motion.p variants={itemVariants} className="text-center text-sm text-white/30 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#FF5C00] hover:text-[#FF7020] transition-colors font-semibold">
              Sign in
            </Link>
          </motion.p>

          {/* Terms */}
          <motion.p variants={itemVariants} className="text-center text-xs text-white/20 mt-4 leading-relaxed">
            By creating an account, you agree to our{' '}
            <a href="#" className="underline underline-offset-2 hover:text-white/40 transition-colors">Terms</a>
            {' '}and{' '}
            <a href="#" className="underline underline-offset-2 hover:text-white/40 transition-colors">Privacy Policy</a>.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}