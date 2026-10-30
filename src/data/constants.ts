// Official GST State and Union Territory codes
export const GST_STATE_CODES: Record<string, string> = {
  '01': 'Jammu & Kashmir',
  '02': 'Himachal Pradesh',
  '03': 'Punjab',
  '04': 'Chandigarh',
  '05': 'Uttarakhand',
  '06': 'Haryana',
  '07': 'Delhi',
  '08': 'Rajasthan',
  '09': 'Uttar Pradesh',
  '10': 'Bihar',
  '11': 'Sikkim',
  '12': 'Arunachal Pradesh',
  '13': 'Nagaland',
  '14': 'Manipur',
  '15': 'Mizoram',
  '16': 'Tripura',
  '17': 'Meghalaya',
  '18': 'Assam',
  '19': 'West Bengal',
  '20': 'Jharkhand',
  '21': 'Odisha',
  '22': 'Chhattisgarh',
  '23': 'Madhya Pradesh',
  '24': 'Gujarat',
  '25': 'Daman and Diu (Legacy)',
  '26': 'Dadra and Nagar Haveli and Daman and Diu',
  '27': 'Maharashtra',
  '28': 'Andhra Pradesh (Legacy)',
  '29': 'Karnataka',
  '30': 'Goa',
  '31': 'Lakshadweep',
  '32': 'Kerala',
  '33': 'Tamil Nadu',
  '34': 'Puducherry',
  '35': 'Andaman & Nicobar Islands',
  '36': 'Telangana',
  '37': 'Andhra Pradesh',
  '38': 'Ladakh',
  '97': 'Other Territory',
  '99': 'Centre Jurisdiction',
};

// Income Tax Department PAN 4th Character Entity Types
export interface PANEntityInfo {
  code: string;
  name: string;
  desc: string;
}

export const PAN_ENTITIES: Record<string, PANEntityInfo> = {
  P: { code: 'P', name: 'Individual / Person', desc: 'Salaried individual, proprietor, or natural person.' },
  C: { code: 'C', name: 'Company', desc: 'Private Ltd, Public Ltd, OPC, or corporate entity.' },
  H: { code: 'H', name: 'Hindu Undivided Family (HUF)', desc: 'Ancestral undivided family business/entity.' },
  F: { code: 'F', name: 'Partnership Firm / LLP', desc: 'Registered partnership firm or Limited Liability Partnership.' },
  A: { code: 'A', name: 'Association of Persons (AOP)', desc: 'Voluntary union of 2+ individuals for mutual benefit.' },
  T: { code: 'T', name: 'Trust', desc: 'Charitable, educational, or religious registered trust.' },
  B: { code: 'B', name: 'Body of Individuals (BOI)', desc: 'Conglomeration of individuals without formal partnership.' },
  L: { code: 'L', name: 'Local Authority', desc: 'Municipal corporation, panchayat, or city board.' },
  J: { code: 'J', name: 'Artificial Juridical Person', desc: 'Deities, universities, bar council, statutory bodies.' },
  G: { code: 'G', name: 'Government Agency', desc: 'Central or state government department or authority.' },
};

// Indian vs Western System Comparison Table
export interface SystemComparisonRow {
  powerOfTen: string;
  numberValue: number;
  indianName: string;
  indianFormat: string;
  westernName: string;
  westernFormat: string;
}

