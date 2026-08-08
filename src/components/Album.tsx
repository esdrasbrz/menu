import { useState } from 'react';
import { AlbumTile } from './AlbumTile';
import { Lightbox } from './Lightbox';
import { useAlbum } from '../hooks/useAlbum';
import { ALBUM } from '../data/menu';

/**
 * Default export so App can pull this in with React.lazy — the menu page must not pay for the
 * album's code or for thumbhash.
 */
export default function Album() {
  const state = useAlbum();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section">
      <div className="section-head">
        <h2>{ALBUM.title}</h2>
        <span className="section-hours">{ALBUM.hours}</span>
      </div>
      <p className="section-subtitle">{ALBUM.subtitle}</p>

      {state.status === 'loading' && (
        <p className="album-message" role="status">
          {ALBUM.loading}
        </p>
      )}

      {state.status === 'error' && <p className="album-message">{ALBUM.error}</p>}

      {state.status === 'ready' &&
        (state.assets.length === 0 ? (
          <p className="album-message">{ALBUM.empty}</p>
        ) : (
          <div className="album-grid">
            {state.assets.map((asset, index) => (
              <AlbumTile key={asset.id} asset={asset} index={index} onSelect={() => setOpenIndex(index)} />
            ))}
          </div>
        ))}

      {state.status === 'ready' && openIndex !== null && (
        <Lightbox
          assets={state.assets}
          index={openIndex}
          onChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
