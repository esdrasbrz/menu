# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A one-page menu for guests at Maju & Esdras' home — a café section for daytime, drinks for the
evening. No backend, no ordering. Tap an item to see its photo and how it's made; guest WiFi is at
the bottom of the page.

## Commands

```bash
npm install       # install dependencies
npm run dev        # start the dev server (vite, port 5173)
npm run build       # type-check (tsc -b) then production build
npm run lint        # oxlint
npm run preview      # preview the production build
```

There is no test suite in this project.

## Language: Portuguese for guests, English for code

This app is guest-facing at a Brazilian home, so **anything the guest sees must be in Brazilian
Portuguese (pt-BR)**: menu item names, descriptions, notes, stories, host tips, section titles,
UI labels, aria-labels, page `<title>`/meta tags — everything in [`src/data/menu.ts`](src/data/menu.ts),
[`index.html`](index.html), and any user-facing strings in components.

**Everything else stays in English**: code, identifiers, comments, commit messages, and this file.
Never mix the two — don't write Portuguese in code-facing text, and don't write English in
guest-facing text.

## Architecture

React + TypeScript + Vite, no backend. The whole app is driven by one data file:

- [`src/data/menu.ts`](src/data/menu.ts) — the single source of truth for content: `HOUSE` (hosts,
  tagline, WiFi credentials) and `MENU` (an array of `MenuSection`, each with an `items` array of
  `MenuItem`). To edit the menu, edit only this file. `description` is the one line shown in the
  list; `notes`, `story`, and `hostTip` appear only in the item's detail dialog.
- [`src/types/menu.ts`](src/types/menu.ts) — the `MenuItem` / `MenuSection` shapes that `menu.ts`
  must satisfy.
- [`src/App.tsx`](src/App.tsx) — top-level layout and state: which item is selected (opens
  `ItemDetail`) and the day/night theme.
- `src/components/`
  - `MenuSection.tsx` — renders one section's heading and its list of tappable items.
  - `ItemDetail.tsx` — the dialog showing an item's photo, notes, story, and host tip.
  - `Footer.tsx` — guest WiFi details.
- `public/images/` — item photos, shown only in the detail dialog (not the list).

**Day/night theme**: the theme is derived from the device clock (day 06:00–18:00, night otherwise).
It's set once before first paint by an inline script in [`index.html`](index.html) (to avoid a
flash of the wrong theme), then re-derived by `themeForNow()` in `App.tsx` on load; the toggle in
the top-right overrides it for the rest of the visit. Both palettes live entirely as CSS custom
properties scoped under `body[data-theme="day"|"night"]` in [`src/index.css`](src/index.css) —
nothing else in the CSS hardcodes a color, so new UI should read colors from those custom
properties rather than introducing new literals.
