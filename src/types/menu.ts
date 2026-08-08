export type SectionId = 'cafe' | 'night';

export interface MenuItem {
  id: string;
  name: string;
  /** One line shown in the list. */
  description: string;
  /** Shown only in the detail view. */
  image: string;
  notes: string[];
  story: string;
  hostTip: string;
}

export interface MenuSection {
  id: SectionId;
  title: string;
  subtitle: string;
  hours: string;
  items: MenuItem[];
}
