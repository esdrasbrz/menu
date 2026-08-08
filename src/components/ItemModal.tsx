import { useState } from 'react';
import { X, Sparkles, Plus, Check, Info, Heart, ChefHat } from 'lucide-react';
import type { MenuItem, FlightSelection } from '../types/menu';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToFlight: (item: MenuItem, customization?: string) => void;
  flightItems: FlightSelection[];
}

export const ItemModal: React.FC<ItemModalProps> = ({
  item,
  onClose,
  onAddToFlight,
  flightItems,
}) => {
  const [customNote, setCustomNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!item) return null;

  const isInFlight = flightItems.some(f => f.item.id === item.id);

  const handleAdd = () => {
    onAddToFlight(item, customNote.trim() ? customNote.trim() : undefined);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-content-container glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Media Hero Section */}
        <div className="modal-hero-media">
          <img src={item.image} alt={item.title} className="modal-hero-img" />
          <div className="modal-hero-gradient"></div>

          <div className="modal-hero-badges">
            {item.badge && (
              <span className="modal-signature-badge">
                <Sparkles size={13} />
                {item.badge}
              </span>
            )}
            <span className="modal-category-badge">
              {item.category.toUpperCase()}
            </span>
          </div>

          <div className="modal-title-overlay">
            <h2 className="modal-item-title">{item.title}</h2>
            <p className="modal-item-subtitle">{item.subtitle}</p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-scrollable-body">
          {/* Flavor Chips */}
          <div className="modal-tags-row">
            {item.flavorNotes.map((note, idx) => (
              <span key={idx} className="modal-flavor-chip">
                {note}
              </span>
            ))}
          </div>

          {/* Flavor Metrics Breakdown */}
          <div className="metrics-card">
            <h4 className="card-section-title">
              <Sparkles size={14} className="text-amber-400" />
              Tasting Profile & Balance
            </h4>

            <div className="metrics-grid">
              {item.metrics.sweetness !== undefined && (
                <div className="metric-row">
                  <div className="metric-header">
                    <span>Sweetness</span>
                    <span className="metric-level">{item.metrics.sweetness}/5</span>
                  </div>
                  <div className="metric-bar-track">
                    <div
                      className="metric-bar-fill"
                      style={{ width: `${(item.metrics.sweetness / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {item.metrics.intensity !== undefined && (
                <div className="metric-row">
                  <div className="metric-header">
                    <span>Intensity</span>
                    <span className="metric-level">{item.metrics.intensity}/5</span>
                  </div>
                  <div className="metric-bar-track">
                    <div
                      className="metric-bar-fill fill-warm"
                      style={{ width: `${(item.metrics.intensity / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {item.metrics.acidity !== undefined && (
                <div className="metric-row">
                  <div className="metric-header">
                    <span>Acidity / Brightness</span>
                    <span className="metric-level">{item.metrics.acidity}/5</span>
                  </div>
                  <div className="metric-bar-track">
                    <div
                      className="metric-bar-fill fill-citrus"
                      style={{ width: `${(item.metrics.acidity / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {item.metrics.bitterness !== undefined && (
                <div className="metric-row">
                  <div className="metric-header">
                    <span>Bitterness / Tannins</span>
                    <span className="metric-level">{item.metrics.bitterness}/5</span>
                  </div>
                  <div className="metric-bar-track">
                    <div
                      className="metric-bar-fill fill-bold"
                      style={{ width: `${(item.metrics.bitterness / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="body-summary">
              <span>Mouthfeel & Body:</span>
              <strong>{item.metrics.body}</strong>
            </div>
          </div>

          {/* Recipe Story */}
          <div className="story-section">
            <h4 className="card-section-title">
              <ChefHat size={15} className="text-amber-400" />
              The Recipe & Preparation Lore
            </h4>
            <p className="story-paragraph">{item.recipeStory}</p>
          </div>

          {/* Host's Secret Tip */}
          <div className="host-tip-box">
            <div className="tip-icon">
              <Heart size={16} className="text-rose-400" />
            </div>
            <div>
              <h5 className="tip-title">A Host Note from Maju & Esdras</h5>
              <p className="tip-text">{item.hostTip}</p>
            </div>
          </div>

          {/* Technical Specs & Details Grid */}
          <div className="specs-section">
            <h4 className="card-section-title">
              <Info size={15} className="text-amber-400" />
              Specifications & Origin
            </h4>

            <div className="specs-table">
              {item.specs.originOrRegion && (
                <div className="spec-row">
                  <span className="spec-key">Origin / Region</span>
                  <span className="spec-val">{item.specs.originOrRegion}</span>
                </div>
              )}
              {item.specs.roastOrVintage && (
                <div className="spec-row">
                  <span className="spec-key">Roast / Vintage</span>
                  <span className="spec-val">{item.specs.roastOrVintage}</span>
                </div>
              )}
              {item.specs.abvOrCaffeine && (
                <div className="spec-row">
                  <span className="spec-key">Potency</span>
                  <span className="spec-val">{item.specs.abvOrCaffeine}</span>
                </div>
              )}
              <div className="spec-row">
                <span className="spec-key">Method</span>
                <span className="spec-val">{item.specs.prepMethod}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">Glassware</span>
                <span className="spec-val">{item.specs.glassware}</span>
              </div>
            </div>
          </div>

          {/* Ingredients & Pairings */}
          <div className="ingredients-grid">
            <div className="sub-card">
              <h5>Curated Ingredients</h5>
              <ul>
                {item.specs.ingredients.map((ing, idx) => (
                  <li key={idx}>• {ing}</li>
                ))}
              </ul>
            </div>

            <div className="sub-card">
              <h5>Recommended Pairings</h5>
              <ul>
                {item.specs.pairings.map((p, idx) => (
                  <li key={idx}>✦ {p}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Customization Note for Flight */}
          <div className="flight-note-input-wrap">
            <label htmlFor="custom-flight-note" className="input-label">
              Add a personal note for the host (optional):
            </label>
            <input
              id="custom-flight-note"
              type="text"
              placeholder="e.g. Oat milk please, light on the syrup, extra ice..."
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="note-input"
            />
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer-actions">
          <button onClick={onClose} className="modal-cancel-btn">
            Back to Menu
          </button>

          <button
            onClick={handleAdd}
            className={`modal-confirm-btn ${isInFlight ? 'already-added' : ''}`}
          >
            {isSaved ? (
              <>
                <Check size={16} />
                <span>Added to Flight!</span>
              </>
            ) : isInFlight ? (
              <>
                <Check size={16} />
                <span>Update Flight Request</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Add to My Tasting Flight</span>
              </>
            )}
          </button>
        </div>

        <style>{`
          .modal-backdrop-overlay {
            position: fixed;
            inset: 0;
            z-index: 100;
            background: rgba(0, 0, 0, 0.82);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            animation: fadeIn 0.25s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .modal-content-container {
            position: relative;
            width: 100%;
            max-width: 680px;
            max-height: 90vh;
            border-radius: var(--radius-xl);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            background: #141210;
            border: 1px solid rgba(245, 158, 11, 0.35);
            box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 50px rgba(245, 158, 11, 0.15);
            animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes slideUp {
            from { transform: translateY(20px) scale(0.97); }
            to { transform: translateY(0) scale(1); }
          }

          .modal-close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            z-index: 10;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: rgba(12, 10, 9, 0.8);
            border: 1px solid var(--border-subtle);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: var(--transition-fast);
          }

          .modal-close-btn:hover {
            background: rgba(245, 158, 11, 0.3);
            border-color: var(--accent-gold);
            transform: rotate(90deg);
          }

          .modal-hero-media {
            position: relative;
            width: 100%;
            height: 250px;
            overflow: hidden;
            flex-shrink: 0;
          }

          .modal-hero-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .modal-hero-gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(20, 18, 16, 0.95) 100%);
          }

          .modal-hero-badges {
            position: absolute;
            top: 1rem;
            left: 1.25rem;
            display: flex;
            gap: 0.5rem;
          }

          .modal-signature-badge {
            background: rgba(12, 10, 9, 0.85);
            border: 1px solid var(--accent-gold);
            color: var(--accent-honey);
            padding: 0.25rem 0.75rem;
            border-radius: var(--radius-full);
            font-size: 0.75rem;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
          }

          .modal-category-badge {
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: var(--text-muted);
            padding: 0.25rem 0.65rem;
            border-radius: var(--radius-full);
            font-size: 0.68rem;
            font-weight: 600;
          }

          .modal-title-overlay {
            position: absolute;
            bottom: 1.25rem;
            left: 1.5rem;
            right: 1.5rem;
          }

          .modal-item-title {
            font-size: 1.85rem;
            color: #fffbeb;
            line-height: 1.15;
            margin-bottom: 0.2rem;
          }

          .modal-item-subtitle {
            font-size: 0.88rem;
            color: var(--text-muted);
          }

          .modal-scrollable-body {
            padding: 1.5rem;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .modal-tags-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
          }

          .modal-flavor-chip {
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.25);
            color: var(--accent-honey);
            font-size: 0.75rem;
            font-weight: 500;
            padding: 0.3rem 0.7rem;
            border-radius: var(--radius-full);
          }

          .card-section-title {
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 0.45rem;
            margin-bottom: 0.85rem;
          }

          .metrics-card {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            padding: 1.15rem;
          }

          .metrics-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.85rem 1.5rem;
            margin-bottom: 0.85rem;
          }

          .metric-header {
            display: flex;
            justify-content: space-between;
            font-size: 0.74rem;
            color: var(--text-muted);
            margin-bottom: 0.25rem;
          }

          .metric-level {
            font-weight: 700;
            color: var(--text-secondary);
          }

          .metric-bar-track {
            height: 6px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: var(--radius-full);
            overflow: hidden;
          }

          .metric-bar-fill {
            height: 100%;
            background: var(--accent-gold);
            border-radius: var(--radius-full);
          }

          .metric-bar-fill.fill-warm {
            background: #ea580c;
          }
          .metric-bar-fill.fill-citrus {
            background: #10b981;
          }
          .metric-bar-fill.fill-bold {
            background: #881337;
          }

          .body-summary {
            font-size: 0.8rem;
            color: var(--text-muted);
            border-top: 1px solid var(--border-subtle);
            padding-top: 0.65rem;
            display: flex;
            justify-content: space-between;
          }

          .body-summary strong {
            color: var(--accent-honey);
          }

          .story-paragraph {
            font-size: 0.92rem;
            line-height: 1.6;
            color: var(--text-secondary);
          }

          .host-tip-box {
            display: flex;
            gap: 0.85rem;
            padding: 1rem;
            background: rgba(244, 63, 94, 0.06);
            border: 1px solid rgba(244, 63, 94, 0.25);
            border-radius: var(--radius-md);
          }

          .tip-icon {
            flex-shrink: 0;
            margin-top: 0.2rem;
          }

          .tip-title {
            font-size: 0.82rem;
            font-weight: 700;
            color: #fda4af;
            margin-bottom: 0.25rem;
          }

          .tip-text {
            font-size: 0.84rem;
            line-height: 1.5;
            color: var(--text-secondary);
          }

          .specs-table {
            display: flex;
            flex-direction: column;
            background: rgba(0, 0, 0, 0.25);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            overflow: hidden;
          }

          .spec-row {
            display: flex;
            justify-content: space-between;
            padding: 0.65rem 1rem;
            border-bottom: 1px solid var(--border-subtle);
            font-size: 0.82rem;
          }

          .spec-row:last-child {
            border-bottom: none;
          }

          .spec-key {
            color: var(--text-muted);
          }

          .spec-val {
            color: #fffbeb;
            font-weight: 500;
            text-align: right;
          }

          .ingredients-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }

          .sub-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            padding: 1rem;
          }

          .sub-card h5 {
            font-size: 0.78rem;
            color: var(--accent-honey);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
          }

          .sub-card ul {
            list-style: none;
            font-size: 0.82rem;
            color: var(--text-secondary);
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
          }

          .flight-note-input-wrap {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
          }

          .input-label {
            font-size: 0.78rem;
            color: var(--text-muted);
            font-weight: 500;
          }

          .note-input {
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            padding: 0.75rem 1rem;
            color: #fff;
            font-size: 0.85rem;
            outline: none;
            transition: var(--transition-fast);
            font-family: inherit;
          }

          .note-input:focus {
            border-color: var(--accent-gold);
            box-shadow: 0 0 14px rgba(245, 158, 11, 0.2);
          }

          .modal-footer-actions {
            padding: 1.25rem 1.5rem;
            border-top: 1px solid var(--border-subtle);
            background: rgba(12, 10, 9, 0.95);
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 0.75rem;
          }

          .modal-cancel-btn {
            padding: 0.7rem 1.2rem;
            background: none;
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            color: var(--text-muted);
            font-size: 0.82rem;
            cursor: pointer;
            transition: var(--transition-fast);
          }

          .modal-cancel-btn:hover {
            color: #fff;
            background: rgba(255, 255, 255, 0.05);
          }

          .modal-confirm-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.7rem 1.45rem;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            border: 1px solid rgba(251, 191, 36, 0.4);
            border-radius: var(--radius-md);
            color: #0c0a09;
            font-size: 0.84rem;
            font-weight: 700;
            cursor: pointer;
            transition: var(--transition-fast);
            box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
          }

          .modal-confirm-btn:hover {
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
            transform: translateY(-1px);
            box-shadow: 0 6px 22px rgba(245, 158, 11, 0.45);
          }

          .modal-confirm-btn.already-added {
            background: rgba(16, 185, 129, 0.25);
            border-color: rgba(16, 185, 129, 0.6);
            color: #34d399;
          }

          @media (max-width: 640px) {
            .metrics-grid, .ingredients-grid {
              grid-template-columns: 1fr;
            }
            .modal-content-container {
              max-height: 95vh;
            }
          }
        `}</style>
      </div>
    </div>
  );
};
