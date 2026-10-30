# india-formatter — Official Live Demo & Documentation Hub

> Zero-dependency, ultra-lightweight ($< 3\text{ KB}$ gzipped) library for Indian currency formatting, Lakhs/Crores grouping, banking cheque & invoice words conversion, and regulatory validations (PAN, GSTIN, Phone).

Live interactive showcase & documentation portal built with **React 19**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Features & Interactive Modules

### 1. 💰 Currency Formatter (`formatINR`, `formatINRCompact`)
- **Authentic Indian Grouping**: Standard $3, 2, 2$ digit separation (e.g., `₹12,34,567.89`).
- **Compact Human Notation**: Automatic conversion to `K`, `Lakh`, and `Crore` (e.g., `₹15 Lakh`, `₹2.5 Crore`).
- **Interactive Controls**: Symbol toggle, custom prefix (`₹`, `Rs.`, `INR`, custom), and decimal precision slider ($0$ to $4$ paise).
- **Digit Grouping Visualizer**: Interactive color-coded breakdown of Units, Thousands, Lakhs, Crores, and Paise.

### 2. ✍️ Number to Indian English Words & Bank Cheque Visualizer (`toWordsINR`)
- **Cheque & Tax Invoice Words**: Converts numbers into standard Indian English words (e.g., `Ten Thousand Five Hundred Rupees and Fifty Paise Only`).
- **Interactive Bank Cheque Graphic**: Realistic Indian bank cheque preview with editable payee, date, "A/C PAYEE ONLY" crossing, and MICR code band.
- **Audio Text-to-Speech**: In-browser speech synthesis to listen to amounts in words.
- **Fraud-Prevention Suffix**: Toggleable `"Only"` suffix.

### 3. 🔢 Pure Indian Number Separation (`formatIndianNumber`)
- **Currency-Free Formatting**: Authentic Indian comma separation for numbers without currency symbols (e.g., `12,34,567`).
- **Side-by-Side Comparison**: Live comparison between the Indian Vedic numbering system ($10^5$ Lakh, $10^7$ Crore) and the International Western system ($10^6$ Million, $10^9$ Billion).
- **Reference Table**: Full power-of-ten reference table from $10^2$ (One Hundred) to $10^{11}$ (One Kharab).

### 4. 🛡️ Regulatory Compliance Validators
- **Income Tax PAN Card (`isValidPAN`)**:
  - Regex pattern matching for 10-character PAN.
  - **Strict Mode**: Decodes the 4th character legal entity (Individual, Company, HUF, Firm/LLP, Trust, AOP, BOI, Local Authority, etc.).
- **GSTIN Number (`isValidGSTIN`)**:
  - 15-character Goods and Services Tax ID validation.
  - Automatic state detection covering all 36 Indian States and Union Territories.
  - Embedded PAN extraction and validation check.
- **Indian Mobile Phone Number (`isValidIndianPhone`)**:
  - Validates 10-digit mobile numbers starting with 6, 7, 8, or 9 (TRAI National Numbering Plan).
  - Tolerant to `+91`, `91`, or `0` prefixes, hyphens, and spaces.
  - Formats into normalized E.164 display (`+91 XXXXX XXXXX`).

### 5. 🧾 Real-World Business Templates
- **Interactive GST Tax Invoice**:
  - Realistic Indian B2B invoice with editable line items.
  - Subtotals auto-formatted with `formatINR`.
  - CGST + SGST (9% + 9%) or IGST (18%) tax calculations.
  - Grand total auto-filled into "Amount in Words" with `toWordsINR`.
- **Fintech & Merchant KYC Onboarding**:
  - Form validating Business Legal Name, Director PAN, Company GSTIN, and Mobile Phone with instant compliance checkmarks.

### 6. 🧪 Multi-Input Batch Tester
- Bulk test datasets (one item per line) against all formatting and validator functions simultaneously.
- 1-click presets: Fintech Cheques, E-commerce Orders, PAN cards, GSTIN numbers, and Phone numbers.
- Export results as CSV or copy as JSON.

### 7. 📚 Complete API Reference & Framework Guides
- Copy-paste integration guides for **Next.js** (App Router Server & Client Components), **Node.js** (Express/Fastify), **Cloudflare Workers** (Edge Middleware), and **React 19 / Vite**.
- Full TypeScript declaration file view (`index.d.ts`).

### 8. ⚡ Why & Benchmarks
- Why `Intl.NumberFormat('en-IN')` fails in Edge runtimes and lacks cheque words.
- Bundle size comparison ($< 3\text{ KB}$ vs Numeral $15\text{ KB}$ vs Accounting $18\text{ KB}$).
- Developer FAQ accordion.

---

## 🛠️ Development & Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript check & build production assets
npm run build

# Preview production build locally
npm run preview
```

---

## 📦 Package Installation

```bash
npm install india-formatter
# or
pnpm add india-formatter
# or
yarn add india-formatter
# or
bun add india-formatter
```

---

## 📄 License

MIT © [M Rahman](https://github.com/rahman4ktr)
