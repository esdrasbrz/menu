export type MenuTabId = "day" | "night";

export type Theme = "day" | "night";

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

/** A named group of items inside a tab. `title` is optional — leave it unset to render items with no heading. */
export interface MenuCategory {
  id: string;
  title?: string;
  items: MenuItem[];
}

export interface MenuTab {
  id: MenuTabId;
  /** The tab's URL, e.g. '/' or '/noite'. The single source for its route — see `TABS` in menu.ts. */
  path: string;
  /** Used only for the sr-only heading — the tab nav already shows it visibly. */
  title: string;
  /** The palette shown while this tab is active — see `TABS` in menu.ts. */
  theme: Theme;
  categories: MenuCategory[];
}
