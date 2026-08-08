import type { MenuTabId } from './menu';

/** The top-level tabs: one per menu tab, plus the album. */
export type View = MenuTabId | 'album';
