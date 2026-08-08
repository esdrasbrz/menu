import type { AlbumRef, AssetPage, ImmichAsset } from '../types/immich';

/**
 * Every Immich endpoint the app touches, in one place.
 *
 * Requests go to this app's own origin, never to Immich directly: Immich only enables CORS in dev
 * mode, and the proxy is also what keeps the shared-link key server-side. nginx (in production) and
 * the Vite dev server both map these three paths onto the Immich API and add the key.
 */
const BASE = import.meta.env.VITE_IMMICH_PROXY ?? '/immich';

/** Immich caps a search page at 1000. */
const PAGE_SIZE = 1000;

export type ThumbSize = 'thumbnail' | 'preview';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE}${path}`, init);

  if (!response.ok) {
    throw new Error(`Immich ${path} responded ${response.status}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Which album to show. The proxy answers this itself — Immich's own shared-link endpoint echoes
 * the key back in its body, so it is never exposed to the browser.
 */
export async function fetchAlbumId(): Promise<string> {
  const { albumId } = await request<AlbumRef>('/album');
  return albumId;
}

/** One page of the album, oldest first. Returns the token for the next page, or null at the end. */
export async function fetchAssetPage(albumId: string, page: number): Promise<AssetPage> {
  const body = await request<{ assets: AssetPage }>('/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      albumIds: [albumId],
      page,
      size: PAGE_SIZE,
      order: 'asc',
      withExif: false,
    }),
  });

  return body.assets;
}

/**
 * A thumbnail URL that works straight from `<img src>`, so the browser handles lazy loading,
 * caching and decoding. `c` is Immich's cache-buster: it changes when the asset is edited, which
 * is what makes the proxy's long `max-age` safe.
 */
export function thumbUrl(asset: ImmichAsset, size: ThumbSize): string {
  const params = new URLSearchParams({ size });

  if (asset.thumbhash) {
    params.set('c', asset.thumbhash);
  }

  return `${BASE}/thumb/${asset.id}?${params}`;
}
