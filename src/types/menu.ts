export type CategoryType = 'all' | 'morning' | 'tea' | 'cocktails' | 'wines' | 'bites';

export type DietaryTag = 
  | 'Signature'
  | 'Host Favorite'
  | 'Single Origin'
  | 'Zero Proof'
  | 'Low ABV'
  | 'Caffeinated'
  | 'Decaf'
  | 'Dairy Free'
  | 'Vegan'
  | 'Sweet & Creamy'
  | 'Smoky & Bold'
  | 'Crisp & Refreshing'
  | 'Natural / Pet-Nat'
  | 'Savory';

export interface FlavorMetrics {
  sweetness?: number;
  intensity?: number;
  acidity?: number;
  bitterness?: number;
  body: 'Delicate' | 'Crisp' | 'Silky' | 'Medium' | 'Full-Bodied' | 'Creamy';
}

export interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryType;
  badge?: string;
  isSignature?: boolean;
  isFeatured?: boolean;
  timeSlot: 'morning' | 'night' | 'anytime';
  description?: string;
  image: string;
  tags: DietaryTag[];
  flavorNotes: string[];
  metrics: FlavorMetrics;
  recipeStory: string;
  hostTip: string;
  specs: {
    roastOrVintage?: string;
    originOrRegion?: string;
    abvOrCaffeine?: string;
    prepMethod: string;
    glassware: string;
    ingredients: string[];
    pairings: string[];
  };
}

export interface CategoryInfo {
  id: CategoryType;
  title: string;
  shortTitle: string;
  icon: string;
  tagline: string;
  timeBadge: string;
  bgGradient: string;
}

export interface FlightSelection {
  item: MenuItem;
  customization?: string;
  addedAt: number;
}
