# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A menu for guests at Maju & Esdras' home, in three tabs: **Café** (daytime), **Noite** (drinks for
the evening — tap an item in either to see its photo and how it's made), and **Álbum** (photos of
guests, loaded live from a private Immich album). No ordering, and no application backend — the
album's only server-side piece is an nginx proxy.

## Commands

```bash
npm install       # install dependencies
npm run dev        # start the dev server (vite, port 5173)
npm run build       # type-check (tsc -b) then production build
npm run lint        # oxlint
npm run preview      # preview the production build
```

There is no test suite in this project.

```bash
docker build -t menu .              # build the deployable image
docker run --rm -p 8080:80 menu      # serve it on http://localhost:8080
```

## Language: Portuguese for guests, English for code

This app is guest-facing at a Brazilian home, so **anything the guest sees must be in Brazilian
Portuguese (pt-BR)**: menu item names, descriptions, notes, stories, host tips, tab and category
titles, UI labels, aria-labels, page `<title>`/meta tags — everything in [`src/data/menu.ts`](src/data/menu.ts),
[`index.html`](index.html), and any user-facing strings in components.

**Everything else stays in English**: code, identifiers, comments, commit messages, and this file.
Never mix the two — don't write Portuguese in code-facing text, and don't write English in
guest-facing text.

## Architecture

React + TypeScript + Vite. All menu content is driven by one data file:

- [`src/data/menu.ts`](src/data/menu.ts) — the single source of truth for content: `HOUSE` (hosts,
  tagline, ...), `MENU` (an array of `MenuTab` — currently `cafe` and `night` — each with a
  `categories` array of `MenuCategory`, each with an `items` array of `MenuItem`), and `ALBUM` (the
  album tab's copy and its loading, error and empty messages). To edit the menu, edit only this
  file. A category's `title` is optional — leave it unset for a category whose items need no
  heading, set it whenever a group deserves one, whether or not the tab has other categories, e.g.
  Café's `cafe-cafes` / `cafe-com-leite` / `cafe-outros`. `description` is the one line shown in
  the list; `notes`, `story`, and `hostTip` appear only in the item's detail dialog.
- [`src/types/menu.ts`](src/types/menu.ts) — the `MenuItem` / `MenuCategory` / `MenuTab` shapes that
  `menu.ts` must satisfy.
- [`src/App.tsx`](src/App.tsx) — top-level layout and state: which tab is open, which item is
  selected (opens `ItemDetail`), and the day/night theme.
- `src/components/`
  - `Tabs.tsx` — the Café / Noite / Álbum switcher, built from `MENU` plus `ALBUM`.
  - `Menu.tsx` — renders one tab: its header, then each category's items as tappable rows.
  - `ItemDetail.tsx` — the dialog showing an item's photo, notes, story, and host tip.
  - `Album.tsx` / `AlbumTile.tsx` / `Lightbox.tsx` — the album tab.
  - `Footer.tsx` — footer.
- `public/images/` — menu item photos, shown only in the detail dialog (not the list). Album photos
  do not live here; they come from Immich.

**Tabs**: one view per `MenuTab` plus `album` (`/`, `/noite`, `/album`), switched with
`history.pushState` and a `popstate` listener in `App.tsx` — there is no router, and this few views
don't warrant one. Adding a `MenuTab` needs a matching path added to `PATHS` in `Tabs.tsx` and to
`viewForPath`/`navigate` in `App.tsx`. `Album` is behind `React.lazy` so the menu page never
downloads it; keep it that way, and keep its default export.

**Categories vs. items**: a category title (when shown) is a small uppercase label — `.category-title`
— never styled like a list row, so it can't be mistaken for a tappable item. An item row always
carries a trailing chevron (`.item-chevron`) as the tap affordance. Keep that contrast — a heading
never gets a chevron, an item never loses one.

**Tab pages have no visible header at all**: the active link in `.tabs` already names the section,
so a tab page goes straight from `.tab-page`'s top border into its categories/items — no repeated
title, subtitle, or hours line. `tab.title` / `ALBUM.title` still exist as an `<h2 className="sr-only">`
for a screen-reader landmark; don't add visible header copy back without solving the redundancy
with `.tabs` and the name+description-shaped collision with `.item` rows that motivated removing it.

**The album**: photos come from a private Immich album via one shared link. `src/lib/immich.ts`
holds every endpoint the app touches — add new ones there, not inline. Three things constrain the
design, all verified against Immich v3:

- Immich only enables CORS in its own dev mode, so the browser cannot call it directly. Requests go
  to this app's origin under `/immich/`, which [`nginx.conf.template`](nginx.conf.template) (and
  `server.proxy` in [`vite.config.ts`](vite.config.ts), for `npm run dev`) maps onto Immich.
- The proxy adds the shared-link key, so it never reaches the browser. Guests can only reach the
  three whitelisted routes; anything else under `/immich/` is a 404. There is no guest gate; the
  README says how to add a passcode. **Never proxy `/api/shared-links/me`** — it echoes the key and
  the link's password back in its body. That is why `/immich/album` is answered from configuration
  and the album id is its own `MENU_*` variable.
- In v3 an album shared link returns the album but **not** its assets, so the photo list comes from
  `POST /api/search/metadata` with `albumIds` (Immich rejects a shared-link search without it). The
  key rides as a query parameter, which is why thumbnails can be plain `<img src>` rather than
  authenticated fetches.

**Freshness**: photos uploaded during a party have to show up during it. `useAlbum` re-checks the
list every two minutes while the album is visible and on `visibilitychange`, serving the cached list
meanwhile so the grid never blanks. The list is never HTTP-cached; individual thumbnails are cached
hard (30 days, immutable) because their URLs are content-addressed — a new photo has a new id and an
edited one a new `c=` thumbhash. Keep that split: cache the images, never the list.

**Deployment**: [`Dockerfile`](Dockerfile) builds the site with Node and serves `dist/` with nginx
using [`nginx.conf.template`](nginx.conf.template) (SPA fallback, gzip, immutable caching for
`/assets/`, the `/immich/` album routes, `/healthz`). The nginx image renders the template at
start-up with envsubst; `NGINX_ENVSUBST_FILTER=^MENU_` keeps it away from nginx's own `$variables`,
so **any new runtime setting must be named `MENU_*`**. The build stage is pinned to `$BUILDPLATFORM`
because the output is static, so multi-arch images build without emulation.
[`.github/workflows/docker.yml`](.github/workflows/docker.yml) publishes it to Docker Hub for the
home server; see the README for the variables and secrets it needs.

**Day/night theme**: the theme is derived from the device clock (day 06:00–18:00, night otherwise).
It's set once before first paint by an inline script in [`index.html`](index.html) (to avoid a
flash of the wrong theme), then re-derived by `themeForNow()` in `App.tsx` on load; the toggle in
the top-right overrides it for the rest of the visit. Both palettes live entirely as CSS custom
properties scoped under `body[data-theme="day"|"night"]` in [`src/index.css`](src/index.css) —
nothing else in the CSS hardcodes a color, so new UI should read colors from those custom
properties rather than introducing new literals.
