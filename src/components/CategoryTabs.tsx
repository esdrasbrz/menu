import { Sparkles, Coffee, Wine, Utensils, GlassWater, Leaf } from 'lucide-react';
import { CATEGORIES } from '../data/menuData';
import type { CategoryType, MenuItem } from '../types/menu';

interface CategoryTabsProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  items: MenuItem[];
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
  items,
}) => {
  const getIcon = (id: CategoryType) => {
    switch (id) {
      case 'morning':
        return <Coffee size={18} />;
      case 'tea':
        return <Leaf size={18} />;
      case 'cocktails':
        return <GlassWater size={18} />;
      case 'wines':
        return <Wine size={18} />;
      case 'bites':
        return <Utensils size={18} />;
      default:
        return <Sparkles size={18} />;
    }
  };

  const getItemCount = (catId: CategoryType) => {
    if (catId === 'all') return items.length;
    return items.filter(item => item.category === catId).length;
  };

  return (
    <div className="category-tabs-container">
      <div className="category-scroll-track">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = getItemCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`category-tab-btn ${isActive ? 'active' : ''}`}
              aria-selected={isActive}
              role="tab"
            >
              <div className="cat-icon-wrap">{getIcon(cat.id)}</div>
              <div className="cat-meta-wrap">
                <span className="cat-title">{cat.shortTitle}</span>
                <span className="cat-time-badge">{cat.timeBadge}</span>
              </div>
              <span className="cat-count-badge">{count}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        .category-tabs-container {
          position: sticky;
          top: 66px;
          z-index: 30;
          padding: 1rem 0;
          background: rgba(12, 10, 9, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        body[data-theme="day"] .category-tabs-container {
          background: rgba(22, 18, 15, 0.95);
        }

        .category-scroll-track {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.35rem;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .category-scroll-track::-webkit-scrollbar {
          display: none;
        }

        .category-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 1.15rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .category-tab-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--border-highlight);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        .category-tab-btn.active {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(217, 119, 6, 0.28) 100%);
          border-color: var(--accent-gold);
          color: #fffbeb;
          box-shadow: 0 4px 18px rgba(245, 158, 11, 0.2);
        }

        .cat-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-honey);
        }

        .cat-meta-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.15;
        }

        .cat-title {
          font-weight: 600;
          font-size: 0.85rem;
        }

        .cat-time-badge {
          font-size: 0.65rem;
          color: var(--text-dim);
          font-weight: 500;
        }

        .category-tab-btn.active .cat-time-badge {
          color: var(--accent-gold);
        }

        .cat-count-badge {
          background: rgba(255, 255, 255, 0.08);
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .category-tab-btn.active .cat-count-badge {
          background: var(--accent-gold);
          color: #0c0a09;
        }
      `}</style>
    </div>
  );
};
