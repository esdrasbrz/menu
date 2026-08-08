import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { thumbUrl } from '../lib/immich';
import { blurDataUrl } from '../lib/thumbhash';
import type { ImmichAsset } from '../types/immich';

interface Props {
  assets: ImmichAsset[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}

/** Shorter than this and it's a tap, not a swipe. */
const SWIPE_THRESHOLD = 48;

export function Lightbox({ assets, index, onChange, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  const asset = assets[index];
  const hasPrevious = index > 0;
  const hasNext = index < assets.length - 1;

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Mirrors ItemDetail: Escape closes, and the page behind must not scroll.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrevious) onChange(index - 1);
      if (e.key === 'ArrowRight' && hasNext) onChange(index + 1);
    };
    document.addEventListener('keydown', onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [index, hasPrevious, hasNext, onChange, onClose]);

  // A new photo starts undecoded, so the blur takes over again rather than showing the old one.
  useEffect(() => {
    setLoaded(false);
  }, [asset.id]);

  const placeholder = blurDataUrl(asset.thumbhash);

  return (
    <div
      className="backdrop is-lightbox"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        if (start === null) return;
        touchStartX.current = null;

        const dx = e.changedTouches[0].clientX - start;
        if (dx > SWIPE_THRESHOLD && hasPrevious) onChange(index - 1);
        if (dx < -SWIPE_THRESHOLD && hasNext) onChange(index + 1);
      }}
    >
      <div
        className="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={`Foto ${index + 1} de ${assets.length}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="detail-close" onClick={onClose} aria-label="Fechar">
          <X size={16} strokeWidth={2} />
        </button>

        <img
          className={loaded ? 'lightbox-image is-loaded' : 'lightbox-image'}
          src={thumbUrl(asset, 'preview')}
          alt=""
          width={asset.width}
          height={asset.height}
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={placeholder ? { backgroundImage: `url(${placeholder})` } : undefined}
        />

        {hasPrevious && (
          <button
            className="lightbox-nav is-previous"
            onClick={() => onChange(index - 1)}
            aria-label="Foto anterior"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
        )}

        {hasNext && (
          <button
            className="lightbox-nav is-next"
            onClick={() => onChange(index + 1)}
            aria-label="Próxima foto"
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        )}

        <p className="lightbox-count">
          {index + 1} / {assets.length}
        </p>
      </div>
    </div>
  );
}
