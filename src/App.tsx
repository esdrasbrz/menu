import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { MenuSection } from './components/MenuSection';
import { ItemDetail } from './components/ItemDetail';
import { Footer } from './components/Footer';
import { HOUSE, MENU } from './data/menu';
import type { MenuItem } from './types/menu';

/** Day between 06:00 and 18:00, night otherwise. */
function themeForNow(): 'day' | 'night' {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'day' : 'night';
}

export function App() {
  const [theme, setTheme] = useState(themeForNow);
  const [selected, setSelected] = useState<MenuItem | null>(null);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="page">
      <header className="masthead">
        <button
          className="theme-toggle"
          onClick={() => setTheme((t) => (t === 'day' ? 'night' : 'day'))}
          aria-label={theme === 'day' ? 'Switch to night' : 'Switch to day'}
        >
          {theme === 'day' ? <Moon size={17} strokeWidth={1.6} /> : <Sun size={17} strokeWidth={1.6} />}
        </button>

        <h1>{HOUSE.hosts}</h1>
        <p>{HOUSE.tagline}</p>
      </header>

      <main>
        {MENU.map((section) => (
          <MenuSection key={section.id} section={section} onSelect={setSelected} />
        ))}
      </main>

      <Footer />

      {selected && <ItemDetail item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default App;
