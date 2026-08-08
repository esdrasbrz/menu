import type { MenuItem, MenuSection as Section } from '../types/menu';

interface Props {
  section: Section;
  onSelect: (item: MenuItem) => void;
}

export function MenuSection({ section, onSelect }: Props) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{section.title}</h2>
        <span className="section-hours">{section.hours}</span>
      </div>
      <p className="section-subtitle">{section.subtitle}</p>

      <div className="item-list">
        {section.items.map((item) => (
          <button key={item.id} className="item" onClick={() => onSelect(item)}>
            <span className="item-name">{item.name}</span>
            <span className="item-desc">{item.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
