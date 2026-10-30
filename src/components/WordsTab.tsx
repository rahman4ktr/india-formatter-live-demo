import React, { useState, useMemo } from 'react';
import { toWordsINR, formatINR } from 'india-formatter';
import {
  MessageSquareText,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Code2,
  Printer,
  Sparkles,
  Shield,
  Calendar,
} from 'lucide-react';

interface WordsTabProps {
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export const WordsTab: React.FC<WordsTabProps> = ({ onCopy, copiedKey }) => {
  const [amount, setAmount] = useState<number>(1254300.5);
  const [showOnly, setShowOnly] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [payeeName, setPayeeName] = useState<string>('Bharat Innovations Pvt. Ltd.');
  const [chequeDate, setChequeDate] = useState<string>(() => {
    const today = new Date();
    const d = String(today.getDate()).padStart(2, '0');
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const y = today.getFullYear();
    return `${d}${m}${y}`;
  });

  const wordsResult = useMemo(() => {
    try {
      return toWordsINR(amount, { showOnly });
    } catch {
      return 'Invalid number input';
    }
  }, [amount, showOnly]);

  const formattedFigure = useMemo(() => {
    try {
      return formatINR(amount, { decimals: 2 });
    } catch {
      return '₹0.00';
    }
  }, [amount]);

  // Audio Speech synthesis
  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(wordsResult);
    utterance.rate = 0.9;
    utterance.lang = 'en-IN';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handlePrint = () => {
    window.print();
  };

  const fullChequeText = `Payee: ${payeeName}\nAmount in figures: ${formattedFigure}\nAmount in words: ${wordsResult}\nDate: ${chequeDate}`;

  const generatedCode = `import { toWordsINR } from 'india-formatter';

const words = toWordsINR(${amount}, { showOnly: ${showOnly} });
// => "${wordsResult}"`;

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquareText className="w-5 h-5 text-emerald-400" />
              Indian English Words Converter & Cheque Visualizer
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Converts any numerical figure into official Indian currency English words with full Paise support and proper Lakhs/Crores hierarchy for banking cheques and GST tax invoices.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-mono font-semibold">
              toWordsINR()
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Amount & Options
            </span>
            <button
              onClick={() => {
                setAmount(1254300.5);
                setShowOnly(true);
                setPayeeName('Bharat Innovations Pvt. Ltd.');
              }}
              className="text-xs text-slate-400 hover:text-white transition"
            >
              Reset
            </button>
          </div>

          {/* Amount input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                ₹
              </span>
              <input
                type="number"
                step="any"
                value={Number.isNaN(amount) ? '' : amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-lg font-semibold text-white focus:outline-none focus:border-emerald-500 transition font-mono shadow-inner"
                placeholder="Enter amount..."
              />
            </div>
          </div>

          {/* Quick presets */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400">Typical Cheque & Invoice Amounts:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '₹10,500.50 (Paise)', val: 10500.5 },
                { label: '₹1,25,000 (Salary)', val: 125000 },
                { label: '₹15,40,750 (Vendor)', val: 1540750 },
                { label: '₹2.50 Cr (Funding)', val: 25000000 },
                { label: '₹0.75 (Only Paise)', val: 0.75 },
                { label: '-₹5,000 (Credit)', val: -5000 },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => setAmount(p.val)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition ${
                    amount === p.val
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="wordsShowOnly" className="text-sm font-medium text-slate-200 cursor-pointer">
                  Append "Only" suffix
                </label>
                <p className="text-xs text-slate-400">Prevents fraudulent cheque alterations</p>
              </div>
              <input
                type="checkbox"
                id="wordsShowOnly"
                checked={showOnly}
                onChange={(e) => setShowOnly(e.target.checked)}
                className="w-5 h-5 rounded accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Payee Name (for Cheque preview)
              </label>
              <input
                type="text"
                value={payeeName}
                onChange={(e) => setPayeeName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                placeholder="Payee full name..."
              />
            </div>
          </div>

          {/* Code snippet */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-900">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                Code Example
              </span>
              <button
                onClick={() => onCopy(generatedCode, 'words-code')}
                className="hover:text-white text-slate-400"
              >
                {copiedKey === 'words-code' ? (
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

        {/* Live Output & Interactive Cheque */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Words Result Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Amount In Indian English Words
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSpeak}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition ${
                    isSpeaking
                      ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                      : 'bg-slate-800/90 hover:bg-slate-700 text-emerald-300 border-slate-700'
                  }`}
                  title={isSpeaking ? 'Stop speaking' : 'Read aloud with Speech Synthesis'}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Read Aloud</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => onCopy(wordsResult, 'words-output')}
                  className="flex items-center gap-1.5 text-xs bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 transition"
                >
                  {copiedKey === 'words-output' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedKey === 'words-output' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl">
              <p className="text-xl sm:text-2xl font-semibold text-emerald-200 leading-relaxed font-sans">
                "{wordsResult}"
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Figures equivalent:</span>
              <span className="font-mono font-bold text-slate-200">{formattedFigure}</span>
            </div>
          </div>

          {/* Interactive Realistic Bank Cheque Simulator */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Live Indian Banking Cheque Preview
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onCopy(fullChequeText, 'cheque-copy')}
                  className="text-xs flex items-center gap-1 text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 border border-slate-700"
                >
                  {copiedKey === 'cheque-copy' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Text</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="text-xs flex items-center gap-1 text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 border border-slate-700"
                >
                  <Printer className="w-3 h-3" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Cheque Card */}
            <div className="relative rounded-2xl bg-[#f7f9f6] text-slate-900 p-5 sm:p-7 shadow-2xl border-2 border-emerald-900/20 overflow-hidden font-serif">
              {/* Crossed Banner */}
              <div className="absolute top-0 left-0 w-28 h-20 pointer-events-none overflow-hidden">
                <div className="absolute top-4 -left-6 w-36 py-0.5 bg-emerald-800/90 text-white text-[9px] font-sans font-bold text-center tracking-widest uppercase transform -rotate-45 shadow-sm">
                  A/C PAYEE ONLY
                </div>
              </div>

              {/* Watermark Pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center font-sans font-black text-6xl text-emerald-900 select-none">
                RESERVE BANK OF BHARAT
              </div>

              {/* Header row */}
              <div className="flex items-start justify-between border-b border-emerald-950/20 pb-3 mb-4">
                <div className="pl-14 sm:pl-16">
                  <h3 className="font-sans font-black text-sm sm:text-base tracking-wide text-emerald-950">
                    NATIONAL COMMERCIAL BANK OF INDIA
                  </h3>
                  <p className="text-[10px] font-sans text-slate-600">
                    BRANCH: CONNAUGHT PLACE, NEW DELHI | IFSC: NCBI0000108
                  </p>
                </div>

                {/* Date Boxes */}
                <div className="flex flex-col items-end">
                  <div className="text-[9px] font-sans font-semibold uppercase text-slate-600 flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3" />
                    <span>DATE</span>
                  </div>
                  <div className="flex gap-1 font-mono text-xs font-bold">
                    {chequeDate.split('').map((char, i) => (
                      <span
                        key={i}
                        className="w-5 h-6 border border-emerald-900/40 bg-white flex items-center justify-center rounded-[2px]"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pay Line */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-sans font-bold text-xs uppercase text-slate-700 tracking-wider">
                  PAY:
                </span>
                <div className="flex-1 border-b border-dashed border-emerald-900/50 pb-0.5 px-2 font-sans font-bold text-slate-900 text-sm sm:text-base">
                  {payeeName || 'Cash / Self'}
                </div>
                <span className="font-sans text-xs text-slate-600">OR BEARER</span>
              </div>

              {/* Rupees Line */}
              <div className="space-y-2 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-sans font-bold text-xs uppercase text-slate-700 tracking-wider">
                    RUPEES:
                  </span>
                  <div className="flex-1 border-b border-dashed border-emerald-900/50 pb-0.5 px-2 font-serif italic font-bold text-emerald-950 text-xs sm:text-sm leading-relaxed">
                    {wordsResult}
                  </div>
                </div>
              </div>

              {/* Figures Box & Signatory Row */}
              <div className="flex items-end justify-between pt-2">
                {/* Amount Box */}
                <div className="flex items-center gap-2">
                  <div className="border-2 border-emerald-900/60 bg-emerald-50/80 rounded-lg px-4 py-2 font-mono font-black text-base sm:text-xl text-emerald-950 shadow-inner flex items-center gap-1">
                    <span>₹</span>
                    <span>{formattedFigure.replace(/[₹]/g, '').trim()} /-</span>
                  </div>
                </div>

                {/* Signature Block */}
                <div className="text-right">
                  <div className="h-10 border-b border-emerald-950/40 w-44 sm:w-52 flex items-end justify-center pb-1">
                    <span className="font-serif italic text-emerald-900/70 text-sm font-semibold">
                      Authorised Signatory
                    </span>
                  </div>
                  <span className="text-[10px] font-sans uppercase font-bold text-slate-600">
                    PLEASE SIGN ABOVE THIS LINE
                  </span>
                </div>
              </div>

              {/* MICR Bottom Band */}
              <div className="mt-5 pt-3 border-t border-emerald-900/30 flex items-center justify-center font-mono text-xs sm:text-sm tracking-widest text-slate-700">
                ⑈ 001248 ⑈ 110024001 ⑈ 001234 ⑈ 31
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

