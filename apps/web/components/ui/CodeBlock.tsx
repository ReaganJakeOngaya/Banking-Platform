'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language = 'bash', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Copied!', {
      style: {
        background: '#1A1A1A',
        color: '#FAFAFA',
        border: '1px solid rgba(250,250,250,0.1)',
        fontFamily: 'Syne, sans-serif',
      },
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{ background: '#0D0D0D', border: '1px solid rgba(250,250,250,0.08)' }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(250,250,250,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
          {title && (
            <span
              className="text-xs text-white/30 ml-2"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              {title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{
              background: 'rgba(255,92,0,0.1)',
              color: '#FF5C00',
              fontFamily: 'DM Mono, monospace',
            }}
          >
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded transition-colors hover:bg-white/[0.06]"
            aria-label="Copy code"
          >
            <motion.div
              key={copied ? 'check' : 'copy'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              {copied
                ? <Check className="w-3.5 h-3.5 text-green-400" />
                : <Copy className="w-3.5 h-3.5 text-white/30" />
              }
            </motion.div>
          </button>
        </div>
      </div>

      {/* Code content */}
      <pre className="p-5 overflow-x-auto text-sm leading-relaxed"
           style={{ fontFamily: 'DM Mono, monospace' }}>
        <code className="text-white/65">{code}</code>
      </pre>
    </div>
  );
}