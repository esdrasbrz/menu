# Roadmap & Feature Matrix

## Status Summary

| Area | Status | Notes |
|---|---|---|
| **Core Framework** | ✅ Completed | React 19 + TypeScript + Vite |
| **Design System** | ✅ Completed | Vanilla CSS tokens, glassmorphism, morning/night atmospheres, Google Fonts |
| **Signature Highlight** | ✅ Completed | "Vira-Lata Caramelo" hero spotlight with tasting notes & recipe lore |
| **Catalog & Data** | ✅ Completed | Typed catalog with 8 comprehensive items across all 5 hospitality categories |
| **Imagery** | ✅ Completed | 7 photorealistic generated assets in `/public/images/` |
| **Interactive Features** | ✅ Completed | Real-time search, taste profile pills, item tasting notes modal, guest flight builder, confetti celebration, clipboard summary copy |
| **WiFi & Gear Footer** | ✅ Completed | Host credentials, brewing station equipment, house love notes |
| **TypeScript & Build** | ✅ Verified | Passes strict `tsc -b` and builds cleanly in ~500ms |

---

## What Is Currently Missing / Planned for Future Iterations

### 1. Persistence & Multi-Device Sync (Backend)
- **Currently**: The guest flight is stored in client-side React state.
- **Future**: Connect to **Supabase** or a lightweight SQLite/WebSockets backend so that when a guest taps "Complete Tasting Flight", a notification pops up on the host's phone or iPad in the kitchen!

### 2. QR Code Coaster Generator
- **Currently**: WiFi details and menu URL are shared manually.
- **Future**: Add an in-app QR code modal allowing the host to generate and print bespoke cocktail coaster cards with direct deep links to specific drink items.

### 3. Live Inventory & "On Tap" Toggle
- **Currently**: All items in `menuData.ts` are shown as available.
- **Future**: Add an optional Host Admin mode (pin-protected) to toggle items between `"On Tap / Freshly Baked"` and `"Sold Out / Restocking"`.

### 4. Background Ambient Audio Playlist
- **Currently**: Purely visual atmosphere.
- **Future**: Add an embedded ambient lo-fi / bossa nova / jazz vinyl player toggle in the header for true speakeasy immersion.

### 5. Multi-Language Support
- **Currently**: English.
- **Future**: Add Portuguese toggle (Português do Brasil) for local family & friends visiting the home.
