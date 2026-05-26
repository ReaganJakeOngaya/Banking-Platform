'use client';

import Nav from '@/components/Nav';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Key, Lock, Zap, Globe, ArrowRight, ChevronRight, ChevronDown,
  Copy, Check, Terminal, BookOpen, Code2, Webhook, Shield,
  CreditCard, RefreshCw, BarChart3, AlertCircle, Menu, X,
  ArrowUpRight, ExternalLink, Search
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Endpoint {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  code: string;
  responseCode?: string;
  params?: { name: string; type: string; required: boolean; desc: string }[];
}

interface SidebarSection {
  id: string;
  label: string;
  icon: React.ElementType;
  children: { id: string; label: string }[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const sidebarSections: SidebarSection[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: BookOpen,
    children: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'authentication', label: 'Authentication' },
      { id: 'quickstart', label: 'Quickstart' },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: CreditCard,
    children: [
      { id: 'create-payment', label: 'Create Payment' },
      { id: 'get-payment', label: 'Retrieve Payment' },
      { id: 'list-payments', label: 'List Payments' },
      { id: 'refunds', label: 'Refunds' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    children: [
      { id: 'metrics', label: 'Metrics' },
      { id: 'reports', label: 'Reports' },
    ],
  },
  {
    id: 'webhooks',
    label: 'Webhooks',
    icon: Webhook,
    children: [
      { id: 'webhook-overview', label: 'Overview' },
      { id: 'webhook-events', label: 'Event Types' },
    ],
  },
  {
    id: 'errors',
    label: 'Errors & Limits',
    icon: AlertCircle,
    children: [
      { id: 'error-codes', label: 'Error Codes' },
      { id: 'rate-limits', label: 'Rate Limits' },
    ],
  },
];

const endpoints: Endpoint[] = [
  {
    method: 'POST',
    path: '/v1/payments',
    description: 'Create a new payment transaction. Supports cards, wallets, and bank transfers across 120+ countries.',
    code: `curl -X POST https://api.novapay.io/v1/payments \\
  -H "Authorization: Bearer sk_live_••••••••" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 4999,
    "currency": "usd",
    "customer_email": "user@example.com",
    "payment_method": "pm_card_visa",
    "description": "Pro plan subscription"
  }'`,
    responseCode: `{
  "id": "pay_01HZXK9Q8V2G3N4M5P6R7S8T9",
  "object": "payment",
  "amount": 4999,
  "currency": "usd",
  "status": "succeeded",
  "created_at": "2025-01-15T14:32:07Z",
  "customer_email": "user@example.com",
  "receipt_url": "https://pay.novapay.io/r/01HZ"
}`,
    params: [
      { name: 'amount', type: 'integer', required: true, desc: 'Amount in smallest currency unit (e.g., cents).' },
      { name: 'currency', type: 'string', required: true, desc: 'Three-letter ISO 4217 currency code.' },
      { name: 'customer_email', type: 'string', required: false, desc: 'Customer email for receipts and fraud signals.' },
      { name: 'payment_method', type: 'string', required: true, desc: 'Payment method ID from a prior tokenisation call.' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/payments/:id',
    description: 'Retrieve the details of a previously created payment by its unique identifier.',
    code: `curl https://api.novapay.io/v1/payments/pay_01HZXK9Q8V2G3N4 \\
  -H "Authorization: Bearer sk_live_••••••••"`,
    responseCode: `{
  "id": "pay_01HZXK9Q8V2G3N4M5P6R7S8T9",
  "object": "payment",
  "amount": 4999,
  "currency": "usd",
  "status": "succeeded",
  "created_at": "2025-01-15T14:32:07Z"
}`,
  },
  {
    method: 'GET',
    path: '/v1/analytics',
    description: 'Retrieve aggregated payment metrics, revenue breakdowns, and conversion rates for a given time window.',
    code: `curl "https://api.novapay.io/v1/analytics?from=2025-01-01&to=2025-01-31&granularity=day" \\
  -H "Authorization: Bearer sk_live_••••••••"`,
    responseCode: `{
  "period": { "from": "2025-01-01", "to": "2025-01-31" },
  "total_volume": 2481920,
  "currency": "usd",
  "success_rate": 99.8,
  "transactions": 1847
}`,
    params: [
      { name: 'from', type: 'string', required: true, desc: 'ISO 8601 start date.' },
      { name: 'to', type: 'string', required: true, desc: 'ISO 8601 end date.' },
      { name: 'granularity', type: 'string', required: false, desc: '"hour" | "day" | "week" | "month".' },
    ],
  },
  {
    method: 'POST',
    path: '/v1/refunds',
    description: 'Issue a full or partial refund for a completed payment. Refunds settle within 5–10 business days.',
    code: `curl -X POST https://api.novapay.io/v1/refunds \\
  -H "Authorization: Bearer sk_live_••••••••" \\
  -H "Content-Type: application/json" \\
  -d '{
    "payment_id": "pay_01HZXK9Q8V2G3N4",
    "amount": 2500,
    "reason": "customer_request"
  }'`,
    responseCode: `{
  "id": "ref_01J0A2B3C4D5E6F7",
  "object": "refund",
  "payment_id": "pay_01HZXK9Q8V2G3N4",
  "amount": 2500,
  "status": "pending",
  "created_at": "2025-01-16T09:10:00Z"
}`,
    params: [
      { name: 'payment_id', type: 'string', required: true, desc: 'ID of the payment to refund.' },
      { name: 'amount', type: 'integer', required: false, desc: 'Amount to refund. Defaults to full amount.' },
      { name: 'reason', type: 'string', required: false, desc: '"duplicate" | "fraudulent" | "customer_request".' },
    ],
  },
];

const errorCodes = [
  { code: '400', name: 'bad_request', desc: 'Malformed request body or missing required fields.' },
  { code: '401', name: 'unauthorized', desc: 'Missing or invalid API key.' },
  { code: '402', name: 'payment_failed', desc: 'The payment could not be processed by the issuer.' },
  { code: '429', name: 'rate_limited', desc: 'Too many requests. See rate limit headers.' },
  { code: '500', name: 'server_error', desc: 'Unexpected error on our end. Check status.novapay.io.' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all duration-150"
      style={{
        background: copied ? 'rgba(255,92,0,0.15)' : 'rgba(250,250,250,0.06)',
        color: copied ? '#FF5C00' : 'rgba(250,250,250,0.4)',
        border: `1px solid ${copied ? 'rgba(255,92,0,0.3)' : 'transparent'}`,
      }}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function MethodBadge({ method }: { method: Endpoint['method'] }) {
  const colors: Record<string, { bg: string; text: string }> = {
    GET:    { bg: 'rgba(34,197,94,0.12)',   text: '#22c55e' },
    POST:   { bg: 'rgba(255,92,0,0.15)',     text: '#FF5C00' },
    DELETE: { bg: 'rgba(239,68,68,0.12)',    text: '#ef4444' },
    PATCH:  { bg: 'rgba(234,179,8,0.12)',    text: '#eab308' },
  };
  const c = colors[method];
  return (
    <span
      className="text-xs font-bold px-2.5 py-1 rounded"
      style={{
        background: c.bg,
        color: c.text,
        fontFamily: 'DM Mono, monospace',
        border: `1px solid ${c.text}30`,
      }}
    >
      {method}
    </span>
  );
}

function CodePane({ code, label }: { code: string; label?: string }) {
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ background: '#0D0D0D', border: '1px solid rgba(250,250,250,0.07)' }}
    >
      {/* Terminal chrome */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: '1px solid rgba(250,250,250,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          {label && (
            <span
              className="ml-2 text-xs"
              style={{ color: 'rgba(250,250,250,0.25)', fontFamily: 'DM Mono, monospace' }}
            >
              {label}
            </span>
          )}
        </div>
        <CopyButton code={code} />
      </div>
      <pre
        className="p-5 text-sm overflow-x-auto leading-relaxed"
        style={{ fontFamily: 'DM Mono, monospace', color: 'rgba(250,250,250,0.7)' }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ParamsTable({ params }: { params: NonNullable<Endpoint['params']> }) {
  return (
    <div
      className="rounded-lg overflow-hidden text-sm"
      style={{ border: '1px solid rgba(250,250,250,0.07)' }}
    >
      <div
        className="grid grid-cols-[160px_100px_80px_1fr] px-5 py-2.5"
        style={{
          borderBottom: '1px solid rgba(250,250,250,0.07)',
          background: 'rgba(250,250,250,0.03)',
          fontFamily: 'DM Mono, monospace',
          fontSize: '11px',
          color: 'rgba(250,250,250,0.3)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        <span>Parameter</span>
        <span>Type</span>
        <span>Required</span>
        <span>Description</span>
      </div>
      {params.map((p, i) => (
        <div
          key={p.name}
          className="grid grid-cols-[160px_100px_80px_1fr] px-5 py-3 items-start"
          style={{
            borderBottom: i < params.length - 1 ? '1px solid rgba(250,250,250,0.05)' : 'none',
            background: i % 2 === 0 ? 'transparent' : 'rgba(250,250,250,0.015)',
          }}
        >
          <span style={{ fontFamily: 'DM Mono, monospace', color: '#FF5C00', fontSize: '13px' }}>{p.name}</span>
          <span style={{ fontFamily: 'DM Mono, monospace', color: 'rgba(250,250,250,0.35)', fontSize: '12px' }}>{p.type}</span>
          <span style={{ color: p.required ? '#22c55e' : 'rgba(250,250,250,0.25)', fontSize: '12px' }}>
            {p.required ? 'required' : 'optional'}
          </span>
          <span style={{ color: 'rgba(250,250,250,0.5)' }}>{p.desc}</span>
        </div>
      ))}
    </div>
  );
}

function EndpointCard({ endpoint, index }: { endpoint: Endpoint; index: number }) {
  const [activeTab, setActiveTab] = useState<'request' | 'response'>('request');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      style={{
        background: '#0A0A0A',
        border: '1px solid rgba(250,250,250,0.07)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 0% 0%, rgba(255,92,0,0.04) 0%, transparent 50%)' }}
      />

      {/* Card header */}
      <div
        className="px-7 py-5 flex items-start justify-between gap-4"
        style={{ borderBottom: '1px solid rgba(250,250,250,0.06)' }}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <MethodBadge method={endpoint.method} />
          <code
            className="text-sm"
            style={{ fontFamily: 'DM Mono, monospace', color: 'rgba(250,250,250,0.8)' }}
          >
            {endpoint.path}
          </code>
        </div>
        <ArrowUpRight
          className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
          style={{ color: '#FF5C00' }}
        />
      </div>

      {/* Card body */}
      <div className="px-7 py-6 space-y-6">
        <p style={{ color: 'rgba(250,250,250,0.45)', lineHeight: 1.7, fontSize: '14px' }}>
          {endpoint.description}
        </p>

        {/* Params table */}
        {endpoint.params && (
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: 'rgba(250,250,250,0.25)', fontFamily: 'DM Mono, monospace' }}
            >
              Parameters
            </p>
            <ParamsTable params={endpoint.params} />
          </div>
        )}

        {/* Code tabs */}
        <div>
          <div className="flex items-center gap-1 mb-3">
            {(['request', 'response'] as const).map((tab) => (
              endpoint.responseCode || tab === 'request' ? (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-3 py-1.5 rounded text-xs capitalize transition-all duration-150"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    background: activeTab === tab ? 'rgba(255,92,0,0.12)' : 'transparent',
                    color: activeTab === tab ? '#FF5C00' : 'rgba(250,250,250,0.3)',
                    border: `1px solid ${activeTab === tab ? 'rgba(255,92,0,0.25)' : 'transparent'}`,
                  }}
                >
                  {tab}
                </button>
              ) : null
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'request' ? (
                <CodePane code={endpoint.code} label="bash" />
              ) : endpoint.responseCode ? (
                <CodePane code={endpoint.responseCode} label="json" />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  open,
  onClose,
  activeSection,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'getting-started': true,
    payments: true,
    analytics: false,
    webhooks: false,
    errors: false,
  });

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const content = (
    <div className="flex flex-col h-full">
      {/* Sidebar header */}
      <div
        className="px-5 py-5 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(250,250,250,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" style={{ color: '#FF5C00' }} />
          <span
            className="text-sm font-bold"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
          >
            Docs
          </span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded transition-colors"
          style={{ color: 'rgba(250,250,250,0.4)' }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(250,250,250,0.06)' }}>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: 'rgba(250,250,250,0.04)', border: '1px solid rgba(250,250,250,0.07)' }}
        >
          <Search className="w-3.5 h-3.5" style={{ color: 'rgba(250,250,250,0.25)' }} />
          <input
            placeholder="Search docs..."
            className="bg-transparent text-xs outline-none flex-1 placeholder:text-white/25"
            style={{ fontFamily: 'DM Mono, monospace', color: 'rgba(250,250,250,0.6)' }}
          />
          <kbd
            className="text-[10px] px-1.5 py-0.5 rounded"
            style={{
              background: 'rgba(250,250,250,0.06)',
              color: 'rgba(250,250,250,0.2)',
              fontFamily: 'DM Mono, monospace',
              border: '1px solid rgba(250,250,250,0.08)',
            }}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Nav tree */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {sidebarSections.map((section) => (
          <div key={section.id}>
            {/* Section toggle */}
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 group"
              style={{
                fontFamily: 'Syne, sans-serif',
                color: expanded[section.id] ? 'rgba(250,250,250,0.8)' : 'rgba(250,250,250,0.4)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <section.icon className="w-4 h-4 shrink-0" style={{ color: expanded[section.id] ? '#FF5C00' : 'rgba(250,250,250,0.3)' }} />
                {section.label}
              </div>
              <ChevronDown
                className="w-3.5 h-3.5 transition-transform duration-200"
                style={{
                  transform: expanded[section.id] ? 'rotate(0deg)' : 'rotate(-90deg)',
                  color: 'rgba(250,250,250,0.2)',
                }}
              />
            </button>

            {/* Children */}
            <AnimatePresence initial={false}>
              {expanded[section.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="ml-6 border-l pl-3 py-1 space-y-0.5" style={{ borderColor: 'rgba(250,250,250,0.07)' }}>
                    {section.children.map((child) => {
                      const isActive = activeSection === child.id;
                      return (
                        <button
                          key={child.id}
                          onClick={() => { onSelect(child.id); onClose(); }}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150"
                          style={{
                            fontFamily: 'Syne, sans-serif',
                            background: isActive ? 'rgba(255,92,0,0.1)' : 'transparent',
                            color: isActive ? '#FF5C00' : 'rgba(250,250,250,0.4)',
                            borderLeft: isActive ? '2px solid #FF5C00' : '2px solid transparent',
                          }}
                        >
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 space-y-2" style={{ borderTop: '1px solid rgba(250,250,250,0.06)' }}>
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-150 w-full"
          style={{ color: 'rgba(250,250,250,0.35)', fontFamily: 'Syne, sans-serif' }}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Changelog
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-150 w-full"
          style={{ color: 'rgba(250,250,250,0.35)', fontFamily: 'Syne, sans-serif' }}
        >
          <Code2 className="w-3.5 h-3.5" />
          SDK Reference
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col sticky top-16 h-[calc(100vh-64px)] w-64 shrink-0"
        style={{ background: '#080808', borderRight: '1px solid rgba(250,250,250,0.06)' }}
      >
        {content}
      </aside>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 flex flex-col lg:hidden"
              style={{ background: '#080808', borderRight: '1px solid rgba(250,250,250,0.08)' }}
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ApiDocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{ background: '#080808', fontFamily: 'Syne, sans-serif' }}
    >
      {/* Grid dot background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(250,250,250,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      {/* Orange glow */}
      <div
        className="fixed top-40 right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,92,0,0.07) 0%, transparent 70%)' }}
      />

      <Nav />

      <div className="flex pt-16 relative z-10">
        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeSection={activeSection}
          onSelect={setActiveSection}
        />

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Docs topbar */}
          <div
            className="sticky top-16 z-30 flex items-center gap-4 px-6 lg:px-10 py-3"
            style={{
              background: 'rgba(8,8,8,0.9)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(250,250,250,0.06)',
            }}
          >
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
              style={{ background: 'rgba(250,250,250,0.05)', color: 'rgba(250,250,250,0.6)' }}
            >
              <Menu className="w-4 h-4" />
              <span className="text-xs" style={{ fontFamily: 'DM Mono, monospace' }}>Menu</span>
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs" style={{ fontFamily: 'DM Mono, monospace' }}>
              <span style={{ color: 'rgba(250,250,250,0.3)' }}>Docs</span>
              <ChevronRight className="w-3 h-3" style={{ color: 'rgba(250,250,250,0.2)' }} />
              <span style={{ color: '#FF5C00' }}>REST API</span>
            </div>

            {/* Version badge */}
            <div className="ml-auto flex items-center gap-2">
              <span
                className="px-2.5 py-1 rounded text-xs"
                style={{
                  background: 'rgba(255,92,0,0.1)',
                  color: '#FF5C00',
                  fontFamily: 'DM Mono, monospace',
                  border: '1px solid rgba(255,92,0,0.2)',
                }}
              >
                v2.0
              </span>
            </div>
          </div>

          {/* Docs body */}
          <div className="px-6 lg:px-12 xl:px-16 py-14 max-w-4xl">

            {/* ── Hero ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16"
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] animate-pulse" />
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: 'rgba(250,250,250,0.4)', fontFamily: 'DM Mono, monospace' }}
                >
                  REST API · v2.0
                </span>
              </div>
              <h1
                className="text-5xl md:text-6xl font-extrabold tracking-[-0.04em] mb-6 leading-[0.95]"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                API
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FF5C00, #FF8C40)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Documentation
                </span>
              </h1>
              <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'rgba(250,250,250,0.45)' }}>
                Everything you need to integrate NovaPay into your product. Banking-grade infrastructure, 
                developer-first design.
              </p>
            </motion.div>

            {/* ── Feature chips ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16"
            >
              {[
                { icon: Key,    label: 'API Keys',     sub: 'Secure auth' },
                { icon: Lock,   label: 'PCI Level 1',  sub: 'Certified' },
                { icon: Zap,    label: 'Real-time',    sub: 'Webhooks' },
                { icon: Globe,  label: '120+ Countries', sub: 'Global' },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="group flex flex-col items-start gap-2 p-4 rounded-xl transition-all duration-300 cursor-default"
                  style={{
                    background: '#0D0D0D',
                    border: '1px solid rgba(250,250,250,0.07)',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(255,92,0,0.1)', border: '1px solid rgba(255,92,0,0.2)' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: '#FF5C00' }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{label}</p>
                    <p className="text-xs" style={{ color: 'rgba(250,250,250,0.35)', fontFamily: 'DM Mono, monospace' }}>{sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* ── Authentication ── */}
            <motion.section
              id="authentication"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-px h-5 bg-[#FF5C00]" />
                <h2
                  className="text-2xl font-extrabold tracking-[-0.03em]"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Authentication
                </h2>
              </div>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: 'rgba(250,250,250,0.45)' }}>
                All API requests must be authenticated with your secret API key via the{' '}
                <code
                  className="px-1.5 py-0.5 rounded text-xs"
                  style={{
                    background: 'rgba(255,92,0,0.12)',
                    color: '#FF5C00',
                    fontFamily: 'DM Mono, monospace',
                    border: '1px solid rgba(255,92,0,0.2)',
                  }}
                >
                  Authorization
                </code>{' '}
                header. Never expose your secret key in client-side code.
              </p>

              {/* Warning callout */}
              <div
                className="flex gap-3 items-start p-4 rounded-xl mb-6"
                style={{ background: 'rgba(234,179,8,0.07)', border: '1px solid rgba(234,179,8,0.2)' }}
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#eab308' }} />
                <p className="text-sm" style={{ color: 'rgba(250,250,250,0.5)' }}>
                  Keep your API key secret. If compromised, rotate it immediately in the{' '}
                  <a href="#" style={{ color: '#FF5C00' }} className="underline">dashboard</a>.
                </p>
              </div>

              <CodePane
                code={`Authorization: Bearer sk_live_••••••••••••••••••••••••••••`}
                label="http"
              />
            </motion.section>

            {/* ── Base URL ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-px h-5 bg-[#FF5C00]" />
                <h2
                  className="text-2xl font-extrabold tracking-[-0.03em]"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Base URL
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { env: 'Production', url: 'https://api.novapay.io/v1', color: '#22c55e' },
                  { env: 'Sandbox', url: 'https://sandbox.novapay.io/v1', color: '#eab308' },
                ].map(({ env, url, color }) => (
                  <div
                    key={env}
                    className="flex-1 min-w-[260px] flex items-center justify-between gap-4 p-4 rounded-xl"
                    style={{ background: '#0D0D0D', border: '1px solid rgba(250,250,250,0.07)' }}
                  >
                    <div>
                      <p className="text-xs mb-1" style={{ color: 'rgba(250,250,250,0.3)', fontFamily: 'DM Mono, monospace' }}>
                        <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle" style={{ background: color }} />
                        {env}
                      </p>
                      <code className="text-sm" style={{ fontFamily: 'DM Mono, monospace', color: 'rgba(250,250,250,0.7)' }}>{url}</code>
                    </div>
                    <CopyButton code={url} />
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ── Endpoints ── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-px h-5 bg-[#FF5C00]" />
                <h2
                  className="text-2xl font-extrabold tracking-[-0.03em]"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Endpoints
                </h2>
              </div>
              <div className="space-y-5">
                {endpoints.map((ep, i) => (
                  <EndpointCard key={ep.path} endpoint={ep} index={i} />
                ))}
              </div>
            </section>

            {/* ── Webhooks ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-px h-5 bg-[#FF5C00]" />
                <h2
                  className="text-2xl font-extrabold tracking-[-0.03em]"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Webhooks
                </h2>
              </div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(250,250,250,0.45)' }}>
                NovaPay sends signed POST requests to your endpoint on key events. Verify the{' '}
                <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'rgba(255,92,0,0.12)', color: '#FF5C00', fontFamily: 'DM Mono, monospace', border: '1px solid rgba(255,92,0,0.2)' }}>
                  X-NovaPay-Signature
                </code>{' '}
                header to confirm authenticity.
              </p>

              {/* Event types */}
              <div
                className="rounded-xl overflow-hidden mb-5"
                style={{ border: '1px solid rgba(250,250,250,0.07)' }}
              >
                {[
                  { event: 'payment.succeeded', desc: 'A payment was captured successfully.' },
                  { event: 'payment.failed', desc: 'A payment attempt was declined.' },
                  { event: 'refund.created', desc: 'A refund was initiated.' },
                  { event: 'dispute.opened', desc: 'A chargeback was filed by the cardholder.' },
                ].map((e, i, arr) => (
                  <div
                    key={e.event}
                    className="flex items-start gap-4 px-5 py-3.5"
                    style={{
                      borderBottom: i < arr.length - 1 ? '1px solid rgba(250,250,250,0.05)' : 'none',
                      background: i % 2 === 0 ? 'rgba(250,250,250,0.015)' : 'transparent',
                    }}
                  >
                    <code className="text-sm shrink-0" style={{ fontFamily: 'DM Mono, monospace', color: '#FF5C00' }}>{e.event}</code>
                    <p className="text-sm" style={{ color: 'rgba(250,250,250,0.4)' }}>{e.desc}</p>
                  </div>
                ))}
              </div>

              <CodePane
                code={`{
  "id": "evt_01JXYZ1234ABCD",
  "type": "payment.succeeded",
  "created_at": "2025-01-15T14:32:07Z",
  "data": {
    "payment_id": "pay_01HZXK9Q8V2G3N4",
    "amount": 4999,
    "currency": "usd"
  }
}`}
                label="json · webhook payload"
              />
            </motion.section>

            {/* ── Error Codes ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-px h-5 bg-[#FF5C00]" />
                <h2
                  className="text-2xl font-extrabold tracking-[-0.03em]"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Error Codes
                </h2>
              </div>
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid rgba(250,250,250,0.07)' }}
              >
                <div
                  className="grid grid-cols-[70px_180px_1fr] px-5 py-2.5 text-xs uppercase tracking-widest"
                  style={{
                    borderBottom: '1px solid rgba(250,250,250,0.07)',
                    background: 'rgba(250,250,250,0.03)',
                    color: 'rgba(250,250,250,0.25)',
                    fontFamily: 'DM Mono, monospace',
                  }}
                >
                  <span>Code</span>
                  <span>Error</span>
                  <span>Description</span>
                </div>
                {errorCodes.map((e, i) => (
                  <div
                    key={e.code}
                    className="grid grid-cols-[70px_180px_1fr] px-5 py-3.5 text-sm items-start"
                    style={{
                      borderBottom: i < errorCodes.length - 1 ? '1px solid rgba(250,250,250,0.05)' : 'none',
                      background: i % 2 === 0 ? 'transparent' : 'rgba(250,250,250,0.015)',
                    }}
                  >
                    <span
                      className="font-bold"
                      style={{ color: parseInt(e.code) >= 500 ? '#ef4444' : parseInt(e.code) >= 400 ? '#eab308' : '#22c55e', fontFamily: 'DM Mono, monospace' }}
                    >
                      {e.code}
                    </span>
                    <code style={{ fontFamily: 'DM Mono, monospace', color: 'rgba(250,250,250,0.5)', fontSize: '12px' }}>{e.name}</code>
                    <span style={{ color: 'rgba(250,250,250,0.4)' }}>{e.desc}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ── Rate Limits ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-px h-5 bg-[#FF5C00]" />
                <h2
                  className="text-2xl font-extrabold tracking-[-0.03em]"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Rate Limits
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                {[
                  { plan: 'Sandbox', limit: '100 req/min', color: 'rgba(250,250,250,0.07)' },
                  { plan: 'Starter', limit: '500 req/min', color: 'rgba(255,92,0,0.08)' },
                  { plan: 'Scale', limit: 'Unlimited', color: 'rgba(34,197,94,0.07)' },
                ].map(({ plan, limit, color }) => (
                  <div
                    key={plan}
                    className="p-5 rounded-xl"
                    style={{ background: color, border: '1px solid rgba(250,250,250,0.07)' }}
                  >
                    <p className="text-xs mb-2" style={{ color: 'rgba(250,250,250,0.3)', fontFamily: 'DM Mono, monospace' }}>{plan}</p>
                    <p className="text-2xl font-extrabold" style={{ fontFamily: 'Syne, sans-serif', color: 'rgba(250,250,250,0.9)' }}>{limit}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs" style={{ color: 'rgba(250,250,250,0.3)', fontFamily: 'DM Mono, monospace' }}>
                Rate limit headers: <span style={{ color: '#FF5C00' }}>X-RateLimit-Limit</span>, <span style={{ color: '#FF5C00' }}>X-RateLimit-Remaining</span>, <span style={{ color: '#FF5C00' }}>X-RateLimit-Reset</span>
              </p>
            </motion.section>

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl p-10 text-center overflow-hidden"
              style={{ background: '#0A0A0A', border: '1px solid rgba(255,92,0,0.2)' }}
            >
              {/* Glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,92,0,0.12) 0%, transparent 70%)' }}
              />
              <div
                className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,92,0,0.07) 0%, transparent 70%)' }}
              />

              <div className="relative z-10">
                <p
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: 'rgba(250,250,250,0.3)', fontFamily: 'DM Mono, monospace' }}
                >
                  Ready to build?
                </p>
                <h2
                  className="text-4xl font-extrabold tracking-[-0.04em] mb-4 leading-[1]"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Your first payment
                  <br />
                  in{' '}
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
                <p className="mb-8 text-sm" style={{ color: 'rgba(250,250,250,0.4)' }}>
                  Free sandbox. No credit card. Full API access from day one.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200"
                    style={{
                      background: '#FF5C00',
                      color: '#000',
                      fontFamily: 'Syne, sans-serif',
                    }}
                  >
                    Get API Key
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200"
                    style={{
                      background: 'rgba(250,250,250,0.06)',
                      color: 'rgba(250,250,250,0.7)',
                      border: '1px solid rgba(250,250,250,0.1)',
                      fontFamily: 'Syne, sans-serif',
                    }}
                  >
                    <Terminal className="w-4 h-4" />
                    Try in Sandbox
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}