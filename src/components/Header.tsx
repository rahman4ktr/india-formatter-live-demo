import React, { useState } from 'react';
import {
  Coins,
  MessageSquareText,
  Binary,
  ShieldCheck,
  Receipt,
  Layers,
  BookOpen,
  HelpCircle,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  PackageCheck,
  Terminal,
} from 'lucide-react';

export type TabKey =
  | 'currency'
  | 'words'
  | 'number'
  | 'validator'
  | 'use-cases'
  | 'batch'
  | 'docs'
  | 'benchmarks';

interface HeaderProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onCopy,
  copiedKey,
}) => {
  const [packageManager, setPackageManager] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');

  const installCommands = {
    npm: 'npm i india-formatter',
    pnpm: 'pnpm add india-formatter',
    yarn: 'yarn add india-formatter',
    bun: 'bun add india-formatter',
  };

  const navItems: { key: TabKey; label: string; icon: React.ReactNode; badge?: string }[] = [
    { key: 'currency', label: 'Currency (INR)', icon: <Coins className="w-4 h-4 text-orange-400" /> },
    { key: 'words', label: 'Words & Cheque', icon: <MessageSquareText className="w-4 h-4 text-emerald-400" /> },
    { key: 'number', label: 'Indian Numbers', icon: <Binary className="w-4 h-4 text-sky-400" /> },
    { key: 'validator', label: 'PAN • GST • Phone', icon: <ShieldCheck className="w-4 h-4 text-purple-400" /> },
    { key: 'use-cases', label: 'Live Templates', icon: <Receipt className="w-4 h-4 text-amber-400" />, badge: 'Invoice & KYC' },
    { key: 'batch', label: 'Batch Tester', icon: <Layers className="w-4 h-4 text-cyan-400" /> },
    { key: 'docs', label: 'API Reference', icon: <BookOpen className="w-4 h-4 text-indigo-400" /> },
    { key: 'benchmarks', label: 'Why & Benchmarks', icon: <HelpCircle className="w-4 h-4 text-rose-400" /> },
  ];

  return (
    <header className="relative z-20 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 shadow-lg">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-orange-600/20 via-amber-600/10 to-emerald-600/20 border-b border-slate-800/50 py-1.5 px-4 text-center text-[11px] sm:text-xs text-slate-300 flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 font-semibold text-orange-400">
          <Sparkles className="w-3.5 h-3.5" /> india-formatter v1.0.0
        </span>
        <span className="text-slate-600">•</span>
        <span>Zero dependencies</span>
        <span className="text-slate-600">•</span>
        <span>&lt; 3 KB gzipped</span>
        <span className="text-slate-600">•</span>
        <span>Node, Next.js, Edge, Browser & TypeScript</span>
        <span className="text-slate-600">•</span>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-500 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-orange-400 text-2xl">
                  ₹
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center" title="Live Package Verified">
                <Check className="w-2.5 h-2.5 text-white" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  india-formatter
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    Live Demo & Docs
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                The zero-dependency toolkit for Indian currency, words, & regulatory compliance
              </p>
            </div>
          </div>

          {/* Mobile links */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://www.npmjs.com/package/india-formatter"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900"
            >
              npm
            </a>
            <a
              href="https://github.com/rahman4ktr/india-formatter"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Package manager install box + external links */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap sm:flex-nowrap">
          {/* PM selector box */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 shadow-inner text-xs font-mono">
            <div className="flex items-center border-r border-slate-800/80 pr-1.5 mr-1.5 space-x-0.5">
              {(['npm', 'pnpm', 'yarn', 'bun'] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setPackageManager(pm)}
                  className={`px-1.5 py-0.5 rounded text-[11px] transition ${packageManager === pm
                    ? 'bg-orange-500/20 text-orange-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  {pm}
                </button>
              ))}
            </div>

            <div className="flex items-center px-1 text-slate-300">
              <Terminal className="w-3.5 h-3.5 text-slate-500 mr-1.5 shrink-0" />
              <span className="truncate max-w-[190px] sm:max-w-none">{installCommands[packageManager]}</span>
              <button
                onClick={() => onCopy(installCommands[packageManager], 'pm-cmd')}
                className="ml-2.5 p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                title="Copy install command"
              >
                {copiedKey === 'pm-cmd' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* External Links */}
          <div className="hidden sm:flex items-center gap-2">

            <a
              href="https://www.npmjs.com/package/india-formatter"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/80 hover:bg-slate-800 transition shadow-sm"
            >
              <PackageCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>NPM</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a
              href="https://github.com/rahman4ktr/india-formatter"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/80 hover:bg-slate-800 transition shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-1 border-t border-slate-800/60 scrollbar-none py-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition whitespace-nowrap ${isActive
                ? 'bg-slate-800 text-white font-semibold shadow-inner border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};

