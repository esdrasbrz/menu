import { Sparkles, Plus, Check, Wine, Coffee, Flame, Info } from 'lucide-react';
import type { MenuItem, FlightSelection } from '../types/menu';

interface HeroSectionProps {
  signatureItem: MenuItem;
  onSelectItem: (item: MenuItem) => void;
  onAddToFlight: (item: MenuItem) => void;
  flightItems: FlightSelection[];
  onScrollToMenu?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  signatureItem,
  onSelectItem,
  onAddToFlight,
  flightItems,
}) => {
  const isInFlight = flightItems.some(f => f.item.id === signatureItem.id);

  return (
    <section className="hero-section">
      <div className="hero-backdrop-glow"></div>

      <div className="hero-content">
        <div className="hero-welcome-badge">
          <Sparkles size={14} className="text-amber-400" />
          <span>Home Hospitality Experience</span>
          <span className="dot-sep">•</span>
          <span>Curated for You</span>
        </div>

        <h2 className="hero-headline">
          Welcome to <span className="gold-gradient-text">Maju & Esdras</span>
        </h2>
        <p className="hero-description">
          Whether you’ve arrived for a bright morning espresso, a sunny afternoon refresher, or an evening of craft cocktails and natural wine—our kitchen and bar are open for you. Take a look, explore tasting notes, or curate your personalized tasting flight!
        </p>

        {/* Quick Hospitality Highlights */}
        <div className="hospitality-pills">
          <div className="h-pill">
            <Coffee size={15} className="text-amber-400" />
            <span>Specialty V60 & Espresso</span>
          </div>
          <div className="h-pill">
            <Flame size={15} className="text-orange-400" />
            <span>Smoked Bar Classics</span>
          </div>
          <div className="h-pill">
            <Wine size={15} className="text-rose-400" />
            <span>Natural Skin-Contact Wines</span>
          </div>
        </div>
      </div>

      {/* Signature Spotlight Card */}
      <div className="signature-spotlight-card glass-panel">
        <div className="spotlight-image-wrap" onClick={() => onSelectItem(signatureItem)}>
          <img
            src={signatureItem.image}
            alt={signatureItem.title}
            className="spotlight-img"
            loading="eager"
          />
          <div className="spotlight-badge-overlay">
            <span className="signature-star">★</span>
            <span>House Signature Highlight</span>
          </div>
        </div>

        <div className="spotlight-body">
          <div className="spotlight-header">
            <div>
              <span className="spotlight-category">Morning & Afternoon Icon</span>
              <h3 className="spotlight-title">{signatureItem.title}</h3>
              <p className="spotlight-subtitle">{signatureItem.subtitle}</p>
            </div>
            <div className="spotlight-flavor-badge">
              <span>Sweet & Bold</span>
            </div>
          </div>

          <p className="spotlight-story">
            {signatureItem.recipeStory}
          </p>

          <div className="spotlight-tags">
            {signatureItem.flavorNotes.map((note, idx) => (
              <span key={idx} className="flavor-chip">
                {note}
              </span>
            ))}
          </div>

          <div className="spotlight-actions">
            <button
              onClick={() => onSelectItem(signatureItem)}
              className="view-details-btn"
            >
              <Info size={16} />
              <span>Tasting Notes & Lore</span>
            </button>

            <button
              onClick={() => onAddToFlight(signatureItem)}
              className={`add-flight-btn ${isInFlight ? 'added' : ''}`}
            >
              {isInFlight ? (
                <>
                  <Check size={16} />
                  <span>In Your Flight</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Add to Tasting Flight</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          padding: 3rem 0 2rem;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .hero-backdrop-glow {
          position: absolute;
          width: 500px;
          height: 350px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%);
          top: -20px;
          left: 10%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-welcome-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid var(--border-highlight);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--accent-honey);
          margin-bottom: 1.25rem;
        }

        .dot-sep {
          opacity: 0.5;
        }

        .hero-headline {
          font-size: 3.2rem;
          line-height: 1.12;
          font-weight: 800;
          letter-spacing: -0.025em;
          margin-bottom: 1.25rem;
        }

        .hero-description {
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 580px;
        }

        .hospitality-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .h-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.95rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* Signature Spotlight Card */
        .signature-spotlight-card {
          position: relative;
          z-index: 1;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: linear-gradient(160deg, rgba(30, 26, 23, 0.85) 0%, rgba(18, 16, 14, 0.95) 100%);
          border: 1px solid rgba(245, 158, 11, 0.3);
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(245, 158, 11, 0.12);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .signature-spotlight-card:hover {
          transform: translateY(-4px);
          border-color: rgba(251, 191, 36, 0.6);
          box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.85), 0 0 45px rgba(245, 158, 11, 0.22);
        }

        .spotlight-image-wrap {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
          cursor: pointer;
        }

        .spotlight-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .spotlight-image-wrap:hover .spotlight-img {
          transform: scale(1.06);
        }

        .spotlight-badge-overlay {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(12, 10, 9, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid var(--accent-gold);
          border-radius: var(--radius-full);
          padding: 0.3rem 0.85rem;
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--accent-honey);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }

        .signature-star {
          color: #fbbf24;
          font-size: 0.9rem;
        }

        .spotlight-body {
          padding: 1.5rem 1.75rem 1.75rem;
        }

        .spotlight-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.85rem;
        }

        .spotlight-category {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-gold);
          font-weight: 600;
        }

        .spotlight-title {
          font-family: var(--font-serif);
          font-size: 1.65rem;
          font-weight: 700;
          color: #fffbeb;
          margin-top: 0.2rem;
        }

        .spotlight-subtitle {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .spotlight-flavor-badge {
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: var(--accent-honey);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          white-space: nowrap;
        }

        .spotlight-story {
          font-size: 0.88rem;
          line-height: 1.55;
          color: var(--text-secondary);
          margin-bottom: 1.15rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .spotlight-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-bottom: 1.4rem;
        }

        .flavor-chip {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          font-size: 0.72rem;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          font-weight: 500;
        }

        .spotlight-actions {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 0.75rem;
        }

        .view-details-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.65rem 1rem;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .view-details-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--border-highlight);
        }

        .add-flight-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.65rem 1.1rem;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          border: 1px solid rgba(251, 191, 36, 0.4);
          border-radius: var(--radius-md);
          color: #0c0a09;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition-fast);
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.25);
        }

        .add-flight-btn:hover {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
        }

        .add-flight-btn.added {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.5);
          color: #34d399;
          box-shadow: none;
        }

        @media (max-width: 960px) {
          .hero-section {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding-top: 2rem;
          }
          .hero-headline {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .hero-headline {
            font-size: 2.1rem;
          }
          .spotlight-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
