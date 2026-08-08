# Maju & Esdras — Menu

A one-page menu for guests at our home. Two sections: café for the daytime, drinks for the evening.
Tap an item to see its photo and how it's made. Guest WiFi is at the bottom.

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

## How it's put together

React + TypeScript + Vite. No backend, no ordering — it's a menu, not a shop.

```
src/
  App.tsx                    theme state, page layout
  index.css                  the whole design system, day + night
  data/menu.ts               every item and the WiFi details
  types/menu.ts              MenuItem, MenuSection
  components/
    MenuSection.tsx          a section heading and its list of items
    ItemDetail.tsx           the dialog with the photo and story
    Footer.tsx               guest WiFi
public/images/               photos, shown only in the detail dialog
```

**Editing the menu** — everything is in [`src/data/menu.ts`](src/data/menu.ts). Add an item to a
section's `items` array; the `description` is the one line shown in the list, and `notes`, `story`
and `hostTip` only appear when the item is tapped.

**Day and night** — day is warm paper, night is low light. The theme is picked from the device
clock (day 06:00–18:00) by an inline script in [`index.html`](index.html) so there's no flash on
load, then the toggle in the top-right overrides it for the visit. Both palettes are defined as
custom properties under `body[data-theme=...]` in [`src/index.css`](src/index.css); nothing else in
the CSS hardcodes a colour.
