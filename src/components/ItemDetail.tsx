import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { MenuItem } from '../types/menu';

interface Props {
  item: MenuItem;
  onClose: () => void;
}

export function ItemDetail({ item, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div className="backdrop" onClick={onClose}>
      <div
        className="detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="detail-close" onClick={onClose} aria-label="Fechar">
          <X size={16} strokeWidth={2} />
        </button>

        <img className="detail-image" src={item.image} alt="" />

        <div className="detail-body">
          <h2 id="detail-title">{item.name}</h2>
          <p className="detail-desc">{item.description}</p>

          <ul className="detail-notes">
            {item.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>

          <p className="detail-story">{item.story}</p>

          <div className="detail-tip">
            <div className="detail-tip-label">Dica da casa</div>
            <p>{item.hostTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
