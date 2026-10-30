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
  Receipt,
  Building,
  UserCheck,
  Plus,
  Trash2,
  Copy,
  Check,
  Printer,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { GST_STATE_CODES } from '../data/constants';

interface BusinessUseCasesTabProps {
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

interface InvoiceItem {
  id: string;
  desc: string;
  qty: number;
  rate: number;
}

export const BusinessUseCasesTab: React.FC<BusinessUseCasesTabProps> = ({
  onCopy,
  copiedKey,
}) => {
  const [subTab, setSubTab] = useState<'invoice' | 'kyc'>('invoice');

  // --- INVOICE STATE ---
  const [sellerName, setSellerName] = useState('Bharat Cloud Technologies Pvt Ltd');
  const [sellerGstin, setSellerGstin] = useState('27AAACB1234F1Z8');
  const [buyerName, setBuyerName] = useState('Hindustan Retail Logistics LLP');
  const [buyerGstin, setBuyerGstin] = useState('29ABCDE1234F1Z5');
  const [gstType, setGstType] = useState<'intra' | 'inter'>('intra'); // intra = CGST+SGST, inter = IGST
  const [taxRate, setTaxRate] = useState<number>(18);

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', desc: 'Cloud Infrastructure & Managed Database', qty: 1, rate: 85000 },
    { id: '2', desc: 'Custom Software API Integration Services', qty: 2, rate: 45000 },
    { id: '3', desc: 'Annual Enterprise SLA Support Tier', qty: 1, rate: 25000 },
  ]);

  const subTotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.qty * item.rate, 0);
  }, [items]);

  const taxAmount = useMemo(() => {
    return (subTotal * taxRate) / 100;
  }, [subTotal, taxRate]);

  const grandTotal = useMemo(() => {
    return subTotal + taxAmount;
  }, [subTotal, taxAmount]);

  const grandTotalWords = useMemo(() => {
    try {
      return toWordsINR(grandTotal, { showOnly: true });
    } catch {
      return 'Zero Rupees Only';
    }
  }, [grandTotal]);

  const sellerGstinValid = isValidGSTIN(sellerGstin);
  const buyerGstinValid = isValidGSTIN(buyerGstin);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: String(Date.now()),
        desc: 'New Professional Service / Product',
        qty: 1,
        rate: 10000,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  // Invoice Text Summary
  const invoiceSummary = `TAX INVOICE
Seller: ${sellerName} (GSTIN: ${sellerGstin})
Buyer: ${buyerName} (GSTIN: ${buyerGstin})
Subtotal: ${formatINR(subTotal)}
Tax (${taxRate}%): ${formatINR(taxAmount)}
Grand Total: ${formatINR(grandTotal)}
Amount in Words: ${grandTotalWords}`;

  // --- KYC ONBOARDING STATE ---
  const [kycEntityName, setKycEntityName] = useState('Starlight FinTech Solutions');
  const [kycPan, setKycPan] = useState('ABCPE1234F');
  const [kycGstin, setKycGstin] = useState('27AAACB1234F1Z8');
  const [kycPhone, setKycPhone] = useState('+91 98765 43210');
  const [kycCreditLimit, setKycCreditLimit] = useState(2500000);
  const [kycSubmitted, setKycSubmitted] = useState(false);

  const kycPanValid = isValidPAN(kycPan, { strict: true });
  const kycGstinValid = isValidGSTIN(kycGstin);
  const kycPhoneValid = isValidIndianPhone(kycPhone);
  const allKycValid = kycPanValid && kycGstinValid && kycPhoneValid && kycEntityName.trim().length > 2;

  const kycGstinState = kycGstin.length >= 2 ? GST_STATE_CODES[kycGstin.slice(0, 2)] : null;

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Receipt className="w-5 h-5 text-amber-400" />
              Real-World Business Use Cases & Templates
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Explore how Indian SaaS, Fintech, ERP, and E-commerce products leverage <code className="text-orange-300">india-formatter</code> for GST tax invoices and regulatory customer onboarding.
            </p>
          </div>
          {/* Subtabs toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setSubTab('invoice')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                subTab === 'invoice'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>GST Tax Invoice</span>
            </button>
            <button
              onClick={() => setSubTab('kyc')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                subTab === 'kyc'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Fintech KYC Onboarding</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: GST TAX INVOICE */}
      {subTab === 'invoice' && (
        <div className="space-y-6">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="text-xs text-slate-400">
              Interactive B2B Invoice calculating <code className="text-slate-200">formatINR()</code> subtotals and auto-filling <code className="text-emerald-300">toWordsINR()</code>.
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onCopy(invoiceSummary, 'inv-summary')}
                className="text-xs flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 transition"
              >
                {copiedKey === 'inv-summary' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Summary</span>
              </button>
              <button
                onClick={() => window.print()}
                className="text-xs flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>

          {/* Realistic Tax Invoice Template Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Invoice Top Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-orange-400">
                  TAX INVOICE
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  INV-2026-00482
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Date: 30-Oct-2026 • Place of Supply: {sellerGstin.slice(0, 2)}
                </p>
              </div>

              {/* Tax Type selector */}
              <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400">Tax Mode:</span>
                <button
                  onClick={() => setGstType('intra')}
                  className={`px-2.5 py-1 rounded-md transition ${
                    gstType === 'intra' ? 'bg-orange-500/20 text-orange-300 font-semibold' : 'text-slate-400'
                  }`}
                >
                  CGST + SGST (9% + 9%)
                </button>
                <button
                  onClick={() => setGstType('inter')}
                  className={`px-2.5 py-1 rounded-md transition ${
                    gstType === 'inter' ? 'bg-orange-500/20 text-orange-300 font-semibold' : 'text-slate-400'
                  }`}
                >
                  IGST (18%)
                </button>
              </div>
            </div>

            {/* Seller & Buyer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Seller */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Seller (Billed From)</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${sellerGstinValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {sellerGstinValid ? 'GST Verified' : 'Invalid GST'}
                  </span>
                </div>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-orange-500"
                />
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-mono">GSTIN:</span>
                  <input
                    type="text"
                    value={sellerGstin}
                    onChange={(e) => setSellerGstin(e.target.value.toUpperCase())}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 font-mono text-xs uppercase text-orange-300 focus:outline-none"
                  />
                </div>
              </div>

              {/* Buyer */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Buyer (Billed To)</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${buyerGstinValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {buyerGstinValid ? 'GST Verified' : 'Invalid GST'}
                  </span>
                </div>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-orange-500"
                />
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-mono">GSTIN:</span>
                  <input
                    type="text"
                    value={buyerGstin}
                    onChange={(e) => setBuyerGstin(e.target.value.toUpperCase())}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 font-mono text-xs uppercase text-orange-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Line Items (Goods & Services)
                </span>
                <button
                  onClick={addItem}
                  className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 bg-orange-500/10 hover:bg-orange-500/20 px-2.5 py-1 rounded-lg border border-orange-500/20 transition"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Line Item</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-mono text-[11px]">
                      <th className="py-2.5 px-3">Item Description</th>
                      <th className="py-2.5 px-3 w-20 text-center">Qty</th>
                      <th className="py-2.5 px-3 w-32 text-right">Unit Rate (₹)</th>
                      <th className="py-2.5 px-3 w-36 text-right">Total (formatINR)</th>
                      <th className="py-2.5 px-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {items.map((item) => {
                      const lineTotal = item.qty * item.rate;
                      return (
                        <tr key={item.id} className="hover:bg-slate-800/30">
                          <td className="py-2 px-3 font-sans">
                            <input
                              type="text"
                              value={item.desc}
                              onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                              className="w-full bg-transparent text-slate-200 focus:outline-none focus:text-white"
                            />
                          </td>
                          <td className="py-2 px-3 text-center">
                            <input
                              type="number"
                              min="1"
                              value={item.qty}
                              onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value, 10) || 1)}
                              className="w-14 bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-center text-white focus:outline-none"
                            />
                          </td>
                          <td className="py-2 px-3 text-right">
                            <input
                              type="number"
                              step="any"
                              value={item.rate}
                              onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                              className="w-24 bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-right text-white focus:outline-none"
                            />
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-white">
                            {formatINR(lineTotal)}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-slate-500 hover:text-rose-400 transition"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculations & Words Conversion Footer */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-slate-800 items-start">
              {/* Words Section */}
              <div className="md:col-span-7 space-y-2 p-4 rounded-xl bg-slate-950/70 border border-emerald-500/30">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Amount In Words (toWordsINR):
                </div>
                <div className="text-sm font-serif italic text-emerald-200 leading-relaxed font-semibold">
                  "{grandTotalWords}"
                </div>
                <p className="text-[10px] text-slate-500">
                  Required by Rule 46 of CGST Rules 2017 for valid Indian Tax Invoices.
                </p>
              </div>

              {/* Financial Totals */}
              <div className="md:col-span-5 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Taxable Subtotal:</span>
                  <span className="font-bold text-white">{formatINR(subTotal)}</span>
                </div>

                {gstType === 'intra' ? (
                  <>
                    <div className="flex justify-between text-slate-400">
                      <span>CGST (9.0%):</span>
                      <span>{formatINR(taxAmount / 2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>SGST (9.0%):</span>
                      <span>{formatINR(taxAmount / 2)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-slate-400">
                    <span>IGST (18.0%):</span>
                    <span>{formatINR(taxAmount)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-black text-amber-400">
                  <span>Grand Total:</span>
                  <span>{formatINR(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: FINTECH KYC ONBOARDING FORM */}
      {subTab === 'kyc' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Building className="w-4 h-4 text-purple-400" />
                Merchant Business KYC Onboarding
              </span>
              <span className="text-xs text-slate-500">All fields validated via india-formatter</span>
            </div>

            {/* Business Entity Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Legal Entity Name
              </label>
              <input
                type="text"
                value={kycEntityName}
                onChange={(e) => setKycEntityName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-purple-500 shadow-inner"
                placeholder="e.g. Acme Tech Solutions Pvt Ltd"
              />
            </div>

            {/* PAN Card */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Authorized Director PAN
                </label>
                <span className={`text-[11px] font-mono font-semibold flex items-center gap-1 ${kycPanValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {kycPanValid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {kycPanValid ? 'Strict Verified' : 'Invalid PAN'}
                </span>
              </div>
              <input
                type="text"
                maxLength={10}
                value={kycPan}
                onChange={(e) => setKycPan(e.target.value.toUpperCase())}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 font-mono text-sm font-bold text-white uppercase focus:outline-none focus:border-purple-500 shadow-inner"
                placeholder="ABCPE1234F"
              />
              <p className="text-[10px] text-slate-500">
                Validated using <code className="text-slate-400">isValidPAN(pan, &#123; strict: true &#125;)</code>
              </p>
            </div>

            {/* GSTIN */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Entity GSTIN Number
                </label>
                <span className={`text-[11px] font-mono font-semibold flex items-center gap-1 ${kycGstinValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {kycGstinValid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {kycGstinValid ? (kycGstinState ? `Valid (${kycGstinState})` : 'Valid GSTIN') : 'Invalid GSTIN'}
                </span>
              </div>
              <input
                type="text"
                maxLength={15}
                value={kycGstin}
                onChange={(e) => setKycGstin(e.target.value.toUpperCase())}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 font-mono text-sm font-bold text-white uppercase focus:outline-none focus:border-purple-500 shadow-inner"
                placeholder="27AAACB1234F1Z8"
              />
              <p className="text-[10px] text-slate-500">
                Validated using <code className="text-slate-400">isValidGSTIN(gstin)</code>
              </p>
            </div>

            {/* Mobile Phone */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Contact Mobile Number
                </label>
                <span className={`text-[11px] font-mono font-semibold flex items-center gap-1 ${kycPhoneValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {kycPhoneValid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {kycPhoneValid ? 'Valid Mobile' : 'Invalid Mobile'}
                </span>
              </div>
              <input
                type="text"
                value={kycPhone}
                onChange={(e) => setKycPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 font-mono text-sm font-bold text-white focus:outline-none focus:border-purple-500 shadow-inner"
                placeholder="+91 98765 43210"
              />
              <p className="text-[10px] text-slate-500">
                Validated using <code className="text-slate-400">isValidIndianPhone(phone)</code>
              </p>
            </div>

            {/* Desired Credit Limit */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-300 uppercase tracking-wider">
                  Requested Monthly Credit Limit
                </label>
                <span className="font-mono text-purple-400 font-bold">
                  {formatINRCompact(kycCreditLimit)} ({formatINR(kycCreditLimit, { decimals: 0 })})
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="50000000"
                step="100000"
                value={kycCreditLimit}
                onChange={(e) => setKycCreditLimit(parseInt(e.target.value, 10))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setKycSubmitted(true)}
              disabled={!allKycValid}
              className={`w-full py-3 rounded-xl font-bold text-sm transition shadow-lg flex items-center justify-center gap-2 ${
                allKycValid
                  ? 'bg-purple-600 hover:bg-purple-500 text-white cursor-pointer shadow-purple-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>{allKycValid ? 'Submit & Verify Merchant KYC' : 'Please Fix Validation Errors'}</span>
            </button>

            {kycSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-white block">KYC Passed All Regulatory Checks!</strong>
                  Entity '{kycEntityName}' verified with PAN '{kycPan}', GSTIN '{kycGstin}' ({kycGstinState || 'India'}), and Mobile '{kycPhone}'.
                </div>
              </div>
            )}
          </div>

          {/* KYC Live Breakdown Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-purple-400" />
                Live Fintech Verification Status
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">PAN Strict Compliance:</span>
                  <span className={kycPanValid ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {kycPanValid ? 'PASSED (Entity Verified)' : 'FAILED'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">GSTIN Tax Registration:</span>
                  <span className={kycGstinValid ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {kycGstinValid ? `PASSED (${kycGstinState || 'State OK'})` : 'FAILED'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">TRAI Mobile Validation:</span>
                  <span className={kycPhoneValid ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {kycPhoneValid ? 'PASSED (10 Digits)' : 'FAILED'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                <p>• Zero network requests needed to reject malformed records.</p>
                <p>• Saves thousands in SMS OTP costs and payment gateway gateway verification charges.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

