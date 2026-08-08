/**
 * The slice of the Immich v3 API the album tab actually uses. Full shapes live in
 * Immich's OpenAPI spec (`AssetResponseDto`, `SharedLinkResponseDto`); only the
 * fields read here are declared.
 */

export type AssetType = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'OTHER';

export interface ImmichAsset {
  id: string;
  type: AssetType;
  width: number;
  height: number;
  /** Base64 blur placeholder, and the thumbnail cache-buster. Null until Immich has generated it. */
  thumbhash: string | null;
  /** Milliseconds, null for stills. */
  duration: number | null;
  localDateTime: string;
}

/** The proxy's own answer — not an Immich shape. Immich's shared-link endpoint is never exposed. */
export interface AlbumRef {
  albumId: string;
}

/** `POST /api/search/metadata` */
export interface AssetPage {
  items: ImmichAsset[];
  nextPage: string | null;
}
