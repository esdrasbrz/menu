import { useEffect, useState } from 'react';
import { fetchAlbumId, fetchAssetPage } from '../lib/immich';
import type { ImmichAsset } from '../types/immich';

export type AlbumState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; assets: ImmichAsset[] };

/**
 * Survives tab switches within a visit, so coming back to the album is instant. Bump the suffix
 * whenever `Cached` changes shape, so a browser holding the old one ignores it instead of
 * half-reading it.
 */
const CACHE_KEY = 'album-cache-v2';

/**
 * How long a cached list is trusted before looking for new photos. Photos uploaded during a party
 * should turn up while it is still going on, so this is short and the grid also re-checks on this
 * interval while it is open.
 */
const FRESH_MS = 120_000;

interface Cached {
  assets: ImmichAsset[];
  fetchedAt: number;
}

/** Mirrors the cache's timestamp, so the poll doesn't re-parse the whole list to read one number. */
let fetchedAt = 0;

function readCache(): Cached | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const cached = JSON.parse(raw) as Cached;
    if (!Array.isArray(cached.assets) || typeof cached.fetchedAt !== 'number') return null;

    fetchedAt = cached.fetchedAt;
    return cached;
  } catch {
    return null;
  }
}

function writeCache(assets: ImmichAsset[]) {
  fetchedAt = Date.now();

  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ assets, fetchedAt } satisfies Cached));
  } catch {
    // A full or unavailable sessionStorage only costs us the cache.
  }
}

/** Walks every page of the album so the grid gets the whole thing in one render. */
async function loadAlbum(): Promise<ImmichAsset[]> {
  const albumId = await fetchAlbumId();

  if (!albumId) {
    throw new Error('No album configured');
  }

  const assets: ImmichAsset[] = [];
  let page: number | null = 1;

  while (page !== null) {
    const result = await fetchAssetPage(albumId, page);
    assets.push(...result.items);
    page = result.nextPage === null ? null : Number(result.nextPage);
  }

  return assets;
}

/**
 * One request at a time. A remount — StrictMode's double effect in development, or a guest
 * flipping between the tabs — joins the request already in flight instead of starting a second one.
 */
let inFlight: Promise<ImmichAsset[]> | null = null;

function load(): Promise<ImmichAsset[]> {
  inFlight ??= loadAlbum().finally(() => {
    inFlight = null;
  });

  return inFlight;
}

function sameAssets(a: ImmichAsset[], b: ImmichAsset[]): boolean {
  return a.length === b.length && a.every((asset, i) => asset.id === b[i].id);
}

export function useAlbum(): AlbumState {
  const [state, setState] = useState<AlbumState>(() => {
    const cached = readCache();
    return cached ? { status: 'ready', assets: cached.assets } : { status: 'loading' };
  });

  useEffect(() => {
    let active = true;

    const refresh = () => {
      load()
        .then((assets) => {
          writeCache(assets);
          if (!active) return;

          // Re-using the previous array when nothing changed keeps the poll from re-rendering
          // every tile on a quiet album.
          setState((current) =>
            current.status === 'ready' && sameAssets(current.assets, assets)
              ? current
              : { status: 'ready', assets },
          );
        })
        .catch(() => {
          // A failed re-check keeps showing the photos we already have; only a cold start errors.
          if (active) setState((current) => (current.status === 'ready' ? current : { status: 'error' }));
        });
    };

    const refreshIfStale = (onlyWhenVisible: boolean) => {
      if (onlyWhenVisible && document.visibilityState !== 'visible') return;
      if (Date.now() - fetchedAt < FRESH_MS) return;
      refresh();
    };

    // The first load runs whether or not the tab is in front: opening a link — or a QR code —
    // often lands the page in a background tab, and it must not sit on a spinner until it is
    // brought forward.
    refreshIfStale(false);

    // The re-checks, on the other hand, are only worth doing while someone is looking.
    const recheck = () => refreshIfStale(true);
    const timer = setInterval(recheck, FRESH_MS);
    document.addEventListener('visibilitychange', recheck);

    return () => {
      active = false;
      clearInterval(timer);
      document.removeEventListener('visibilitychange', recheck);
    };
  }, []);

  return state;
}
