# Architecture & Technical Design

## 1. System Overview

`Maju & Esdras` is a client-side, interactive hospitality landing page and digital menu built with **React 19**, **TypeScript**, and **Vite**, styled with **Vanilla CSS Custom Properties (Design System)** and enhanced with **Lucide Icons** and **Canvas Confetti**.

```
                        ┌──────────────────────────────┐
                        │           App.tsx            │
                        │ (Theme, Search, Filter State)│
                        └──────────────┬───────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         │                             │                             │
┌────────▼────────┐           ┌────────▼────────┐           ┌────────▼────────┐
│   Header.tsx    │           │ HeroSection.tsx │           │ CategoryTabs.tsx│
│  (Brand, Mood,  │           │ (Spotlight:     │           │ (Time slots,    │
│  Search, Tray)  │           │ Vira-Lata)      │           │  Active count)  │
└─────────────────┘           └─────────────────┘           └─────────────────┘
         │                             │                             │
         └─────────────────────────────┼─────────────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         │                             │                             │
┌────────▼────────┐           ┌────────▼────────┐           ┌────────▼────────┐
│  FilterBar.tsx  │           │   MenuGrid.tsx  │           │   Footer.tsx    │
│ (Dietary pills, │           │ (Cards layout,  │           │ (WiFi, Gear,    │
│  instant reset) │           │  Empty states)  │           │  House lore)    │
└─────────────────┘           └────────┬────────┘           └─────────────────┘
                                       │
                              ┌────────▼────────┐
                              │ MenuItemCard.tsx│
                              │ (Metrics, Tags, │
                              │  Flight Action) │
                              └────────┬────────┘
                                       │
                  ┌────────────────────┴────────────────────┐
                  │                                         │
         ┌────────▼────────┐                       ┌────────▼────────┐
         │  ItemModal.tsx  │                       │ FlightDrawer.tsx│
         │ (Tasting radar, │                       │ (Guest order,   │
         │  recipe story)  │                       │  confetti burst)│
         └─────────────────┘                       └─────────────────┘
```

---

## 2. State Flow & Lifecycle

| State Name | Scope | Description |
|---|---|---|
| `theme` | `App.tsx` | Auto-detects local hour (`day` 06:00–17:00, `night` 17:00–06:00) with manual override button. Updates `body[data-theme]`. |
| `activeCategory` | `App.tsx` | Filter by category (`all`, `morning`, `tea`, `cocktails`, `wines`, `bites`). |
| `selectedTag` | `App.tsx` | Taste profile filter (`Host Favorite`, `Signature`, `Zero Proof`, `Single Origin`, `Sweet & Creamy`, `Smoky & Bold`, etc.). |
| `searchQuery` | `App.tsx` | Real-time text search searching titles, subtitles, flavor notes, ingredient lists, and recipe lore. |
| `flightItems` | `App.tsx` | Array of `FlightSelection` chosen by the visiting guest, with custom notes. |
| `selectedModalItem` | `App.tsx` | Currently opened item for deep-dive tasting notes and recipe history. |
| `isFlightDrawerOpen`| `App.tsx` | Controls visibility of slide-out guest tasting flight tray. |

---

## 3. Design System & CSS Tokens

The styling relies on CSS Custom Properties in `src/index.css`:
- **Theme Variables**: `--bg-primary`, `--bg-secondary`, `--bg-card`, `--border-highlight`, `--accent-gold`, `--accent-honey`, `--accent-emerald`, `--accent-rose`.
- **Atmosphere**: Radial gradient orbs (`.ambient-orb`) floating in the background with keyframe drift animations.
- **Glassmorphism**: `.glass-panel` utilizing `backdrop-filter: blur(16px)` and subtle alpha borders.
- **Typography**: Google Fonts pairing:
  - Serif: `Playfair Display` (editorial headings) & `Cormorant Garamond` (luxury accents).
  - Sans-serif: `Plus Jakarta Sans` (clean modern UI).

---

## 4. File Structure

```
menu/
├── docs/                        # Complete technical & domain knowledge dump
│   ├── ARCHITECTURE.md          # This architecture document
│   ├── MENU_CATALOG.md          # Menu items, flavor notes, and recipe lore
│   ├── ROADMAP_AND_TODO.md      # Completed work vs missing/future features
│   └── RUNBOOK.md               # Dev workflow, build & kiosk deployment guide
├── public/
│   └── images/                  # High-resolution photorealistic menu assets
│       ├── vira_lata_caramelo.jpg
│       ├── specialty_pourover.jpg
│       ├── smoked_old_fashioned.jpg
│       ├── natural_wine.jpg
│       ├── matcha_latte.jpg
│       ├── espresso_martini.jpg
│       └── grazing_board.jpg
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Branding, mood switcher, search, flight badge
│   │   ├── HeroSection.tsx      # Welcome banner & Vira-Lata Caramelo spotlight
│   │   ├── CategoryTabs.tsx     # Categories with time-slots & item counts
│   │   ├── FilterBar.tsx        # Dietary & taste profile pills with reset
│   │   ├── MenuGrid.tsx         # Responsive card layout & empty state
│   │   ├── MenuItemCard.tsx     # Item card with metrics preview & quick flight add
│   │   ├── ItemModal.tsx        # Deep dive tasting notes, lore, specs & customization
│   │   ├── FlightDrawer.tsx     # Guest flight tray, summary copy, and confetti
│   │   └── Footer.tsx           # WiFi info, bar equipment, house love note
│   ├── data/
│   │   └── menuData.ts          # Typed menu catalog and host metadata
│   ├── types/
│   │   └── menu.ts              # TypeScript models (MenuItem, CategoryInfo, etc.)
│   ├── App.tsx                  # Main coordinator
│   ├── index.css                # Luxury design tokens, animations, themes
│   └── main.tsx                 # React entry point
├── index.html                   # HTML metadata & Google Fonts
├── package.json                 # Dependencies & scripts
└── vite.config.ts               # Vite configuration
```
