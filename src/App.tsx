import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { MenuSection } from './components/MenuSection';
import { ItemDetail } from './components/ItemDetail';
import { Footer } from './components/Footer';
import { Tabs } from './components/Tabs';
import { ALBUM, HOUSE, MENU } from './data/menu';
import type { MenuItem } from './types/menu';
import type { View } from './types/view';

// Split out, so a guest who only reads the menu never downloads the album or thumbhash.
const Album = lazy(() => import('./components/Album'));

/** Day between 06:00 and 18:00, night otherwise. */
function themeForNow(): 'day' | 'night' {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'day' : 'night';
}

function viewForPath(path: string): View {
  return path === '/album' ? 'album' : 'menu';
}

export function App() {
  const [theme, setTheme] = useState(themeForNow);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [view, setView] = useState<View>(() => viewForPath(window.location.pathname));

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
    window.history.pushState(null, '', next === 'album' ? '/album' : '/');
    setView(next);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page">
      <header className="masthead">
        <button
          className="theme-toggle"
          onClick={() => setTheme((t) => (t === 'day' ? 'night' : 'day'))}
          aria-label={theme === 'day' ? 'Mudar para o modo noite' : 'Mudar para o modo dia'}
        >
          {theme === 'day' ? <Moon size={17} strokeWidth={1.6} /> : <Sun size={17} strokeWidth={1.6} />}
        </button>

        <h1>{HOUSE.hosts}</h1>
        <p>{HOUSE.tagline}</p>

        <Tabs view={view} onNavigate={navigate} />
      </header>

      <main>
        {view === 'menu' ? (
          MENU.map((section) => (
            <MenuSection key={section.id} section={section} onSelect={setSelected} />
          ))
        ) : (
          <Suspense fallback={<p className="album-message">{ALBUM.loading}</p>}>
            <Album />
          </Suspense>
        )}
      </main>

      <Footer />

      {selected && <ItemDetail item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default App;
