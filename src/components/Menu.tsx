import { ChevronRight } from 'lucide-react';
import type { MenuItem, MenuTab } from '../types/menu';

interface Props {
  tab: MenuTab;
  onSelect: (item: MenuItem) => void;
}

export function Menu({ tab, onSelect }: Props) {
  return (
    <section className="tab-page">
      <h2 className="sr-only">{tab.title}</h2>

      {tab.categories.map((category) => (
        <div key={category.id} className="category">
          {category.title && <h3 className="category-title">{category.title}</h3>}
          <div className="item-list">
            {category.items.map((item) => (
              <button key={item.id} className="item" onClick={() => onSelect(item)}>
                <span className="item-text">
                  <span className="item-name">{item.name}</span>
                  <span className="item-desc">{item.description}</span>
                </span>
                <ChevronRight className="item-chevron" size={16} strokeWidth={1.6} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
