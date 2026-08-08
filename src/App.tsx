import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryTabs } from './components/CategoryTabs';
import { FilterBar } from './components/FilterBar';
import { MenuGrid } from './components/MenuGrid';
import { ItemModal } from './components/ItemModal';
import { FlightDrawer } from './components/FlightDrawer';
import { Footer } from './components/Footer';
import { MENU_ITEMS } from './data/menuData';
import type { CategoryType, DietaryTag, MenuItem, FlightSelection } from './types/menu';

export function App() {
  // Theme state: auto-detect from local time or manual toggle
  const [theme, setTheme] = useState<'day' | 'night'>(() => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 17 ? 'day' : 'night';
  });

  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [selectedTag, setSelectedTag] = useState<DietaryTag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModalItem, setSelectedModalItem] = useState<MenuItem | null>(null);
  const [isFlightDrawerOpen, setIsFlightDrawerOpen] = useState(false);
  const [flightItems, setFlightItems] = useState<FlightSelection[]>([]);

  // Update HTML body theme attribute
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'day' ? 'night' : 'day'));
  };

  // Find signature item (Vira-Lata Caramelo)
  const signatureItem = useMemo(() => {
    return MENU_ITEMS.find(item => item.id === 'vira-lata-caramelo') || MENU_ITEMS[0];
  }, []);

  // Filter menu items by category, tag, and search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // 2. Tag match
      if (selectedTag !== 'all' && !item.tags.includes(selectedTag)) {
        return false;
      }

      // 3. Search query match
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesSubtitle = item.subtitle.toLowerCase().includes(query);
        const matchesFlavor = item.flavorNotes.some(note => note.toLowerCase().includes(query));
        const matchesTag = item.tags.some(tag => tag.toLowerCase().includes(query));
        const matchesStory = item.recipeStory.toLowerCase().includes(query);
        const matchesIngredients = item.specs.ingredients.some(ing => ing.toLowerCase().includes(query));

        if (!matchesTitle && !matchesSubtitle && !matchesFlavor && !matchesTag && !matchesStory && !matchesIngredients) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, selectedTag, searchQuery]);

  // Flight Tray Actions
  const handleAddToFlight = (item: MenuItem, customization?: string) => {
    setFlightItems(prev => {
      const exists = prev.find(f => f.item.id === item.id);
      if (exists) {
        // Update customization note
        return prev.map(f => f.item.id === item.id ? { ...f, customization } : f);
      }
      return [...prev, { item, customization, addedAt: Date.now() }];
    });
  };

  const handleRemoveFromFlight = (id: string) => {
    setFlightItems(prev => prev.filter(f => f.item.id !== id));
  };

  const handleClearFlight = () => {
    setFlightItems([]);
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSelectedTag('all');
    setSearchQuery('');
  };

  return (
    <div className="menu-app">
      {/* Dynamic Ambient Glow Lighting */}
      <div className="ambient-bg">
        <div className="ambient-orb ambient-orb-1"></div>
        <div className="ambient-orb ambient-orb-2"></div>
        <div className="ambient-orb ambient-orb-3"></div>
      </div>

      {/* Main Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        flightItems={flightItems}
        onOpenFlightDrawer={() => setIsFlightDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
      />

      {/* Main Container */}
      <main className="app-container">
        {/* Atmospheric Hospitality Hero with Vira-Lata Caramelo Spotlight */}
        <HeroSection
          signatureItem={signatureItem}
          onSelectItem={setSelectedModalItem}
          onAddToFlight={handleAddToFlight}
          flightItems={flightItems}
          onScrollToMenu={() => {}}
        />

        {/* Category Switcher Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          items={MENU_ITEMS}
        />

        {/* Taste & Dietary Filter Bar */}
        <FilterBar
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          resultCount={filteredItems.length}
        />

        {/* Dynamic Menu Grid */}
        <MenuGrid
          items={filteredItems}
          activeCategory={activeCategory}
          onSelectItem={setSelectedModalItem}
          onAddToFlight={handleAddToFlight}
          flightItems={flightItems}
          onResetFilters={handleResetFilters}
        />

        {/* Host Lore & House Footer */}
        <Footer />
      </main>

      {/* Item Tasting Notes & Lore Modal */}
      <ItemModal
        item={selectedModalItem}
        onClose={() => setSelectedModalItem(null)}
        onAddToFlight={handleAddToFlight}
        flightItems={flightItems}
      />

      {/* Slide-out Guest Tasting Flight Tray */}
      <FlightDrawer
        isOpen={isFlightDrawerOpen}
        onClose={() => setIsFlightDrawerOpen(false)}
        flightItems={flightItems}
        onRemoveItem={handleRemoveFromFlight}
        onClearFlight={handleClearFlight}
      />
    </div>
  );
}

export default App;
