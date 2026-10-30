import React, { useState, useMemo } from 'react';
import { isValidPAN, isValidGSTIN, isValidIndianPhone } from 'india-formatter';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Code2,
  Building2,
  Phone,
  FileCheck,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { GST_STATE_CODES, PAN_ENTITIES } from '../data/constants';

interface ValidatorsTabProps {
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export const ValidatorsTab: React.FC<ValidatorsTabProps> = ({ onCopy, copiedKey }) => {
  // PAN state
  const [panInput, setPanInput] = useState<string>('ABCPE1234F');
  const [panStrict, setPanStrict] = useState<boolean>(true);

  // GSTIN state
  const [gstinInput, setGstinInput] = useState<string>('27ABCDE1234F1Z5');

  // Phone state
  const [phoneInput, setPhoneInput] = useState<string>('+91 98765 43210');

  // PAN validity & entity breakdown
  const panValid = useMemo(() => {
    try {
      return isValidPAN(panInput.trim(), { strict: panStrict });
    } catch {
      return false;
    }
  }, [panInput, panStrict]);

  const panClean = panInput.trim().toUpperCase();
  const panEntityCode = panClean.length >= 4 ? panClean[3] : null;
  const detectedEntity = panEntityCode && PAN_ENTITIES[panEntityCode] ? PAN_ENTITIES[panEntityCode] : null;

  // GSTIN validity & breakdown
  const gstinValid = useMemo(() => {
    try {
      return isValidGSTIN(gstinInput.trim());
    } catch {
      return false;
    }
  }, [gstinInput]);

  const gstinClean = gstinInput.trim().toUpperCase();
  const gstinStateCode = gstinClean.length >= 2 ? gstinClean.slice(0, 2) : '';
  const gstinStateName = GST_STATE_CODES[gstinStateCode] || null;
  const gstinPan = gstinClean.length >= 12 ? gstinClean.slice(2, 12) : '';
  const gstinEntityNum = gstinClean.length >= 13 ? gstinClean[12] : '';
  const gstinZChar = gstinClean.length >= 14 ? gstinClean[13] : '';
  const gstinCheckChar = gstinClean.length >= 15 ? gstinClean[14] : '';
  const gstinPanValid = gstinPan.length === 10 ? isValidPAN(gstinPan) : false;

  // Phone validity & normalized format
  const phoneValid = useMemo(() => {
    try {
      return isValidIndianPhone(phoneInput.trim());
    } catch {
      return false;
    }
  }, [phoneInput]);

  const sanitizedPhone = useMemo(() => {
    const raw = phoneInput.replace(/[^0-9]/g, '');
    let core = raw;
    if (raw.startsWith('91') && raw.length === 12) core = raw.slice(2);
    else if (raw.startsWith('0') && raw.length === 11) core = raw.slice(1);
    return core.length === 10 ? `+91 ${core.slice(0, 5)} ${core.slice(5)}` : null;
  }, [phoneInput]);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              Regulatory Compliance Validators
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Zero-dependency validation for Indian tax identifiers (PAN card, GSTIN number) and 10-digit mobile phone numbers with automatic prefix normalization and entity parsing.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full font-mono font-semibold">
              isValidPAN() • isValidGSTIN() • isValidIndianPhone()
            </span>
          </div>
        </div>
      </div>

      {/* Grid of 3 Validator Suites */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 1. PAN VALIDATOR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-white text-base">Permanent Account Number (PAN)</h3>
              </div>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                isValidPAN()
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                10-Character PAN
              </label>
              <input
                type="text"
                maxLength={10}
                value={panInput}
                onChange={(e) => setPanInput(e.target.value.toUpperCase())}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 font-mono text-base font-bold tracking-wider text-white uppercase focus:outline-none focus:border-purple-500 transition shadow-inner"
                placeholder="ABCPE1234F"
              />
            </div>

            {/* Strict Toggle */}
            <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-xs">
              <div>
                <span className="font-medium text-slate-200">Strict Entity Check</span>
                <p className="text-[10px] text-slate-400">Verifies 4th char is legal entity</p>
              </div>
              <button
                onClick={() => setPanStrict(!panStrict)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition ${
                  panStrict
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                {panStrict ? 'Strict: ON' : 'Strict: OFF'}
              </button>
            </div>

            {/* Validation status badge */}
            <div
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border transition ${
                panValid
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}
            >
              {panValid ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <div>
                <div className="text-xs font-bold">
                  {panValid ? 'Valid Indian PAN' : 'Invalid PAN Number'}
                </div>
                <div className="text-[10px] opacity-80">
                  {panValid
                    ? panStrict
                      ? 'Format & legal entity category matched'
                      : 'Pattern matched (non-strict)'
                    : 'Must be 5 letters + 4 digits + 1 letter'}
                </div>
              </div>
            </div>

            {/* Visual Character Structure Breakdown */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                PAN Anatomy (10 Chars)
              </span>
              <div className="grid grid-cols-5 gap-1 font-mono text-center text-xs">
                <div className="bg-slate-950 border border-slate-800 rounded p-1 col-span-2">
                  <div className="font-bold text-slate-200">{panClean.slice(0, 3) || '---'}</div>
                  <div className="text-[9px] text-slate-500">Series (A-Z)</div>
                </div>
                <div className={`rounded p-1 border ${detectedEntity ? 'bg-purple-950/40 border-purple-500 text-purple-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                  <div className="font-bold">{panEntityCode || '-'}</div>
                  <div className="text-[9px]">Entity (4th)</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded p-1">
                  <div className="font-bold text-slate-200">{panClean[4] || '-'}</div>
                  <div className="text-[9px] text-slate-500">Surname</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded p-1">
                  <div className="font-bold text-slate-200">{panClean[9] || '-'}</div>
                  <div className="text-[9px] text-slate-500">Check</div>
                </div>
              </div>
            </div>

            {/* Entity description card */}
            {detectedEntity ? (
              <div className="text-xs p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-purple-200 space-y-1">
                <div className="text-[10px] uppercase font-bold text-purple-400">
                  Entity Category '{detectedEntity.code}':
                </div>
                <div className="font-bold text-white">{detectedEntity.name}</div>
                <div className="text-[11px] text-slate-400">{detectedEntity.desc}</div>
              </div>
            ) : panEntityCode ? (
              <div className="text-xs p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300">
                4th character '{panEntityCode}' is not a valid legal entity code.
              </div>
            ) : null}
          </div>

          {/* Quick presets */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-500 block">Try Test PANs:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setPanInput('ABCPE1234F')}
                className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-mono"
              >
                ABCPE1234F (Person)
              </button>
              <button
                onClick={() => setPanInput('AAACH1234F')}
                className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-mono"
              >
                AAACH1234F (Company)
              </button>
              <button
                onClick={() => setPanInput('ABCDE1234F')}
                className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-amber-300 font-mono"
              >
                ABCDE1234F (D=Non-strict)
              </button>
            </div>
          </div>
        </div>

        {/* 2. GSTIN VALIDATOR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">GST Identification (GSTIN)</h3>
              </div>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                isValidGSTIN()
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                15-Character GSTIN
              </label>
              <input
                type="text"
                maxLength={15}
                value={gstinInput}
                onChange={(e) => setGstinInput(e.target.value.toUpperCase())}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 font-mono text-base font-bold tracking-wider text-white uppercase focus:outline-none focus:border-emerald-500 transition shadow-inner"
                placeholder="27ABCDE1234F1Z5"
              />
            </div>

            {/* Validation badge */}
            <div
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border transition ${
                gstinValid
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}
            >
              {gstinValid ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <div>
                <div className="text-xs font-bold">
                  {gstinValid ? 'Valid Indian GSTIN' : 'Invalid GSTIN Format'}
                </div>
                <div className="text-[10px] opacity-80">
                  {gstinValid
                    ? 'State code, PAN & check code verified'
                    : 'Requires 2 digits state + 10 PAN + 1 entity + Z + check'}
                </div>
              </div>
            </div>

            {/* Detailed GSTIN Breakdown */}
            <div className="space-y-2 pt-1 font-mono text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                GSTIN Structure Breakdown
              </span>

              <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">State ({gstinStateCode || '--'}):</span>
                  <span className="font-bold text-emerald-400">
                    {gstinStateName || (gstinStateCode ? 'Unknown State' : '--')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">Embedded PAN:</span>
                  <span className="font-semibold text-slate-200 flex items-center gap-1">
                    {gstinPan || '--'}
                    {gstinPan.length === 10 && (
                      <span className={`text-[9px] px-1 rounded ${gstinPanValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {gstinPanValid ? 'Valid PAN' : 'Invalid PAN'}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">Entity No / Z / Check:</span>
                  <span className="text-slate-300">
                    '{gstinEntityNum || '-'}' / '{gstinZChar || '-'}' / '{gstinCheckChar || '-'}'
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick presets */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-500 block">Try State GSTINs:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setGstinInput('27ABCDE1234F1Z5')}
                className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-mono"
              >
                27 (MH)
              </button>
              <button
                onClick={() => setGstinInput('07AAAAA0000A1Z5')}
                className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-mono"
              >
                07 (Delhi)
              </button>
              <button
                onClick={() => setGstinInput('29XYZPA5678B1Z2')}
                className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-mono"
              >
                29 (KA)
              </button>
              <button
                onClick={() => setGstinInput('33AABCC1234E1Z9')}
                className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-mono"
              >
                33 (TN)
              </button>
            </div>
          </div>
        </div>

        {/* 3. INDIAN PHONE NUMBER VALIDATOR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Indian Mobile Phone</h3>
              </div>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                isValidIndianPhone()
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Mobile Number
              </label>
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 font-mono text-base font-bold tracking-wider text-white focus:outline-none focus:border-amber-500 transition shadow-inner"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Validation badge */}
            <div
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border transition ${
                phoneValid
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}
            >
              {phoneValid ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <div>
                <div className="text-xs font-bold">
                  {phoneValid ? 'Valid Indian Mobile Number' : 'Invalid Mobile Number'}
                </div>
                <div className="text-[10px] opacity-80">
                  {phoneValid
                    ? '10 digits starting with 6, 7, 8, or 9'
                    : 'Must be valid Indian mobile format'}
                </div>
              </div>
            </div>

            {/* Sanitized Format Output */}
            {sanitizedPhone && phoneValid && (
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  Normalized E.164 Display:
                </span>
                <div className="font-mono text-sm font-bold text-white">{sanitizedPhone}</div>
              </div>
            )}

            {/* TRAI Rules box */}
            <div className="text-xs p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 space-y-1 leading-relaxed">
              <p>• <strong>Starts with 6, 7, 8, or 9:</strong> Follows TRAI National Numbering Plan.</p>
              <p>• <strong>Prefixes accepted:</strong> <code className="text-slate-300">+91</code>, <code className="text-slate-300">91</code>, or leading <code className="text-slate-300">0</code>.</p>
              <p>• <strong>Formatting tolerant:</strong> Automatically ignores spaces, hyphens, and brackets.</p>
            </div>
          </div>

          {/* Quick presets */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-500 block">Try Test Numbers:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setPhoneInput('+91 98765 43210')}
                className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-mono"
              >
                +91 98765 43210
              </button>
              <button
                onClick={() => setPhoneInput('09876543210')}
                className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-mono"
              >
                0-Prefix
              </button>
              <button
                onClick={() => setPhoneInput('7001234567')}
                className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-mono"
              >
                7-Series
              </button>
              <button
                onClick={() => setPhoneInput('1234567890')}
                className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-rose-400 font-mono"
              >
                12345 (Invalid)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippet for all 3 validators */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 font-mono text-xs text-slate-300 space-y-2">
        <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-900">
          <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
            <Code2 className="w-4 h-4" />
            Validators Implementation Snippet
          </span>
          <button
            onClick={() =>
              onCopy(
                `import { isValidPAN, isValidGSTIN, isValidIndianPhone } from 'india-formatter';\n\n// PAN validation (strict checks 4th char legal entity)\nisValidPAN('${panInput}', { strict: ${panStrict} }); // => ${panValid}\n\n// GSTIN validation\nisValidGSTIN('${gstinInput}'); // => ${gstinValid}\n\n// Indian Mobile phone validation\nisValidIndianPhone('${phoneInput}'); // => ${phoneValid}`,
                'valid-code-all'
              )
            }
            className="hover:text-white text-slate-400"
          >
            {copiedKey === 'valid-code-all' ? (
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
        <pre className="overflow-x-auto text-[11px] leading-relaxed pt-1 text-slate-300">
          {`import { isValidPAN, isValidGSTIN, isValidIndianPhone } from 'india-formatter';

// 1. PAN validation
const isPANValid = isValidPAN('${panInput}', { strict: ${panStrict} }); // => ${panValid}

// 2. GSTIN validation
const isGSTValid = isValidGSTIN('${gstinInput}'); // => ${gstinValid}

// 3. Indian Phone validation
const isPhoneValid = isValidIndianPhone('${phoneInput}'); // => ${phoneValid}`}
        </pre>
      </div>
    </div>
  );
};

