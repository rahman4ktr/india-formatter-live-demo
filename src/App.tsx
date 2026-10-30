import React, { useState } from 'react';
import { Header, TabKey } from './components/Header';
import { CurrencyTab } from './components/CurrencyTab';
import { WordsTab } from './components/WordsTab';
import { NumbersTab } from './components/NumbersTab';
import { ValidatorsTab } from './components/ValidatorsTab';
import { BusinessUseCasesTab } from './components/BusinessUseCasesTab';
import { BatchTesterTab } from './components/BatchTesterTab';
import { DocsTab } from './components/DocsTab';
import { WhyAndBenchmarksTab } from './components/WhyAndBenchmarksTab';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('currency');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[32rem] h-[32rem] bg-orange-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 left-1/3 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Main sticky header with tabs & package manager selector */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCopy={handleCopy}
        copiedKey={copiedKey}
      />

      {/* Main Content Viewport */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'currency' && (
          <CurrencyTab onCopy={handleCopy} copiedKey={copiedKey} />
        )}
        {activeTab === 'words' && (
          <WordsTab onCopy={handleCopy} copiedKey={copiedKey} />
        )}
        {activeTab === 'number' && (
          <NumbersTab onCopy={handleCopy} copiedKey={copiedKey} />
        )}
        {activeTab === 'validator' && (
          <ValidatorsTab onCopy={handleCopy} copiedKey={copiedKey} />
        )}
        {activeTab === 'use-cases' && (
          <BusinessUseCasesTab onCopy={handleCopy} copiedKey={copiedKey} />
        )}
        {activeTab === 'batch' && (
          <BatchTesterTab onCopy={handleCopy} copiedKey={copiedKey} />
        )}
        {activeTab === 'docs' && (
          <DocsTab onCopy={handleCopy} copiedKey={copiedKey} />
        )}
        {activeTab === 'benchmarks' && (
          <WhyAndBenchmarksTab />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
