import React, { useState, useMemo } from 'react';
import { formatINR, formatINRCompact } from 'india-formatter';
import {
  Coins,
  Sparkles,
  Copy,
  Check,
  Code2,
  Sliders,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

interface CurrencyTabProps {
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export const CurrencyTab: React.FC<CurrencyTabProps> = ({ onCopy, copiedKey }) => {
  const [currencyAmount, setCurrencyAmount] = useState<number>(1234567.89);
  const [showSymbol, setShowSymbol] = useState<boolean>(true);
  const [currencySymbol, setCurrencySymbol] = useState<string>('₹');
  const [decimals, setDecimals] = useState<number>(2);
  const [compactShowSymbol, setCompactShowSymbol] = useState<boolean>(true);

  // Formatted results
  const standardResult = useMemo(() => {
    try {
      return formatINR(currencyAmount, {
        showSymbol,
        symbol: currencySymbol,
        decimals,
      });
    } catch {
      return 'Invalid input';
    }
  }, [currencyAmount, showSymbol, currencySymbol, decimals]);

  const compactResult = useMemo(() => {
    try {
      return formatINRCompact(currencyAmount, compactShowSymbol);
    } catch {
      return 'Invalid input';
    }
  }, [currencyAmount, compactShowSymbol]);

  // Code snippet
  const generatedCode = useMemo(() => {
    const opts = [];
    if (!showSymbol) opts.push(`showSymbol: false`);
    if (currencySymbol !== '₹') opts.push(`symbol: '${currencySymbol}'`);
    if (decimals !== 2) opts.push(`decimals: ${decimals}`);

    const optionsStr = opts.length > 0 ? `, { ${opts.join(', ')} }` : '';
    return `import { formatINR, formatINRCompact } from 'india-formatter';

// Standard Indian Rupee Format
const formatted = formatINR(${currencyAmount}${optionsStr});
// => "${standardResult}"

// Compact Human Notation (K, Lakh, Crore)
const compact = formatINRCompact(${currencyAmount}${compactShowSymbol ? '' : ', false'});
// => "${compactResult}"`;
  }, [currencyAmount, showSymbol, currencySymbol, decimals, standardResult, compactShowSymbol, compactResult]);

  // Indian Grouping Visualizer logic
  const groupingBreakdown = useMemo(() => {
    const abs = Math.abs(currencyAmount);
    const parts = abs.toFixed(decimals).split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];

    if (integerPart.length <= 3) {
      return [
        { label: 'Hundreds & Units', value: integerPart, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
      ];
    }

    const lastThree = integerPart.slice(-3);
    const remaining = integerPart.slice(0, -3);
    const pairs: string[] = [];

    for (let i = remaining.length; i > 0; i -= 2) {
      const start = Math.max(0, i - 2);
      pairs.unshift(remaining.slice(start, i));
    }

    const labels = ['Crores+', 'Crores', 'Lakhs', 'Thousands'].slice(-pairs.length);

    const blocks = pairs.map((val, idx) => ({
      label: labels[idx] || 'Higher Order',
      value: val,
      color: idx % 2 === 0 ? 'text-orange-400 border-orange-500/30 bg-orange-500/10' : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    }));

    blocks.push({
      label: 'Hundreds & Units',
      value: lastThree,
      color: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    });

    if (decimalPart !== undefined) {
      blocks.push({
        label: 'Paise',
        value: `.${decimalPart}`,
        color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      });
    }

    return blocks;
  }, [currencyAmount, decimals]);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-orange-400" />
              Indian Rupee (INR) Formatter
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Converts standard numerical figures to the authentic Indian numbering system with Lakhs and Crores grouping (<code className="text-orange-300">₹12,34,567.89</code>) and compact human notation (<code className="text-amber-300">₹15 Lakh</code>, <code className="text-amber-300">₹2.5 Crore</code>).
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full font-mono font-semibold">
              formatINR() & formatINRCompact()
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-orange-400" />
              Interactive Parameters
            </span>
            <button
              onClick={() => {
                setCurrencyAmount(1234567.89);
                setShowSymbol(true);
                setCurrencySymbol('₹');
                setDecimals(2);
                setCompactShowSymbol(true);
              }}
              className="text-xs text-slate-400 hover:text-white transition"
            >
              Reset Defaults
            </button>
          </div>

          {/* Amount input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Amount Value</span>
              <span className="text-slate-500 font-normal">Accepts positive, negative & decimals</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-base">
                {currencySymbol}
              </span>
              <input
                type="number"
                step="any"
                value={Number.isNaN(currencyAmount) ? '' : currencyAmount}
                onChange={(e) => setCurrencyAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-lg font-semibold text-white focus:outline-none focus:border-orange-500 transition shadow-inner font-mono"
                placeholder="Enter numerical amount..."
              />
            </div>
          </div>

          {/* Quick preset chips */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400">Indian Commerce Quick Presets:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '₹500 (UPI)', val: 500 },
                { label: '₹10,000 (Monthly)', val: 10000 },
                { label: '₹1.5 Lakh (80C Limit)', val: 150000 },
                { label: '₹12.34 Lakh', val: 1234567.89 },
                { label: '₹50 Lakh (Startup)', val: 5000000 },
                { label: '₹2.5 Crore (Funding)', val: 25000000 },
                { label: '₹100 Cr (Unicorn)', val: 1000000000 },
                { label: '-₹15,000 (Refund)', val: -15000 },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => setCurrencyAmount(p.val)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition ${
                    currencyAmount === p.val
                      ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-semibold'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="pt-4 border-t border-slate-800 space-y-5">
            {/* Show symbol */}
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="showSymbol" className="text-sm font-medium text-slate-200 cursor-pointer">
                  Show Currency Symbol
                </label>
                <p className="text-xs text-slate-400">Toggle whether prefix symbol should be displayed</p>
              </div>
              <input
                type="checkbox"
                id="showSymbol"
                checked={showSymbol}
                onChange={(e) => setShowSymbol(e.target.checked)}
                className="w-5 h-5 rounded accent-orange-500 cursor-pointer"
              />
            </div>

            {/* Currency Symbol Choice */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Currency Symbol / Prefix
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {['₹', 'Rs. ', 'INR '].map((sym) => (
                  <button
                    key={sym}
                    onClick={() => setCurrencySymbol(sym)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition font-mono ${
                      currencySymbol === sym
                        ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-semibold'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sym.trim() || 'Custom'}
                  </button>
                ))}
                <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1">
                  <span className="text-[11px] text-slate-500">Custom:</span>
                  <input
                    type="text"
                    value={currencySymbol}
                    onChange={(e) => setCurrencySymbol(e.target.value)}
                    className="w-16 bg-transparent text-xs text-center text-white focus:outline-none font-mono"
                    placeholder="sym"
                  />
                </div>
              </div>
            </div>

            {/* Decimals control */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Decimal Precision (Paise)</span>
                <span className="font-mono text-orange-400 font-semibold">{decimals} decimal{decimals !== 1 ? 's' : ''}</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={decimals}
                onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>0 (No paise)</span>
                <span>1</span>
                <span>2 (Standard INR)</span>
                <span>3</span>
                <span>4</span>
              </div>
            </div>

            {/* Compact Symbol Toggle */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-sm font-medium text-slate-200">
                  Include Symbol in Compact Mode
                </span>
                <p className="text-xs text-slate-400">Controls the second argument of <code className="text-slate-300">formatINRCompact()</code></p>
              </div>
              <input
                type="checkbox"
                checked={compactShowSymbol}
                onChange={(e) => setCompactShowSymbol(e.target.checked)}
                className="w-5 h-5 rounded accent-orange-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Live Results Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Primary Result Box */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-orange-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-orange-400 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" />
                Standard Indian Grouping
              </span>
              <button
                onClick={() => onCopy(standardResult, 'curr-std')}
                className="flex items-center gap-1.5 text-xs bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 transition"
              >
                {copiedKey === 'curr-std' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedKey === 'curr-std' ? 'Copied' : 'Copy Result'}</span>
              </button>
            </div>

            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight break-all font-mono py-3">
              {standardResult}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Rule Breakdown:</span>
              <span className="font-semibold text-slate-300">First 3 digits, then pairs of 2</span>
            </div>
          </div>

          {/* Visual Digit Decomposition Pill */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                Grouping Decomposition Visualizer
              </span>
              <span className="text-[11px] text-slate-500 font-mono">3, 2, 2 structure</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {groupingBreakdown.map((blk, idx) => (
                <div
                  key={idx}
                  className={`border rounded-xl px-3 py-2 text-center transition ${blk.color}`}
                >
                  <div className="text-base font-black font-mono">{blk.value}</div>
                  <div className="text-[10px] uppercase tracking-wider opacity-80">{blk.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Compact Notation Result */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs uppercase font-bold tracking-wider text-slate-300">
                  Compact Human Notation (K, Lakh, Crore)
                </span>
              </div>
              <button
                onClick={() => onCopy(compactResult, 'curr-compact')}
                className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 transition"
              >
                {copiedKey === 'curr-compact' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedKey === 'curr-compact' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="text-2xl sm:text-3xl font-bold text-amber-300 font-mono py-1">
              {compactResult}
            </div>

            <p className="text-xs text-slate-400">
              Ideal for dashboards, metrics, SaaS pricing, and analytics where compact space is required.
            </p>
          </div>

          {/* Live Code Preview */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-900">
              <span className="flex items-center gap-1.5 font-semibold text-slate-400">
                <Code2 className="w-3.5 h-3.5 text-orange-400" />
                Live TypeScript Code
              </span>
              <button
                onClick={() => onCopy(generatedCode, 'curr-code')}
                className="hover:text-white text-slate-400 transition"
              >
                {copiedKey === 'curr-code' ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Copied
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy Code
                  </span>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto text-slate-300 text-[11px] leading-relaxed pt-1">
              {generatedCode}
            </pre>
          </div>
        </div>
      </div>

      {/* Pro-Tip Alert Banner */}
      <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-500/20 flex items-start gap-3 text-xs text-orange-200/90">
        <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-orange-300">Why not just use Intl.NumberFormat?</strong> Modern browsers support <code className="bg-orange-950/40 px-1 py-0.5 rounded text-orange-300 font-mono">Intl.NumberFormat('en-IN')</code>, but Edge runtimes (Cloudflare Workers, older Node versions) frequently produce inconsistent results, fail to format custom prefixes cleanly, and lack compact "Lakh" and "Crore" notation altogether. <code className="font-semibold text-white">india-formatter</code> guarantees deterministic, identical output across all JS runtimes.
        </div>
      </div>
    </div>
  );
};

