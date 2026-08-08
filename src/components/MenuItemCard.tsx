import { Sparkles, Plus, Check, Info } from 'lucide-react';
import type { MenuItem, FlightSelection } from '../types/menu';

interface MenuItemCardProps {
  item: MenuItem;
  onSelectItem: (item: MenuItem) => void;
  onAddToFlight: (item: MenuItem) => void;
  flightItems: FlightSelection[];
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onSelectItem,
  onAddToFlight,
  flightItems,
}) => {
  const isInFlight = flightItems.some(f => f.item.id === item.id);

  return (
    <div className={`menu-item-card glass-panel ${item.isSignature ? 'is-signature-border' : ''}`}>
      {/* Visual Image Banner */}
      <div className="card-media-wrapper" onClick={() => onSelectItem(item)}>
        <img
          src={item.image}
          alt={item.title}
          className="card-media-img"
          loading="lazy"
        />
        
        {/* Floating Badges */}
        <div className="card-floating-badges">
          {item.badge && (
            <span className={`badge-pill ${item.isSignature ? 'signature-badge' : 'general-badge'}`}>
              {item.isSignature && <Sparkles size={11} />}
              {item.badge}
            </span>
          )}
          {item.timeSlot !== 'anytime' && (
            <span className="time-badge-pill">
              {item.timeSlot === 'morning' ? '☀️ Morning' : '🌙 Night'}
            </span>
          )}
        </div>
      </div>

      {/* Card Content Details */}
      <div className="card-body-section">
        <div className="card-title-group" onClick={() => onSelectItem(item)}>
          <h3 className="card-title">{item.title}</h3>
          <p className="card-subtitle">{item.subtitle}</p>
        </div>

        {/* Flavor Notes Chips */}
        <div className="card-flavor-chips">
          {item.flavorNotes.slice(0, 3).map((note, idx) => (
            <span key={idx} className="flavor-mini-chip">
              {note}
            </span>
          ))}
        </div>

        {/* Flavor Metrics Mini Indicator */}
        <div className="card-metrics-preview">
          {item.metrics.sweetness !== undefined && (
            <div className="metric-col">
              <span className="metric-name">Sweet</span>
              <div className="metric-dots">
                {[1, 2, 3, 4, 5].map((d) => (
                  <span
                    key={d}
                    className={`metric-dot ${d <= (item.metrics.sweetness || 0) ? 'filled' : ''}`}
                  />
                ))}
              </div>
            </div>
          )}
          {item.metrics.intensity !== undefined && (
            <div className="metric-col">
              <span className="metric-name">Intensity</span>
              <div className="metric-dots">
                {[1, 2, 3, 4, 5].map((d) => (
                  <span
                    key={d}
                    className={`metric-dot ${d <= (item.metrics.intensity || 0) ? 'filled-warm' : ''}`}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="metric-col body-type">
            <span className="metric-name">Body</span>
            <span className="metric-val">{item.metrics.body}</span>
          </div>
        </div>

        {/* Card Actions */}
        <div className="card-actions-grid">
          <button
            onClick={() => onSelectItem(item)}
            className="details-trigger-btn"
            title="Read tasting notes and recipe history"
          >
            <Info size={14} />
            <span>Notes</span>
          </button>

          <button
            onClick={() => onAddToFlight(item)}
            className={`flight-add-btn ${isInFlight ? 'active-in-flight' : ''}`}
            title={isInFlight ? 'Already in your tasting flight' : 'Add this drink to your tasting flight'}
          >
            {isInFlight ? (
              <>
                <Check size={14} />
                <span>In Flight</span>
              </>
            ) : (
              <>
                <Plus size={14} />
                <span>Add to Flight</span>
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .menu-item-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
          position: relative;
        }

        .menu-item-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-elevated);
          border-color: var(--border-highlight);
        }

        .is-signature-border {
          border-color: rgba(245, 158, 11, 0.3);
        }

        .card-media-wrapper {
          position: relative;
          width: 100%;
          height: 190px;
          overflow: hidden;
          cursor: pointer;
          background: #181513;
        }

        .card-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .menu-item-card:hover .card-media-img {
          transform: scale(1.08);
        }

        .card-floating-badges {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          right: 0.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          pointer-events: none;
        }

        .badge-pill {
          background: rgba(12, 10, 9, 0.85);
          backdrop-filter: blur(8px);
          border-radius: var(--radius-full);
          padding: 0.22rem 0.65rem;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .signature-badge {
          border: 1px solid var(--accent-gold);
          color: var(--accent-honey);
        }

        .general-badge {
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--text-secondary);
        }

        .time-badge-pill {
          background: rgba(12, 10, 9, 0.75);
          backdrop-filter: blur(6px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 0.2rem 0.55rem;
          font-size: 0.65rem;
          color: var(--text-muted);
          margin-left: auto;
        }

        .card-body-section {
          padding: 1.25rem 1.35rem 1.35rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-title-group {
          cursor: pointer;
          margin-bottom: 0.75rem;
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #fffbeb;
          line-height: 1.25;
          margin-bottom: 0.2rem;
          transition: color 0.2s ease;
        }

        .menu-item-card:hover .card-title {
          color: var(--accent-honey);
        }

        .card-subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.35;
        }

        .card-flavor-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 1rem;
        }

        .flavor-mini-chip {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          font-size: 0.68rem;
          color: var(--text-muted);
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-sm);
        }

        /* Metrics preview */
        .card-metrics-preview {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.55rem 0.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.15rem;
          gap: 0.5rem;
        }

        .metric-col {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .metric-name {
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-dim);
          font-weight: 600;
        }

        .metric-dots {
          display: flex;
          gap: 0.2rem;
        }

        .metric-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
        }

        .metric-dot.filled {
          background: var(--accent-gold);
          box-shadow: 0 0 4px rgba(245, 158, 11, 0.6);
        }

        .metric-dot.filled-warm {
          background: #ea580c;
          box-shadow: 0 0 4px rgba(234, 88, 12, 0.6);
        }

        .metric-col.body-type .metric-val {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .card-actions-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 0.5rem;
          margin-top: auto;
        }

        .details-trigger-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .details-trigger-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border-color: var(--border-highlight);
        }

        .flight-add-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.5rem;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.25) 100%);
          border: 1px solid rgba(245, 158, 11, 0.4);
          border-radius: var(--radius-sm);
          color: #fffbeb;
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .flight-add-btn:hover {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(217, 119, 6, 0.45) 100%);
          border-color: var(--accent-gold);
        }

        .flight-add-btn.active-in-flight {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.45);
          color: #34d399;
        }
      `}</style>
    </div>
  );
};
