import React, { useState, useMemo } from 'react';
import {
  formatINR,
  formatINRCompact,
  toWordsINR,
  isValidPAN,
  isValidGSTIN,
  isValidIndianPhone,
} from 'india-formatter';
import {
  Layers,
  Copy,
  Check,
  FileSpreadsheet,
  Download,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { BATCH_PRESETS } from '../data/constants';

interface BatchTesterTabProps {
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

interface BatchRowResult {
  raw: string;
  isNumeric: boolean;
  formattedInr: string;
  compactInr: string;
  words: string;
  isPan: boolean;
  isGstin: boolean;
  isPhone: boolean;
}

export const BatchTesterTab: React.FC<BatchTesterTabProps> = ({ onCopy, copiedKey }) => {
  const [inputText, setInputText] = useState<string>(
    '125000\n10500.5\n4500000\n-5000\n0.75\nABCPE1234F\n27ABCDE1234F1Z5\n+91 98765 43210'
  );

  const results: BatchRowResult[] = useMemo(() => {
    const lines = inputText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    return lines.map((line) => {
      const numVal = parseFloat(line);
      const isNum = !isNaN(numVal) && isFinite(numVal) && !line.includes(' ') && !/[a-zA-Z]/.test(line);

      let formattedInr = '-';
      let compactInr = '-';
      let words = '-';

      if (isNum) {
        try {
          formattedInr = formatINR(numVal);
        } catch {
          formattedInr = 'Err';
        }

        try {
          compactInr = formatINRCompact(numVal);
        } catch {
          compactInr = 'Err';
        }

        try {
          words = toWordsINR(numVal);
        } catch {
          words = 'Err';
        }
      }

      const isPan = isValidPAN(line);
      const isGstin = isValidGSTIN(line);
      const isPhone = isValidIndianPhone(line);

      return {
        raw: line,
        isNumeric: isNum,
        formattedInr,
        compactInr,
        words,
        isPan,
        isGstin,
        isPhone,
      };
    });
  }, [inputText]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Raw Input', 'Is Number', 'Format INR', 'Compact INR', 'Words INR', 'Is PAN', 'Is GSTIN', 'Is Phone'];
    const rows = results.map((r) => [
      `"${r.raw}"`,
      r.isNumeric,
      `"${r.formattedInr}"`,
      `"${r.compactInr}"`,
      `"${r.words}"`,
      r.isPan,
      r.isGstin,
      r.isPhone,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'india-formatter-batch-results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const jsonSummary = JSON.stringify(results, null, 2);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Multi-Input Batch Tester & Edge Case Suite
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Paste or import bulk datasets (one value per line) to simultaneously test numbers, PANs, GSTINs, and mobile numbers against the complete <code className="text-orange-300">india-formatter</code> suite.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportCSV}
              className="text-xs flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => onCopy(jsonSummary, 'batch-json')}
              className="text-xs flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition"
            >
              {copiedKey === 'batch-json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy JSON</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Column */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Batch Inputs (1 per line)
            </span>
            <span className="text-xs font-mono text-cyan-400">{results.length} item{results.length !== 1 ? 's' : ''}</span>
          </div>

          <textarea
            rows={10}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-white focus:outline-none focus:border-cyan-500 shadow-inner leading-relaxed resize-y"
            placeholder="Paste raw numbers, PANs, GSTINs, phones..."
          />

          {/* Quick Pre-loaded scenarios */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400">Load Test Scenarios:</span>
            <div className="flex flex-wrap gap-2">
              {BATCH_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setInputText(preset.data)}
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Table Column */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              Batch Execution Results
            </span>
            <span className="text-xs text-slate-500">Live evaluated client-side</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3">Input</th>
                  <th className="py-2.5 px-3">formatINR</th>
                  <th className="py-2.5 px-3">Compact</th>
                  <th className="py-2.5 px-3">toWordsINR</th>
                  <th className="py-2.5 px-3 text-center">PAN</th>
                  <th className="py-2.5 px-3 text-center">GSTIN</th>
                  <th className="py-2.5 px-3 text-center">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {results.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-bold text-white max-w-[120px] truncate" title={r.raw}>
                      {r.raw}
                    </td>
                    <td className="py-2.5 px-3 text-orange-300 whitespace-nowrap">
                      {r.formattedInr}
                    </td>
                    <td className="py-2.5 px-3 text-amber-300 whitespace-nowrap">
                      {r.compactInr}
                    </td>
                    <td className="py-2.5 px-3 text-emerald-300 font-sans max-w-[180px] truncate" title={r.words}>
                      {r.words}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${r.isPan ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-600'}`}>
                        {r.isPan ? 'VALID' : '-'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${r.isGstin ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-600'}`}>
                        {r.isGstin ? 'VALID' : '-'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${r.isPhone ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-600'}`}>
                        {r.isPhone ? 'VALID' : '-'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

