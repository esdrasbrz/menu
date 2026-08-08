import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { Menu } from './components/Menu';
import { ItemDetail } from './components/ItemDetail';
import { Footer } from './components/Footer';
import { Tabs } from './components/Tabs';
import { ALBUM, HOUSE, MENU, TABS } from './data/menu';
import type { MenuItem } from './types/menu';
import type { View } from './types/view';

// Split out, so a guest who only reads the menu never downloads the album or thumbhash.
const Album = lazy(() => import('./components/Album'));

function viewForPath(path: string): View {
  return TABS.find((tab) => tab.path === path)?.id ?? TABS[0].id;
}

/** Each tab carries its own palette (`theme` in menu.ts) — day and night swap by tab, not by clock. */
function themeForView(view: View): 'day' | 'night' {
  return TABS.find((tab) => tab.id === view)?.theme ?? 'day';
}

/** Left-to-right order of the tabs, for swipe navigation — matches the nav in TABS. */
const VIEW_ORDER = TABS.map((tab) => tab.id);

/** Shorter than this, or more vertical than horizontal, and it's a scroll or a tap — not a swipe. */
const SWIPE_THRESHOLD = 48;

export function App() {
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [view, setView] = useState<View>(() => viewForPath(window.location.pathname));
  const theme = themeForView(view);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // The tabs are real URLs, so back and forward have to work.
  useEffect(() => {
    const onPopState = () => setView(viewForPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((next: View) => {
    const path = TABS.find((tab) => tab.id === next)?.path ?? '/';
    window.history.pushState(null, '', path);
    setView(next);
    window.scrollTo(0, 0);
  }, []);

  const activeTab = MENU.find((tab) => tab.id === view);

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    // A dialog (item detail or the album lightbox) sits on a `.backdrop` above main and handles
    // its own swipes — main must not also react to a gesture that started inside one.
    if ((e.target as HTMLElement).closest('.backdrop')) return;

    const t = e.changedTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start) return;

      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;

      const next = VIEW_ORDER[VIEW_ORDER.indexOf(view) + (dx < 0 ? 1 : -1)];
      if (next) navigate(next);
    },
    [view, navigate],
  );

  return (
    <div className="page">
      <header className="masthead">
        <h1>{HOUSE.hosts}</h1>
        <p>{HOUSE.tagline}</p>

        <Tabs view={view} onNavigate={navigate} />
      </header>

      <main onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {view === 'album' ? (
          <Suspense fallback={<p className="album-message">{ALBUM.loading}</p>}>
            <Album />
          </Suspense>
        ) : (
          activeTab && <Menu tab={activeTab} onSelect={setSelected} />
        )}
      </main>

      <Footer />

      {selected && <ItemDetail item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default App;
