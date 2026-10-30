import React, { useState } from 'react';
import {
  HelpCircle,
  Zap,
  ShieldCheck,
  Package,
  Layers,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  ExternalLink,
  Cpu,
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/constants';

export const WhyAndBenchmarksTab: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const comparisonFeatures = [
    {
      feature: 'Indian Lakhs & Crores (3,2,2) Grouping',
      pkg: true,
      intl: true,
      numeral: false,
      accounting: false,
      n2w: false,
    },
    {
      feature: 'Compact Notation ("₹15 Lakh", "₹2.5 Cr")',
      pkg: true,
      intl: 'Partial',
      numeral: false,
      accounting: false,
      n2w: false,
    },
    {
      feature: 'Indian Cheque Words ("...Rupees & Fifty Paise Only")',
      pkg: true,
      intl: false,
      numeral: false,
      accounting: false,
      n2w: 'Western (Mil/Bil)',
    },
    {
      feature: 'Income Tax PAN Validation (Strict 4th Char)',
      pkg: true,
      intl: false,
      numeral: false,
      accounting: false,
      n2w: false,
    },
    {
      feature: 'GSTIN Validation & State Resolution',
      pkg: true,
      intl: false,
      numeral: false,
      accounting: false,
      n2w: false,
    },
    {
      feature: 'Indian Mobile Phone Validation (+91/0)',
      pkg: true,
      intl: false,
      numeral: false,
      accounting: false,
      n2w: false,
    },
    {
      feature: 'Edge / Cloudflare Workers Guaranteed',
      pkg: true,
      intl: 'Flaky',
      numeral: true,
      accounting: true,
      n2w: true,
    },
    {
      feature: 'Bundle Size (Gzipped)',
      pkg: '< 3 KB',
      intl: 'Native',
      numeral: '~15 KB',
      accounting: '~18 KB',
      n2w: '~12 KB',
    },
    {
      feature: 'Zero Dependencies',
      pkg: true,
      intl: true,
      numeral: true,
      accounting: true,
      n2w: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-rose-400" />
              Why india-formatter? & Performance Benchmarks
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Built specifically to solve the headaches of Indian commerce, fintech compliance, and cross-runtime inconsistencies without importing heavy legacy libraries.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full font-mono font-semibold">
              Ultra Lightweight &lt; 3 KB
            </span>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Zero Dependencies</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Pure native TypeScript algorithms with 0 external dependencies. No supply chain vulnerability vectors, no transitive dependency bloat, and no node-gyp build steps.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Under 3 KB Gzipped</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ships as dual ESM and CommonJS bundles with <code className="text-slate-300">sideEffects: false</code> for optimal tree-shaking in modern bundlers like Vite, Next.js, and esbuild.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Universal Runtime</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Runs seamlessly in browser DOM, Node.js servers, Next.js Server Actions, Cloudflare Edge Workers, Vercel Edge Middleware, Supabase functions, Deno, and Bun.
          </p>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-400" />
            Ecosystem Comparison Matrix
          </h3>
          <span className="text-xs text-slate-400">How it compares against alternative tools</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-mono text-[11px]">
                <th className="py-3 px-3">Capability</th>
                <th className="py-3 px-3 text-orange-400 bg-orange-500/5 font-bold">india-formatter</th>
                <th className="py-3 px-3 text-slate-300">Intl.NumberFormat</th>
                <th className="py-3 px-3 text-slate-400">numeral.js</th>
                <th className="py-3 px-3 text-slate-400">accounting.js</th>
                <th className="py-3 px-3 text-slate-400">number-to-words</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {comparisonFeatures.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-sans font-medium text-slate-200">
                    {row.feature}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-orange-300 bg-orange-500/5">
                    {typeof row.pkg === 'boolean' ? (
                      row.pkg ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-rose-400 inline" />
                    ) : (
                      row.pkg
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">
                    {typeof row.intl === 'boolean' ? (
                      row.intl ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-rose-400 inline" />
                    ) : (
                      row.intl
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">
                    {typeof row.numeral === 'boolean' ? (
                      row.numeral ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-rose-400 inline" />
                    ) : (
                      row.numeral
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">
                    {typeof row.accounting === 'boolean' ? (
                      row.accounting ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-rose-400 inline" />
                    ) : (
                      row.accounting
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">
                    {typeof row.n2w === 'boolean' ? (
                      row.n2w ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-rose-400 inline" />
                    ) : (
                      row.n2w
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-rose-400" />
          Frequently Asked Questions (FAQ)
        </h3>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-white hover:text-orange-300 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

