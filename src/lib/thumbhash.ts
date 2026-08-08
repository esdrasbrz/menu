import { thumbHashToDataURL } from 'thumbhash';

/**
 * Decoding is pure JS and costs a fraction of a millisecond, but a grid re-renders often and an
 * album is browsed more than once per visit — so each hash is only ever turned into a data URL once.
 */
const cache = new Map<string, string>();

/** A blurred stand-in for a photo, shown until the real thumbnail decodes. */
export function blurDataUrl(thumbhash: string | null): string | undefined {
  if (!thumbhash) return undefined;

  const cached = cache.get(thumbhash);
  if (cached) return cached;

  try {
    const bytes = Uint8Array.from(atob(thumbhash), (c) => c.charCodeAt(0));
    const url = thumbHashToDataURL(bytes);
    cache.set(thumbhash, url);
    return url;
  } catch {
    // A malformed hash just means no placeholder.
    return undefined;
  }
}
