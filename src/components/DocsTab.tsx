import React, { useState } from 'react';
import {
  BookOpen,
  Code2,
  Copy,
  Check,
  Terminal,
  Server,
  Cpu,
  Layers,
} from 'lucide-react';

interface DocsTabProps {
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export const DocsTab: React.FC<DocsTabProps> = ({ onCopy, copiedKey }) => {
  const [activeGuide, setActiveGuide] = useState<'nextjs' | 'node' | 'edge' | 'react'>('nextjs');

  const tsDefinitions = `// Full TypeScript Definitions for 'india-formatter'
export interface INROptions {
  showSymbol?: boolean; // Default: true
  symbol?: string;      // Default: '₹'
  decimals?: number;    // Default: 2
}

export interface WordOptions {
  showOnly?: boolean;   // Default: true (Appends "Only")
}

export interface FormatIndianNumberOptions {
  decimals?: number;    // Number of decimal places
}

export interface PANOptions {
  strict?: boolean;     // Validates 4th character legal entity [ABCFGHLJPT]
}

// Exported Core Functions
export function formatINR(amount: number, options?: INROptions): string;
export function formatINRCompact(amount: number, showSymbol?: boolean): string;
export function formatIndianNumber(amount: number | string, options?: number | FormatIndianNumberOptions): string;
export function toWordsINR(amount: number, options?: WordOptions): string;
export function isValidPAN(pan: string, options?: PANOptions): boolean;
export function isValidGSTIN(gstin: string): boolean;
export function isValidIndianPhone(phone: string): boolean;`;

  const apiFunctions = [
    {
      name: 'formatINR(amount, options?)',
      tag: 'Currency',
      color: 'text-orange-400',
      summary: 'Formats numbers into standard Indian Rupee currency with authentic Lakhs and Crores grouping.',
      params: [
        { name: 'amount', type: 'number', default: 'Required', desc: 'Numerical value to format (e.g. 1234567.89).' },
        { name: 'options.showSymbol', type: 'boolean', default: 'true', desc: 'Whether to prefix currency symbol.' },
        { name: 'options.symbol', type: 'string', default: "'₹'", desc: "Custom symbol string (e.g. 'Rs. ', 'INR ')." },
        { name: 'options.decimals', type: 'number', default: '2', desc: 'Number of decimal paise places (0 - 4).' },
      ],
      returns: 'string - Formatted INR string (e.g. "₹12,34,567.89")',
      example: `import { formatINR } from 'india-formatter';

formatINR(1234567.89);
// => "₹12,34,567.89"

formatINR(150000, { decimals: 0 });
// => "₹1,50,000"

formatINR(500, { showSymbol: false });
// => "500.00"

formatINR(2500000, { symbol: 'Rs. ' });
// => "Rs. 25,00,000.00"`,
    },
    {
      name: 'formatINRCompact(amount, showSymbol?)',
      tag: 'Currency',
      color: 'text-amber-400',
      summary: 'Converts large amounts to compact human-readable Indian notations (K, Lakh, Crore).',
      params: [
        { name: 'amount', type: 'number', default: 'Required', desc: 'Numerical value to format compactly.' },
        { name: 'showSymbol', type: 'boolean', default: 'true', desc: 'Whether to include ₹ prefix symbol.' },
      ],
      returns: 'string - Compact notation (e.g. "₹15 Lakh", "₹2.5 Crore")',
      example: `import { formatINRCompact } from 'india-formatter';

formatINRCompact(1500);       // => "₹1.5 K"
formatINRCompact(1500000);    // => "₹15 Lakh"
formatINRCompact(25000000);   // => "₹2.5 Crore"
formatINRCompact(1500000, false); // => "15 Lakh"`,
    },
    {
      name: 'toWordsINR(amount, options?)',
      tag: 'Words',
      color: 'text-emerald-400',
      summary: 'Converts numerical amounts to Indian English words with Lakhs, Crores, and Paise handling.',
      params: [
        { name: 'amount', type: 'number', default: 'Required', desc: 'Amount to convert to words.' },
        { name: 'options.showOnly', type: 'boolean', default: 'true', desc: 'Appends "Only" suffix for cheque security.' },
      ],
      returns: 'string - Currency in words (e.g. "Ten Thousand Five Hundred Rupees and Fifty Paise Only")',
      example: `import { toWordsINR } from 'india-formatter';

toWordsINR(125000);
// => "One Lakh Twenty Five Thousand Rupees Only"

toWordsINR(10500.50);
// => "Ten Thousand Five Hundred Rupees and Fifty Paise Only"

toWordsINR(500, { showOnly: false });
// => "Five Hundred Rupees"

toWordsINR(0);
// => "Zero Rupees Only"`,
    },
    {
      name: 'formatIndianNumber(amount, options?)',
      tag: 'Numbers',
      color: 'text-sky-400',
      summary: 'Groups raw numbers with Indian comma separation without currency symbols.',
      params: [
        { name: 'amount', type: 'number | string', default: 'Required', desc: 'Raw number or numerical string.' },
        { name: 'options', type: 'number | { decimals?: number }', default: 'undefined', desc: 'Decimal precision.' },
      ],
      returns: 'string - Separated number string (e.g. "12,34,567.89")',
      example: `import { formatIndianNumber } from 'india-formatter';

formatIndianNumber(1234567);
// => "12,34,567"

formatIndianNumber(1234567.89);
// => "12,34,567.89"

formatIndianNumber(1234567, 2);
// => "12,34,567.00"`,
    },
    {
      name: 'isValidPAN(pan, options?)',
      tag: 'Validators',
      color: 'text-purple-400',
      summary: 'Validates 10-character Indian Permanent Account Number (PAN) issued by Income Tax Department.',
      params: [
        { name: 'pan', type: 'string', default: 'Required', desc: '10-character alphanumeric PAN.' },
        { name: 'options.strict', type: 'boolean', default: 'false', desc: 'Checks 4th char legal entity [ABCFGHLJPT].' },
      ],
      returns: 'boolean - true if valid PAN',
      example: `import { isValidPAN } from 'india-formatter';

isValidPAN('ABCPE1234F'); // => true
isValidPAN('12345ABCDE'); // => false

// Strict mode checks 4th character legal entity
isValidPAN('ABCPE1234F', { strict: true }); // => true (Person)
isValidPAN('ABCDE1234F', { strict: true }); // => false ('D' is not an entity)`,
    },
    {
      name: 'isValidGSTIN(gstin)',
      tag: 'Validators',
      color: 'text-emerald-400',
      summary: 'Validates 15-character Goods and Services Tax Identification Number (GSTIN).',
      params: [
        { name: 'gstin', type: 'string', default: 'Required', desc: '15-character GSTIN string.' },
      ],
      returns: 'boolean - true if valid GSTIN structure',
      example: `import { isValidGSTIN } from 'india-formatter';

isValidGSTIN('27ABCDE1234F1Z5'); // => true
isValidGSTIN('07AAAAA0000A1Z5'); // => true
isValidGSTIN('invalid-gst');    // => false`,
    },
    {
      name: 'isValidIndianPhone(phone)',
      tag: 'Validators',
      color: 'text-amber-400',
      summary: 'Validates 10-digit Indian Mobile Numbers with optional +91, 91, or 0 prefixes.',
      params: [
        { name: 'phone', type: 'string', default: 'Required', desc: 'Mobile number string with optional formatting.' },
      ],
      returns: 'boolean - true if starts with 6, 7, 8, or 9 and has 10 digits',
      example: `import { isValidIndianPhone } from 'india-formatter';

isValidIndianPhone('+91 98765 43210'); // => true
isValidIndianPhone('9876543210');       // => true
isValidIndianPhone('09876543210');      // => true
isValidIndianPhone('1234567890');       // => false`,
    },
  ];

  const frameworkGuides = {
    nextjs: `// Next.js (App Router - Server & Client Components)
// app/invoices/[id]/page.tsx

import { formatINR, toWordsINR } from 'india-formatter';

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const invoice = await getInvoice(params.id);

  return (
    <div>
      <h1>Invoice #{invoice.id}</h1>
      <p>Amount: {formatINR(invoice.totalAmount)}</p>
      <p>In Words: {toWordsINR(invoice.totalAmount)}</p>
    </div>
  );
}`,
    node: `// Node.js & Express / Fastify Backend
// src/routes/payments.ts

import { formatINR, isValidPAN, isValidGSTIN } from 'india-formatter';
import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/checkout', (req, res) => {
  const { pan, gstin, amount } = req.body;

  if (pan && !isValidPAN(pan, { strict: true })) {
    return res.status(400).json({ error: 'Invalid Director PAN' });
  }

  if (gstin && !isValidGSTIN(gstin)) {
    return res.status(400).json({ error: 'Invalid GSTIN Number' });
  }

  return res.json({
    success: true,
    displayAmount: formatINR(amount),
  });
});`,
    edge: `// Cloudflare Workers / Vercel Edge Middleware
// src/index.ts

import { formatINRCompact, isValidIndianPhone } from 'india-formatter';

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const phone = url.searchParams.get('phone') || '';

    if (!isValidIndianPhone(phone)) {
      return new Response('Invalid Indian Mobile Number', { status: 400 });
    }

    return new Response(
      JSON.stringify({
        status: 'OK',
        metric: formatINRCompact(15000000), // "₹1.5 Crore"
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  },
};`,
    react: `// React 19 / Vite Frontend Component
// src/components/OrderSummary.tsx

import React from 'react';
import { formatINR, toWordsINR } from 'india-formatter';

export function OrderSummary({ total }: { total: number }) {
  return (
    <div className="order-card">
      <h3>Total Payable</h3>
      <span className="price">{formatINR(total)}</span>
      <p className="words">{toWordsINR(total)}</p>
    </div>
  );
}`,
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Complete API Reference & Framework Guides
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Exhaustive documentation for all exports, parameters, return types, and copy-paste integration snippets for Next.js, Node.js, and Cloudflare Workers.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-mono font-semibold">
              TypeScript v5.4+ First Class
            </span>
          </div>
        </div>
      </div>

      {/* TypeScript Definitions Code Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Full TypeScript Declaration File (`index.d.ts`)</h3>
          </div>
          <button
            onClick={() => onCopy(tsDefinitions, 'ts-defs')}
            className="text-xs flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            {copiedKey === 'ts-defs' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Types</span>
          </button>
        </div>
        <pre className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto border border-slate-800/80 leading-relaxed">
          {tsDefinitions}
        </pre>
      </div>

      {/* Framework Integration Guides */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-400" />
              Framework Integration Guides
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Works everywhere without polyfills or build flags.</p>
          </div>

          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold gap-1">
            <button
              onClick={() => setActiveGuide('nextjs')}
              className={`px-2.5 py-1 rounded-lg transition ${activeGuide === 'nextjs' ? 'bg-orange-500/20 text-orange-300' : 'text-slate-400 hover:text-white'}`}
            >
              Next.js
            </button>
            <button
              onClick={() => setActiveGuide('node')}
              className={`px-2.5 py-1 rounded-lg transition ${activeGuide === 'node' ? 'bg-orange-500/20 text-orange-300' : 'text-slate-400 hover:text-white'}`}
            >
              Node / Express
            </button>
            <button
              onClick={() => setActiveGuide('edge')}
              className={`px-2.5 py-1 rounded-lg transition ${activeGuide === 'edge' ? 'bg-orange-500/20 text-orange-300' : 'text-slate-400 hover:text-white'}`}
            >
              Cloudflare Edge
            </button>
            <button
              onClick={() => setActiveGuide('react')}
              className={`px-2.5 py-1 rounded-lg transition ${activeGuide === 'react' ? 'bg-orange-500/20 text-orange-300' : 'text-slate-400 hover:text-white'}`}
            >
              React / Vite
            </button>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => onCopy(frameworkGuides[activeGuide], 'guide-code')}
            className="absolute top-3 right-3 text-xs flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-700 transition z-10"
          >
            {copiedKey === 'guide-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy</span>
          </button>
          <pre className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto border border-slate-800/80 leading-relaxed pt-5">
            {frameworkGuides[activeGuide]}
          </pre>
        </div>
      </div>

      {/* API Reference Cards */}
      <div className="space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          Function-by-Function API Documentation
        </h3>

        <div className="grid grid-cols-1 gap-6">
          {apiFunctions.map((fn, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className={`font-mono text-base font-bold ${fn.color}`}>
                    {fn.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">
                    {fn.tag}
                  </span>
                </div>
                <button
                  onClick={() => onCopy(fn.example, `api-fn-${idx}`)}
                  className="self-start sm:self-auto text-xs flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 transition"
                >
                  {copiedKey === `api-fn-${idx}` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy Snippet</span>
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{fn.summary}</p>

              {/* Params Table */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Parameters
                </span>
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                        <th className="py-2 px-3">Name</th>
                        <th className="py-2 px-3">Type</th>
                        <th className="py-2 px-3">Default</th>
                        <th className="py-2 px-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {fn.params.map((p, pIdx) => (
                        <tr key={pIdx}>
                          <td className="py-2 px-3 font-bold text-slate-200">{p.name}</td>
                          <td className="py-2 px-3 text-amber-400">{p.type}</td>
                          <td className="py-2 px-3 text-slate-400">{p.default}</td>
                          <td className="py-2 px-3 font-sans text-slate-300">{p.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Return value */}
              <div className="text-xs">
                <span className="font-bold text-slate-400">Returns: </span>
                <span className="font-mono text-emerald-400">{fn.returns}</span>
              </div>

              {/* Code Example */}
              <pre className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto border border-slate-800/80 leading-relaxed">
                {fn.example}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

