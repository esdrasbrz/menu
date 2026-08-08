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

## Deploying it

The app ships as a Docker image: [`Dockerfile`](Dockerfile) builds the site with Node and serves
the result with nginx ([`nginx.conf`](nginx.conf) — SPA fallback, gzip, long-lived caching for the
fingerprinted assets and none for `index.html`, plus a `/healthz` endpoint).

Build and run it locally:

```bash
docker build -t menu .
```

```bash
docker run --rm -p 8080:80 menu
```

On the home server, pull the published image instead. It's built for `linux/amd64` and
`linux/arm64`, listens on port 80 and has a healthcheck, so a compose service is enough:

```yaml
services:
  menu:
    image: <docker-hub-user>/menu:latest
    restart: unless-stopped
    ports:
      - '8080:80'
```

**Publishing** — [`.github/workflows/docker.yml`](.github/workflows/docker.yml) builds the image on
every pull request and pushes it to Docker Hub on `main` (as `latest` and the commit sha) and on
`v*` tags (as the version). It needs two things configured on the repository: a variable
`DOCKERHUB_USERNAME` with the Docker Hub account, and a secret `DOCKERHUB_TOKEN` with an access
token that can write to it. Until both exist the workflow still builds, and warns instead of
pushing.

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
