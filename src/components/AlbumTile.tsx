import { useState } from 'react';
import { Play } from 'lucide-react';
import { thumbUrl } from '../lib/immich';
import { blurDataUrl } from '../lib/thumbhash';
import type { ImmichAsset } from '../types/immich';

interface Props {
  asset: ImmichAsset;
  index: number;
  onSelect: (asset: ImmichAsset) => void;
}

/** Milliseconds to a clock face, for the badge on a video. */
function formatDuration(ms: number): string {
  const total = Math.round(ms / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function AlbumTile({ asset, index, onSelect }: Props) {
  const [loaded, setLoaded] = useState(false);
  const placeholder = blurDataUrl(asset.thumbhash);
  const isVideo = asset.type === 'VIDEO';

  return (
    <button
      className="tile"
      onClick={() => onSelect(asset)}
      aria-label={`Abrir a foto ${index + 1}`}
      style={placeholder ? { backgroundImage: `url(${placeholder})` } : undefined}
    >
      <img
        className={loaded ? 'tile-image is-loaded' : 'tile-image'}
        src={thumbUrl(asset, 'thumbnail')}
        alt=""
        width={asset.width}
        height={asset.height}
        // The first row is above the fold on every screen size, so eager-load it and let the
        // browser defer the rest until they are scrolled towards.
        loading={index < 3 ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />

      {isVideo && (
        <span className="tile-badge">
          <Play size={11} strokeWidth={2} fill="currentColor" />
          {asset.duration !== null && formatDuration(asset.duration)}
        </span>
      )}
    </button>
  );
}
