import { Filter, X } from 'lucide-react';
import type { DietaryTag } from '../types/menu';

const AVAILABLE_TAGS: DietaryTag[] = [
  'Host Favorite',
  'Signature',
  'Zero Proof',
  'Single Origin',
  'Sweet & Creamy',
  'Smoky & Bold',
  'Crisp & Refreshing',
  'Natural / Pet-Nat',
  'Dairy Free',
  'Low ABV',
  'Vegan'
];

interface FilterBarProps {
  selectedTag: DietaryTag | 'all';
  onSelectTag: (tag: DietaryTag | 'all') => void;
  searchQuery: string;
  onClearSearch: () => void;
  resultCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedTag,
  onSelectTag,
  searchQuery,
  onClearSearch,
  resultCount,
}) => {
  const hasActiveFilters = selectedTag !== 'all' || searchQuery.trim().length > 0;

  return (
    <div className="filter-bar-container">
      <div className="filter-scroll-wrapper">
        <div className="filter-label">
          <Filter size={14} className="text-amber-400" />
          <span>Taste & Style:</span>
        </div>

        <button
          onClick={() => onSelectTag('all')}
          className={`filter-pill-btn ${selectedTag === 'all' ? 'active' : ''}`}
        >
          All Profiles
        </button>

        {AVAILABLE_TAGS.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className={`filter-pill-btn ${isActive ? 'active' : ''}`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="filter-status-info">
        <span className="results-count-text">
          Showing <strong>{resultCount}</strong> {resultCount === 1 ? 'selection' : 'selections'}
          {searchQuery && ` for "${searchQuery}"`}
          {selectedTag !== 'all' && ` filtered by ${selectedTag}`}
        </span>

        {hasActiveFilters && (
          <button
            onClick={() => {
              onSelectTag('all');
              onClearSearch();
            }}
            className="clear-all-filters-btn"
          >
            <X size={13} />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      <style>{`
        .filter-bar-container {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .filter-scroll-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.35rem;
          scrollbar-width: none;
        }

        .filter-scroll-wrapper::-webkit-scrollbar {
          display: none;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          margin-right: 0.25rem;
        }

        .filter-pill-btn {
          padding: 0.35rem 0.85rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-size: 0.76rem;
          font-weight: 500;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .filter-pill-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
          border-color: var(--border-highlight);
        }

        .filter-pill-btn.active {
          background: rgba(245, 158, 11, 0.2);
          border-color: var(--accent-gold);
          color: #fffbeb;
          font-weight: 600;
          box-shadow: 0 0 12px rgba(245, 158, 11, 0.2);
        }

        .filter-status-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--text-dim);
        }

        .results-count-text strong {
          color: var(--text-secondary);
        }

        .clear-all-filters-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: none;
          color: var(--accent-honey);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .clear-all-filters-btn:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
