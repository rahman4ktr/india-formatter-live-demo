import React, { useState, useMemo } from 'react';
import { formatIndianNumber } from 'india-formatter';
import {
  Binary,
  Copy,
  Check,
  Code2,
  Table,
  Sliders,
  Globe2,
  Info,
} from 'lucide-react';
import { NUMBER_SYSTEM_COMPARISON } from '../data/constants';

interface NumbersTabProps {
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export const NumbersTab: React.FC<NumbersTabProps> = ({ onCopy, copiedKey }) => {
  const [pureNumber, setPureNumber] = useState<number>(987654321);
  const [pureDecimals, setPureDecimals] = useState<number>(0);

  const formattedIndian = useMemo(() => {
    try {
      return formatIndianNumber(pureNumber, { decimals: pureDecimals });
    } catch {
      return 'Invalid number';
    }
  }, [pureNumber, pureDecimals]);

  const formattedWestern = useMemo(() => {
    try {
      return pureNumber.toLocaleString('en-US', {
        minimumFractionDigits: pureDecimals,
        maximumFractionDigits: pureDecimals,
      });
    } catch {
      return 'Invalid number';
    }
  }, [pureNumber, pureDecimals]);

  const generatedCode = `import { formatIndianNumber } from 'india-formatter';

const separated = formatIndianNumber(${pureNumber}, { decimals: ${pureDecimals} });
// => "${formattedIndian}"`;

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Binary className="w-5 h-5 text-sky-400" />
              Pure Indian Number Separation
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Formats plain numerical amounts or metric statistics with authentic Indian comma groupings (without currency symbols) for data tables, analytics, census counts, and government reporting.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full font-mono font-semibold">
              formatIndianNumber()
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              Number Controls
            </span>
            <button
              onClick={() => {
                setPureNumber(987654321);
                setPureDecimals(0);
              }}
              className="text-xs text-slate-400 hover:text-white transition"
            >
              Reset
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Raw Numerical Value
            </label>
            <input
              type="number"
              step="any"
              value={Number.isNaN(pureNumber) ? '' : pureNumber}
              onChange={(e) => setPureNumber(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-lg font-semibold text-white focus:outline-none focus:border-sky-500 transition font-mono shadow-inner"
              placeholder="Enter number..."
            />
          </div>

          {/* Quick presets */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400">Quick Test Numbers:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '1 Lakh', val: 100000 },
                { label: '10 Lakh (Million)', val: 1000000 },
                { label: '12,34,567', val: 1234567 },
                { label: '1 Crore (10M)', val: 10000000 },
                { label: '98.76 Cr', val: 987654321 },
                { label: '1 Arab (Billion)', val: 1000000000 },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => setPureNumber(p.val)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition ${
                    pureNumber === p.val
                      ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-semibold'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Decimals control */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-sm text-slate-300">
              <span>Decimals</span>
              <span className="font-mono text-sky-400 font-semibold">{pureDecimals}</span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              value={pureDecimals}
              onChange={(e) => setPureDecimals(parseInt(e.target.value, 10))}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>0 (Whole)</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>
          </div>

          {/* Code snippet */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-900">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Code2 className="w-3.5 h-3.5 text-sky-400" />
                Pure Number Code
              </span>
              <button
                onClick={() => onCopy(generatedCode, 'num-code')}
                className="hover:text-white text-slate-400"
              >
                {copiedKey === 'num-code' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <pre className="overflow-x-auto text-[11px] leading-relaxed pt-1 text-slate-300">
              {generatedCode}
            </pre>
          </div>
        </div>

        {/* Comparison Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Side by side comparison cards */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-sky-400" />
                System Grouping Comparison
              </h3>
              <span className="text-xs text-slate-400">Indian vs International</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Indian System */}
              <div className="p-5 rounded-xl bg-sky-950/30 border border-sky-500/40 space-y-2 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1">
                    🇮🇳 Indian System
                  </span>
                  <button
                    onClick={() => onCopy(formattedIndian, 'num-in-res')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedKey === 'num-in-res' ? (
                      <Check className="w-3.5 h-3.5 text-sky-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-sky-200 break-all py-1">
                  {formattedIndian}
                </div>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-sky-900/40">
                  Rule: <strong className="text-slate-200">3, 2, 2, 2</strong> grouping
                </div>
              </div>

              {/* International Western System */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    🌐 Western / US
                  </span>
                  <button
                    onClick={() => onCopy(formattedWestern, 'num-us-res')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedKey === 'num-us-res' ? (
                      <Check className="w-3.5 h-3.5 text-slate-300" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-slate-400 break-all py-1">
                  {formattedWestern}
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                  Rule: <strong className="text-slate-400">3, 3, 3, 3</strong> grouping
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800/80 flex items-start gap-2">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>
                In India, large values are counted in powers of hundreds after the first thousand: Thousands (10³), Lakhs (10⁵), and Crores (10⁷). In Western systems, commas always separate every thousand (powers of 10³).
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Reference Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Table className="w-4 h-4 text-sky-400" />
            Vedic & Indian Numbering Reference Table
          </h3>
          <span className="text-xs text-slate-400">From 100 to 1 Kharab</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Power</th>
                <th className="py-2.5 px-3">Indian Term</th>
                <th className="py-2.5 px-3 text-sky-400">Indian Format (🇮🇳)</th>
                <th className="py-2.5 px-3">Western Term</th>
                <th className="py-2.5 px-3 text-slate-400">Western Format (🌐)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {NUMBER_SYSTEM_COMPARISON.map((row) => (
                <tr key={row.powerOfTen} className="hover:bg-slate-800/30 transition">
                  <td className="py-2 px-3 font-bold text-amber-400">{row.powerOfTen}</td>
                  <td className="py-2 px-3 font-sans font-medium text-white">{row.indianName}</td>
                  <td className="py-2 px-3 font-bold text-sky-300">{row.indianFormat}</td>
                  <td className="py-2 px-3 font-sans text-slate-400">{row.westernName}</td>
                  <td className="py-2 px-3 text-slate-400">{row.westernFormat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

