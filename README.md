# Maju & Esdras — Menu

A menu for guests at our home, in two tabs. **Cardápio** is the menu itself — café for the daytime,
drinks for the evening; tap an item to see its photo and how it's made. **Álbum** is a gallery of
guests, loaded live from a private album on our Immich server.

## Running it

```bash
npm install
```

For the album tab, copy [`.env.example`](.env.example) to `.env.local` and fill in the Immich URL
and share key (see [Álbum](#álbum)). Without it the menu still runs; only the album tab fails.

```bash
npm run dev
```

```bash
npm run build
```

## Checks

`npm install` also installs a git pre-commit hook (husky) that runs the linter and the type
checker. Both are quick — under two seconds together — and a failure stops the commit.

```bash
npm run lint
```

```bash
npm run typecheck
```

Lint severity lives in [`.oxlintrc.json`](.oxlintrc.json): the `correctness` category is an error
and blocks commits, while rules set to `warn` are advisory and don't. In a genuine emergency
`git commit --no-verify` skips the hook, but the same checks run again in CI on every pull request,
so the branch still has to pass.

## Álbum

The photos in the album tab live in a private Immich album — nothing is committed to this repo, and
adding a photo means uploading it to Immich, not deploying.

**Setting it up, once:**

1. In Immich, make an album and put the photos in it. Keep it private; it is never shared with
   anyone directly.
2. Note the album's id — it's in the URL while you're looking at it,
   `http://<immich>/albums/<album-id>`.
3. Create a **shared link** for that album — album type, no expiry. Don't set a password on it (see
   the note below on what the password does and does not protect). The link looks like
   `http://<immich>/share/<key>`; the last segment is the key.

**Configuring the container** — three variables, all read at start-up, none baked into the image:

| Variable                | Example             | What it is                                            |
| ----------------------- | ------------------- | ----------------------------------------------------- |
| `MENU_IMMICH_UPSTREAM`  | `192.168.0.10:2283` | Host and port where the menu container reaches Immich |
| `MENU_IMMICH_ALBUM_ID`  | `3f2c9a1e-…`        | The album to show                                     |
| `MENU_IMMICH_SHARE_KEY` | `k7Qz2pRt…`         | The key from that album's shared link                 |

```yaml
services:
  menu:
    image: <docker-hub-user>/menu:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      MENU_IMMICH_UPSTREAM: 192.168.0.10:2283
      MENU_IMMICH_ALBUM_ID: <album id>
      MENU_IMMICH_SHARE_KEY: <key from the shared link>
```

The album id and the key have to refer to the same album; if they don't, the album tab fails loudly
rather than showing the wrong photos. The upstream name is resolved when nginx starts, so if Immich
moves, restart the container.

**How it works** — [`nginx.conf.template`](nginx.conf.template) exposes exactly three routes, and
adds the key itself so it never reaches a guest's browser:

```
GET  /immich/album         →  answered by nginx: {"albumId": "…"}
POST /immich/search        →  POST /api/search/metadata?key=…    a page of photos
GET  /immich/thumb/<uuid>  →  GET  /api/assets/<uuid>/thumbnail?key=…&size=…
```

A UUID-only path pattern, one allowed method per route, a whitelist of two thumbnail sizes, and a
404 on anything else under `/immich/` are what keep this from being a general proxy into Immich. The
proxy is not optional: Immich only enables CORS in its own dev mode, so the browser cannot call it
cross-origin.

Three Immich details worth knowing if you change any of this:

- An album shared link does **not** return its photos in v3, which is why the photo list comes from
  a search scoped by `albumIds` rather than from the link itself.
- `/api/shared-links/me` would give us the album id, but it echoes the key — and the link's
  password — straight back in its response body. That is why nginx answers `/immich/album` from
  configuration instead of proxying it, and why the album id is its own variable.
- The shared-link **password only protects that listing**; asset bytes are reachable with the key
  alone. The key is the real secret, which is why it stays server-side.

**Who can see it** — there is no guest gate: anyone who can reach the menu can see the album. To add
a passcode, hash it in the browser into a cookie and have nginx check it, which is a `map` plus one
line in each of the three locations:

```nginx
map $cookie_album_key $album_ok {
    default 0;
    "<sha-256 of the passcode>" 1;
}
# then, inside each location = /immich/... block:
if ($album_ok = 0) { return 403; }
```

## Deploying it

The app ships as a Docker image: [`Dockerfile`](Dockerfile) builds the site with Node and serves
the result with nginx ([`nginx.conf.template`](nginx.conf.template) — SPA fallback, gzip, long-lived
caching for the fingerprinted assets and none for `index.html`, the `/immich` album routes, plus a
`/healthz` endpoint). The template is rendered at container start by the nginx image's own envsubst
step, which is how the two `MENU_*` variables get in.

Build and run it locally:

```bash
docker build -t menu .
```

```bash
docker run --rm -p 8080:80 -e MENU_IMMICH_UPSTREAM=192.168.0.10:2283 -e MENU_IMMICH_ALBUM_ID=<album id> -e MENU_IMMICH_SHARE_KEY=<key> menu
```

On the home server, pull the published image instead. It's built for `linux/amd64` and
`linux/arm64`, listens on port 80 and has a healthcheck, so a compose service is enough — see
[Álbum](#álbum) for the compose snippet and the two variables it needs.

**Publishing** — [`.github/workflows/docker.yml`](.github/workflows/docker.yml) builds the image on
every pull request and pushes it to Docker Hub on `main` (as `latest` and the commit sha) and on
`v*` tags (as the version). It needs two things configured on the repository: a variable
`DOCKERHUB_USERNAME` with the Docker Hub account, and a secret `DOCKERHUB_TOKEN` with an access
token that can write to it. Until both exist the workflow still builds, and warns instead of
pushing.

## How it's put together

React + TypeScript + Vite. No application backend and no ordering — it's a menu, not a shop. The
album's only server-side piece is the nginx proxy described above.

```
src/
  App.tsx                    theme state, page layout, which tab is open
  index.css                  the whole design system, day + night
  data/menu.ts               every item, the tab labels, the album copy, ...
  types/menu.ts              MenuItem, MenuSection
  types/immich.ts            the slice of the Immich API we read
  types/view.ts              the two tabs
  lib/immich.ts              every Immich endpoint, in one place
  lib/thumbhash.ts           blur placeholders, memoised
  hooks/useAlbum.ts          loads and caches the album for the visit
  components/
    Tabs.tsx                 Cardápio / Álbum
    MenuSection.tsx          a section heading and its list of items
    ItemDetail.tsx           the dialog with the photo and story
    Album.tsx                the photo grid (lazy-loaded)
    AlbumTile.tsx            one photo in the grid
    Lightbox.tsx             the full-screen photo viewer
    Footer.tsx               standard footer
public/images/               menu photos, shown only in the detail dialog
```

**Editing the menu** — everything is in [`src/data/menu.ts`](src/data/menu.ts). Add an item to a
section's `items` array; the `description` is the one line shown in the list, and `notes`, `story`
and `hostTip` only appear when the item is tapped.

**Keeping it quick** — the album is behind `React.lazy`, so a guest who only reads the menu never
downloads it. The grid asks Immich for its small webp thumbnails and lets the browser lazy-load
them, each tile is a fixed square backed by a thumbhash blur so nothing shifts as photos arrive, and
the full-size image is only fetched when a photo is opened.

**How soon new photos show up** — within about two minutes. The photo _list_ is re-checked every
two minutes while the album is on screen (and whenever the tab is brought back to the foreground),
so photos uploaded during a party appear without anyone reloading. The list itself is never cached
by the browser; what is cached for 30 days is each individual thumbnail, which is safe because a new
photo has a new id and an edited one gets a new `c=` cache-buster — neither can be served stale.
Guests see the photos they already had straight away and new ones fill in behind, so a re-check
never blanks the grid or shows a spinner.

**Day and night** — day is warm paper, night is low light. The theme is picked from the device
clock (day 06:00–18:00) by an inline script in [`index.html`](index.html) so there's no flash on
load, then the toggle in the top-right overrides it for the visit. Both palettes are defined as
custom properties under `body[data-theme=...]` in [`src/index.css`](src/index.css); nothing else in
the CSS hardcodes a colour.
