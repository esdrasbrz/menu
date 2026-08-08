import type { MenuItem, FlightSelection, CategoryType } from '../types/menu';
import { MenuItemCard } from './MenuItemCard';
import { CATEGORIES } from '../data/menuData';
import { SearchX, Sparkles } from 'lucide-react';

interface MenuGridProps {
  items: MenuItem[];
  activeCategory: CategoryType;
  onSelectItem: (item: MenuItem) => void;
  onAddToFlight: (item: MenuItem) => void;
  flightItems: FlightSelection[];
  onResetFilters: () => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({
  items,
  activeCategory,
  onSelectItem,
  onAddToFlight,
  flightItems,
  onResetFilters,
}) => {
  const currentCatInfo = CATEGORIES.find(c => c.id === activeCategory);

  if (items.length === 0) {
    return (
      <div className="empty-menu-state glass-panel">
        <SearchX size={44} className="text-amber-400 opacity-60" />
        <h3 className="empty-title">No selections match your search or filter</h3>
        <p className="empty-desc">
          Try clearing your search query or selecting another taste profile from the bar above.
        </p>
        <button onClick={onResetFilters} className="reset-empty-btn">
          <Sparkles size={15} />
          <span>Reset All Filters</span>
        </button>

        <style>{`
          .empty-menu-state {
            padding: 4rem 2rem;
            text-align: center;
            border-radius: var(--radius-xl);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin: 2rem 0;
          }

          .empty-title {
            font-size: 1.35rem;
            color: #fffbeb;
          }

          .empty-desc {
            color: var(--text-muted);
            font-size: 0.9rem;
            max-width: 440px;
          }

          .reset-empty-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.65rem 1.25rem;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            border: 1px solid rgba(251, 191, 36, 0.4);
            border-radius: var(--radius-full);
            color: #0c0a09;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: var(--transition-fast);
            margin-top: 0.5rem;
          }

          .reset-empty-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(245, 158, 11, 0.35);
          }
        `}</style>
      </div>
    );
  }

  return (
    <section className="menu-grid-section">
      {/* Category Header Banner */}
      {currentCatInfo && (
        <div className="section-header-banner">
          <div className="banner-left">
            <span className="banner-eyebrow">{currentCatInfo.timeBadge}</span>
            <h2 className="banner-heading">{currentCatInfo.title}</h2>
          </div>
          <p className="banner-tagline">{currentCatInfo.tagline}</p>
        </div>
      )}

      {/* Grid of Items */}
      <div className="cards-grid">
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onSelectItem={onSelectItem}
            onAddToFlight={onAddToFlight}
            flightItems={flightItems}
          />
        ))}
      </div>

      <style>{`
        .menu-grid-section {
          margin-bottom: 4rem;
        }

        .section-header-banner {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 1.5rem;
          margin-bottom: 1.75rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
          flex-wrap: wrap;
        }

        .banner-eyebrow {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-gold);
          font-weight: 600;
          display: block;
          margin-bottom: 0.2rem;
        }

        .banner-heading {
          font-size: 1.75rem;
          color: #fffbeb;
          line-height: 1.2;
        }

        .banner-tagline {
          font-size: 0.88rem;
          color: var(--text-muted);
          max-width: 480px;
          line-height: 1.45;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 1.75rem;
        }

        @media (max-width: 640px) {
          .cards-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .banner-heading {
            font-size: 1.45rem;
          }
        }
      `}</style>
    </section>
  );
};
