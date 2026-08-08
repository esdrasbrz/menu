import React from 'react';
import { Wifi, Coffee, Sparkles } from 'lucide-react';
import { HOUSE_RULES_AND_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-card glass-panel">
        <div className="footer-top-grid">
          {/* Hospitality Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="footer-crest">M&E</span>
              <div>
                <h4 className="footer-title">{HOUSE_RULES_AND_INFO.hostNames}</h4>
                <p className="footer-tagline">{HOUSE_RULES_AND_INFO.tagline}</p>
              </div>
            </div>
            <p className="footer-desc">{HOUSE_RULES_AND_INFO.hospitalityNote}</p>
          </div>

          {/* Guest WiFi Info */}
          <div className="footer-col info-card">
            <div className="info-header">
              <Wifi size={16} className="text-amber-400" />
              <h5>Guest High-Speed WiFi</h5>
            </div>
            <div className="wifi-specs">
              <div className="wifi-row">
                <span className="wifi-label">Network:</span>
                <code className="wifi-code">{HOUSE_RULES_AND_INFO.wifiNetwork}</code>
              </div>
              <div className="wifi-row">
                <span className="wifi-label">Password:</span>
                <code className="wifi-code">{HOUSE_RULES_AND_INFO.wifiPassword}</code>
              </div>
            </div>
          </div>

          {/* House Bar & Coffee Station */}
          <div className="footer-col info-card">
            <div className="info-header">
              <Coffee size={16} className="text-amber-400" />
              <h5>Bar & Coffee Station</h5>
            </div>
            <p className="gear-text">{HOUSE_RULES_AND_INFO.coffeeGear}</p>
            <p className="gear-sub">{HOUSE_RULES_AND_INFO.cocktailStation}</p>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-love-note">
            Crafted for friends & family visiting <strong>Maju & Esdras</strong>. Always feel free to ask for a custom drink creation!
          </p>
          <div className="footer-tag-badge">
            <Sparkles size={13} />
            <span>Casa Menu v1.0</span>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          margin-top: 5rem;
        }

        .footer-card {
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          background: rgba(18, 16, 14, 0.9);
          border: 1px solid var(--border-highlight);
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }

        .footer-crest {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b 0%, #881337 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-family: var(--font-serif);
          font-weight: 800;
          font-size: 0.85rem;
        }

        .footer-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: #fffbeb;
        }

        .footer-tagline {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .footer-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .info-card {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.25rem;
        }

        .info-header {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: #fffbeb;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .wifi-specs {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .wifi-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
        }

        .wifi-label {
          color: var(--text-muted);
        }

        .wifi-code {
          background: rgba(255, 255, 255, 0.08);
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-sm);
          color: var(--accent-honey);
          font-size: 0.78rem;
          font-family: monospace;
        }

        .gear-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin-bottom: 0.4rem;
        }

        .gear-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .footer-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .footer-love-note {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .footer-love-note strong {
          color: var(--text-secondary);
        }

        .footer-tag-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          color: var(--accent-honey);
          background: rgba(245, 158, 11, 0.1);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(245, 158, 11, 0.25);
        }

        @media (max-width: 900px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
};
