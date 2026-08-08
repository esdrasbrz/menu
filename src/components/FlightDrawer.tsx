import React, { useState } from 'react';
import { X, Trash2, Sparkles, Copy, Check, Coffee, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { FlightSelection } from '../types/menu';

interface FlightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  flightItems: FlightSelection[];
  onRemoveItem: (id: string) => void;
  onClearFlight: () => void;
}

export const FlightDrawer: React.FC<FlightDrawerProps> = ({
  isOpen,
  onClose,
  flightItems,
  onRemoveItem,
  onClearFlight,
}) => {
  const [guestName, setGuestName] = useState('');
  const [generalNote, setGeneralNote] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#f43f5e', '#10b981', '#ffffff']
    });
    setIsSubmitted(true);
  };

  const copyOrderSummary = () => {
    const lines = [
      `🍸 *Guest Tasting Flight for Maju & Esdras*`,
      guestName ? `👤 Guest: ${guestName}` : '',
      `📅 Selections (${flightItems.length}):`,
      ...flightItems.map((f, i) => `  ${i + 1}. ${f.item.title}${f.customization ? ` (Note: ${f.customization})` : ''}`),
      generalNote ? `📝 General Note: ${generalNote}` : '',
      `✨ Ready for host review!`
    ].filter(Boolean);

    navigator.clipboard.writeText(lines.join('\n'));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-header-left">
            <Sparkles size={18} className="text-amber-400" />
            <div>
              <h3 className="drawer-title">Your Guest Tasting Flight</h3>
              <p className="drawer-subtitle">
                {flightItems.length} {flightItems.length === 1 ? 'item' : 'items'} curated for your visit
              </p>
            </div>
          </div>

          <button onClick={onClose} className="drawer-close-btn" aria-label="Close flight drawer">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="drawer-content-scroll">
          {flightItems.length === 0 ? (
            <div className="empty-flight-box">
              <div className="empty-icon-ring">
                <Coffee size={28} className="text-amber-400" />
              </div>
              <h4>Your flight is currently empty</h4>
              <p>
                Browse the menu and tap <strong>"+ Add to Flight"</strong> on any coffee, cocktail, wine, or grazing board to assemble your personal tasting session!
              </p>
            </div>
          ) : (
            <>
              {/* List of items */}
              <div className="flight-items-list">
                {flightItems.map((f) => (
                  <div key={f.item.id} className="flight-item-row">
                    <img src={f.item.image} alt={f.item.title} className="flight-item-thumb" />

                    <div className="flight-item-info">
                      <h4 className="flight-item-title">{f.item.title}</h4>
                      <p className="flight-item-sub">{f.item.subtitle}</p>
                      {f.customization && (
                        <p className="flight-item-note">
                          <span>Note:</span> "{f.customization}"
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => onRemoveItem(f.item.id)}
                      className="remove-flight-item-btn"
                      title="Remove this item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Guest Details */}
              <div className="guest-inputs-section">
                <div className="input-group">
                  <label htmlFor="guest-name">Your Name (optional)</label>
                  <input
                    id="guest-name"
                    type="text"
                    placeholder="e.g. Julia, Lucas, Arthur..."
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="drawer-input"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="general-note">General Hospitality / Dietary Note</label>
                  <input
                    id="general-note"
                    type="text"
                    placeholder="e.g. Less sweet, extra ice, or surprise me with wine pairings!"
                    value={generalNote}
                    onChange={(e) => setGeneralNote(e.target.value)}
                    className="drawer-input"
                  />
                </div>
              </div>

              {/* Success celebration card */}
              {isSubmitted && (
                <div className="submission-success-banner">
                  <Heart size={18} className="text-rose-400" />
                  <div>
                    <h5>Flight Ready for Maju & Esdras!</h5>
                    <p>Show this screen to your hosts or copy the summary below.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {flightItems.length > 0 && (
          <div className="drawer-footer">
            <div className="footer-aux-actions">
              <button onClick={onClearFlight} className="clear-all-btn">
                Clear all
              </button>
              <button onClick={copyOrderSummary} className="copy-summary-btn">
                {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{isCopied ? 'Summary Copied!' : 'Copy Summary'}</span>
              </button>
            </div>

            <button onClick={triggerCelebration} className="submit-flight-btn">
              <Sparkles size={16} />
              <span>Complete Tasting Flight Request</span>
            </button>
          </div>
        )}

        <style>{`
          .drawer-backdrop {
            position: fixed;
            inset: 0;
            z-index: 90;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8px);
            display: flex;
            justify-content: flex-end;
            animation: fadeIn 0.2s ease;
          }

          .drawer-panel {
            width: 100%;
            max-width: 480px;
            height: 100%;
            background: #141210;
            border-left: 1px solid var(--border-highlight);
            display: flex;
            flex-direction: column;
            box-shadow: -15px 0 50px rgba(0, 0, 0, 0.85);
            animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }

          .drawer-header {
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid var(--border-subtle);
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .drawer-header-left {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .drawer-title {
            font-size: 1.15rem;
            color: #fffbeb;
            line-height: 1.2;
          }

          .drawer-subtitle {
            font-size: 0.75rem;
            color: var(--text-muted);
          }

          .drawer-close-btn {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid var(--border-subtle);
            border-radius: 50%;
            width: 32px;
            height: 32px;
            color: var(--text-muted);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .drawer-close-btn:hover {
            color: #fff;
            background: rgba(255, 255, 255, 0.12);
          }

          .drawer-content-scroll {
            padding: 1.5rem;
            overflow-y: auto;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .empty-flight-box {
            padding: 4rem 1.5rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .empty-icon-ring {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: rgba(245, 158, 11, 0.1);
            border: 1px dashed var(--accent-gold);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .empty-flight-box h4 {
            font-size: 1.1rem;
            color: #fffbeb;
          }

          .empty-flight-box p {
            font-size: 0.84rem;
            color: var(--text-muted);
            line-height: 1.5;
          }

          .flight-items-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .flight-item-row {
            display: flex;
            align-items: center;
            gap: 0.85rem;
            padding: 0.85rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            transition: var(--transition-fast);
          }

          .flight-item-row:hover {
            background: rgba(255, 255, 255, 0.06);
            border-color: var(--border-highlight);
          }

          .flight-item-thumb {
            width: 54px;
            height: 54px;
            border-radius: var(--radius-sm);
            object-fit: cover;
            flex-shrink: 0;
          }

          .flight-item-info {
            flex-grow: 1;
          }

          .flight-item-title {
            font-size: 0.92rem;
            font-weight: 700;
            color: #fffbeb;
          }

          .flight-item-sub {
            font-size: 0.72rem;
            color: var(--text-muted);
          }

          .flight-item-note {
            font-size: 0.72rem;
            color: var(--accent-honey);
            margin-top: 0.2rem;
          }

          .remove-flight-item-btn {
            background: none;
            border: none;
            color: var(--text-dim);
            cursor: pointer;
            padding: 0.4rem;
            transition: color 0.2s ease;
          }

          .remove-flight-item-btn:hover {
            color: var(--accent-rose);
          }

          .guest-inputs-section {
            background: rgba(0, 0, 0, 0.25);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            padding: 1.15rem;
            display: flex;
            flex-direction: column;
            gap: 0.85rem;
          }

          .input-group {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
          }

          .input-group label {
            font-size: 0.72rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-dim);
            font-weight: 600;
          }

          .drawer-input {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-sm);
            padding: 0.6rem 0.85rem;
            color: #fff;
            font-size: 0.82rem;
            outline: none;
            font-family: inherit;
          }

          .drawer-input:focus {
            border-color: var(--accent-gold);
          }

          .submission-success-banner {
            display: flex;
            align-items: center;
            gap: 0.85rem;
            padding: 0.85rem 1rem;
            background: rgba(16, 185, 129, 0.12);
            border: 1px solid rgba(16, 185, 129, 0.4);
            border-radius: var(--radius-md);
            color: #34d399;
          }

          .submission-success-banner h5 {
            font-size: 0.84rem;
            font-weight: 700;
          }

          .submission-success-banner p {
            font-size: 0.75rem;
            color: var(--text-secondary);
          }

          .drawer-footer {
            padding: 1.25rem 1.5rem;
            border-top: 1px solid var(--border-subtle);
            background: rgba(12, 10, 9, 0.95);
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .footer-aux-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .clear-all-btn {
            background: none;
            border: none;
            color: var(--text-dim);
            font-size: 0.75rem;
            cursor: pointer;
          }

          .clear-all-btn:hover {
            color: var(--text-muted);
            text-decoration: underline;
          }

          .copy-summary-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-sm);
            padding: 0.35rem 0.75rem;
            font-size: 0.75rem;
            color: var(--text-secondary);
            cursor: pointer;
          }

          .copy-summary-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
          }

          .submit-flight-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            border: 1px solid rgba(251, 191, 36, 0.4);
            border-radius: var(--radius-md);
            color: #0c0a09;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            transition: var(--transition-fast);
            box-shadow: 0 4px 18px rgba(245, 158, 11, 0.3);
          }

          .submit-flight-btn:hover {
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
            transform: translateY(-1px);
            box-shadow: 0 6px 24px rgba(245, 158, 11, 0.45);
          }
        `}</style>
      </div>
    </div>
  );
};