export const NUMBER_SYSTEM_COMPARISON: SystemComparisonRow[] = [
  { powerOfTen: '10²', numberValue: 100, indianName: 'One Hundred', indianFormat: '100', westernName: 'One Hundred', westernFormat: '100' },
  { powerOfTen: '10³', numberValue: 1000, indianName: 'One Thousand', indianFormat: '1,000', westernName: 'One Thousand', westernFormat: '1,000' },
  { powerOfTen: '10⁴', numberValue: 10000, indianName: 'Ten Thousand', indianFormat: '10,000', westernName: 'Ten Thousand', westernFormat: '10,000' },
  { powerOfTen: '10⁵', numberValue: 100000, indianName: 'One Lakh', indianFormat: '1,00,000', westernName: 'One Hundred Thousand', westernFormat: '100,000' },
  { powerOfTen: '10⁶', numberValue: 1000000, indianName: 'Ten Lakh', indianFormat: '10,00,000', westernName: 'One Million', westernFormat: '1,000,000' },
  { powerOfTen: '10⁷', numberValue: 10000000, indianName: 'One Crore', indianFormat: '1,00,00,000', westernName: 'Ten Million', westernFormat: '10,000,000' },
  { powerOfTen: '10⁸', numberValue: 100000000, indianName: 'Ten Crore', indianFormat: '10,00,00,000', westernName: 'One Hundred Million', westernFormat: '100,000,000' },
  { powerOfTen: '10⁹', numberValue: 1000000000, indianName: 'One Arab (100 Crore)', indianFormat: '1,00,00,00,000', westernName: 'One Billion', westernFormat: '1,000,000,000' },
  { powerOfTen: '10¹¹', numberValue: 100000000000, indianName: 'One Kharab', indianFormat: '1,00,00,00,00,000', westernName: 'One Hundred Billion', westernFormat: '100,000,000,000' },
];

// Presets for the Batch Tester
export const BATCH_PRESETS = [
  { label: 'Fintech Cheques', data: '125000\n10500.5\n4500000\n99.99\n10000000\n0.75' },
  { label: 'E-commerce Orders', data: '499\n1499.5\n25999\n129900\n549999\n-150' },
  { label: 'PAN Cards Test', data: 'ABCPE1234F\nAAACH1234F\nXYZCT9999A\nINVALID123\nABCDE1234F' },
  { label: 'GSTIN Numbers', data: '27ABCDE1234F1Z5\n07AAAAA0000A1Z5\n29XYZPA5678B1Z2\n99AABCC1234E1Z9\n123456789' },
  { label: 'Indian Mobile Numbers', data: '+91 98765 43210\n09876543210\n918877665544\n7001234567\n1234567890' },
];

// FAQs for developer info tab
export const FAQ_ITEMS = [
  {
    q: 'Why not just use Intl.NumberFormat("en-IN")?',
    a: 'While Intl.NumberFormat covers standard number grouping, it has critical gaps for Indian applications: (1) It cannot generate Indian English words ("Rupees ... and Fifty Paise Only") needed for cheques and GST invoices. (2) Compact notation in standard Intl yields inconsistent or awkward labels across environments (Node 16/18, Vercel Edge, old Safari) and does not support spelled-out "Lakh" or "Crore" nicely. (3) It has zero support for PAN, GSTIN, and mobile phone validation. india-formatter provides a unified, deterministic, zero-dependency suite for all these needs.',
  },
  {
    q: 'Does india-formatter work in Next.js Server Components and Edge Middleware?',
    a: 'Yes, 100%! india-formatter is completely dependency-free, has no Node-specific C++ bindings or global state, and has a gzipped bundle size under 3 KB. It works out-of-the-box in Node.js, Next.js (App Router, Server Actions, Client Components), Cloudflare Workers, Supabase Edge Functions, Bun, and Deno.',
  },
  {
    q: 'How does PAN validation strict mode work?',
    a: 'Every Permanent Account Number (PAN) in India follows the format: 5 letters, 4 digits, 1 letter. The 4th character strictly indicates the legal category of the tax-paying entity (P for Person/Individual, C for Company, H for HUF, F for Partnership Firm/LLP, T for Trust, etc.). With `{ strict: true }`, isValidPAN verifies both the regex structure and ensures the 4th letter is a recognized legal entity.',
  },
  {
    q: 'Does it support decimal paise in words conversion?',
    a: 'Yes! For example, `toWordsINR(10500.50)` outputs "Ten Thousand Five Hundred Rupees and Fifty Paise Only". If there are no paise, it cleanly omits the paise clause. You can also disable the trailing "Only" using `{ showOnly: false }`.',
  },
  {
    q: 'Is india-formatter tree-shakeable?',
    a: 'Yes. The package is built with tsup as dual ESM (dist/index.mjs) and CommonJS (dist/index.js) with sideEffects: false. Bundlers like Vite, Webpack, and Rollup will tree-shake and include only the specific functions you import.',
  },
];

