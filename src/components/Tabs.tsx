import { TABS } from '../data/menu';
import type { View } from '../types/view';

interface Props {
  view: View;
  onNavigate: (view: View) => void;
}

const ITEMS: { view: View; label: string; path: string }[] = [
  { view: 'menu', label: TABS.menu, path: '/' },
  { view: 'album', label: TABS.album, path: '/album' },
];

export function Tabs({ view, onNavigate }: Props) {
  return (
    <nav className="tabs" aria-label="Seções">
      {ITEMS.map((item) => (
        // Real anchors, so the tabs can be opened in a new tab and read as links.
        <a
          key={item.view}
          className={item.view === view ? 'tab is-active' : 'tab'}
          href={item.path}
          aria-current={item.view === view ? 'page' : undefined}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            onNavigate(item.view);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
