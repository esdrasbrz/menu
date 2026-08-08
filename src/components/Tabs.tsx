import { TABS } from '../data/menu';
import type { View } from '../types/view';

interface Props {
  view: View;
  onNavigate: (view: View) => void;
}

export function Tabs({ view, onNavigate }: Props) {
  return (
    <nav className="tabs" aria-label="Seções">
      {TABS.map((tab) => (
        // Real anchors, so the tabs can be opened in a new tab and read as links.
        <a
          key={tab.id}
          className={tab.id === view ? 'tab is-active' : 'tab'}
          href={tab.path}
          aria-current={tab.id === view ? 'page' : undefined}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            onNavigate(tab.id);
          }}
        >
          {tab.title}
        </a>
      ))}
    </nav>
  );
}
