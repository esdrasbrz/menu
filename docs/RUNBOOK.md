# Operations & Deployment Runbook

## 1. Local Development

### Prerequisites
- Node.js `v18+` (tested on Node `v24.7.0`)
- npm `v9+` (tested on npm `11.6.0`)

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Open browser at http://localhost:5173
```

---

## 2. Production Build & Validation

```bash
# Typecheck and produce optimized bundle in /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 3. Deployment Options

### A. Deploy to Vercel (Recommended)
```bash
npx vercel
```
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`

### B. Deploy to Netlify
```bash
npx netlify deploy --prod --dir=dist
```

### C. Deploy to GitHub Pages
Add a deploy script to `package.json`:
```json
"scripts": {
  "deploy": "vite build && gh-pages -d dist"
}
```

---

## 4. Home iPad / Kiosk Setup (Living Room Display)

For an elevated guest experience:
1. Open the deployed website in Safari on an iPad placed on the kitchen island or living room coffee table.
2. Tap the **Share** icon > **Add to Home Screen**.
3. Launch the app from the Home Screen to run in fullscreen standalone mode without browser chrome.
4. (Optional) Enable **Guided Access** under *iPad Settings > Accessibility* to lock the screen to the menu app for parties.
