import { Sparkles, Sun, Moon, Search } from 'lucide-react';
import type { FlightSelection } from '../types/menu';

interface HeaderProps {
  theme: 'day' | 'night';
  onToggleTheme: () => void;
  flightItems: FlightSelection[];
  onOpenFlightDrawer: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  flightItems,
  onOpenFlightDrawer,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand & Crest */}
        <div className="brand-wrapper">
          <div className="brand-crest">
            <span className="crest-initials">M&E</span>
          </div>
          <div className="brand-text">
            <h1 className="brand-title">Maju & Esdras</h1>
            <p className="brand-subtitle">Home Cafe, Cocktail Bar & Wine Cellar</p>
          </div>
        </div>

        {/* Live Host Status Banner */}
        <div className="host-status-badge">
          <span className="beacon-dot"></span>
          <span className="status-text">
            <span className="status-highlight">Hosts are home</span> • Ready to brew & stir
          </span>
        </div>

        {/* Action Controls: Search, Theme Toggle, Flight Tray */}
        <div className="header-actions">
          {/* Quick Search */}
          <div className="header-search">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search coffee, cocktails, wines..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="clear-search-btn"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Day / Night Mood Switcher */}
          <button
            onClick={onToggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'day' ? 'Speakeasy Night' : 'Sunlit Morning'} mood`}
            aria-label="Toggle atmosphere mode"
          >
            {theme === 'day' ? (
              <>
                <Sun size={17} className="text-amber-400" />
                <span className="btn-label">Morning Cafe</span>
              </>
            ) : (
              <>
                <Moon size={17} className="text-amber-300" />
                <span className="btn-label">Night Bar</span>
              </>
            )}
          </button>

          {/* Guest Flight / Tasting Tray Button */}
          <button
            onClick={onOpenFlightDrawer}
            className={`flight-tray-btn ${flightItems.length > 0 ? 'has-items' : ''}`}
            aria-label="View guest tasting flight"
          >
            <Sparkles size={17} className="flight-icon" />
            <span className="flight-btn-text">Guest Flight</span>
            <span className="flight-badge-count">{flightItems.length}</span>
          </button>
        </div>
      </div>

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 40;
          background: rgba(12, 10, 9, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 0.85rem 1.5rem;
          transition: var(--transition-normal);
        }

        body[data-theme="day"] .site-header {
          background: rgba(22, 18, 15, 0.92);
        }

        .header-inner {
          max-width: 1320px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .brand-wrapper {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          text-decoration: none;
        }

        .brand-crest {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b 0%, #881337 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid rgba(251, 191, 36, 0.4);
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.25);
          flex-shrink: 0;
        }

        .crest-initials {
          font-family: var(--font-serif);
          font-weight: 800;
          font-size: 0.95rem;
          color: #fffbeb;
          letter-spacing: 0.05em;
        }

        .brand-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #fafaf9 0%, #fbbf24 65%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.2;
        }

        .brand-subtitle {
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 500;
        }

        .host-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-full);
          font-size: 0.76rem;
          color: var(--text-secondary);
        }

        .status-highlight {
          color: #34d399;
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .header-search {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 0.45rem 2rem 0.45rem 2.2rem;
          color: var(--text-primary);
          font-size: 0.82rem;
          width: 220px;
          outline: none;
          transition: var(--transition-fast);
          font-family: inherit;
        }

        .search-input:focus {
          border-color: var(--accent-gold);
          background: rgba(255, 255, 255, 0.09);
          width: 260px;
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.15);
        }

        .clear-search-btn {
          position: absolute;
          right: 0.65rem;
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.75rem;
          cursor: pointer;
          padding: 0.2rem;
        }

        .theme-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.85rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          color: var(--text-primary);
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .theme-toggle-btn:hover {
          background: rgba(245, 158, 11, 0.15);
          border-color: var(--border-highlight);
          transform: translateY(-1px);
        }

        .flight-tray-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1rem;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.3) 100%);
          border: 1px solid var(--border-highlight);
          border-radius: var(--radius-full);
          color: #fffbeb;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
          box-shadow: 0 2px 10px rgba(245, 158, 11, 0.15);
        }

        .flight-tray-btn:hover {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.35) 0%, rgba(217, 119, 6, 0.45) 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(245, 158, 11, 0.3);
        }

        .flight-tray-btn.has-items {
          border-color: var(--accent-gold);
          animation: pulseHighlight 3s infinite ease-in-out;
        }

        @keyframes pulseHighlight {
          0%, 100% {
            box-shadow: 0 0 10px rgba(245, 158, 11, 0.2);
          }
          50% {
            box-shadow: 0 0 22px rgba(245, 158, 11, 0.45);
          }
        }

        .flight-badge-count {
          background: var(--accent-gold);
          color: #0c0a09;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.12rem 0.45rem;
          border-radius: var(--radius-full);
          min-width: 18px;
          text-align: center;
        }

        @media (max-width: 900px) {
          .host-status-badge {
            display: none;
          }
          .search-input {
            width: 170px;
          }
          .search-input:focus {
            width: 190px;
          }
        }

        @media (max-width: 640px) {
          .header-inner {
            gap: 0.75rem;
          }
          .header-search {
            order: 3;
            width: 100%;
          }
          .search-input {
            width: 100% !important;
          }
          .btn-label {
            display: none;
          }
          .flight-btn-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
