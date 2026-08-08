import type { CategoryInfo, MenuItem } from '../types/menu';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'all',
    title: 'Full Tasting Menu',
    shortTitle: 'All Selections',
    icon: 'Sparkles',
    tagline: 'Explore the complete beverage & hospitality collection at Maju & Esdras.',
    timeBadge: 'All Day',
    bgGradient: 'from-amber-900/30 via-stone-900/40 to-emerald-950/30'
  },
  {
    id: 'morning',
    title: 'Morning Cafe & Breakfast',
    shortTitle: 'Morning Cafe',
    icon: 'Coffee',
    tagline: 'Artisanal espresso extractions, precise pour-overs, and warm morning bites.',
    timeBadge: '07:00 — 12:00',
    bgGradient: 'from-amber-600/20 via-orange-950/30 to-stone-900/40'
  },
  {
    id: 'tea',
    title: 'Afternoon Tea & Refreshers',
    shortTitle: 'Tea & Refreshers',
    icon: 'CupSoda',
    tagline: 'Botanical infusions, sparkling zero-proof spritzes, and ceremonial matcha.',
    timeBadge: '12:00 — 18:00',
    bgGradient: 'from-emerald-800/20 via-teal-950/30 to-stone-900/40'
  },
  {
    id: 'cocktails',
    title: 'Signature Cocktails & Bar',
    shortTitle: 'Evening Bar',
    icon: 'GlassWater',
    tagline: 'Hand-stirred speakeasy classics, aromatic smoke, and house concoctions.',
    timeBadge: '18:00 — Late',
    bgGradient: 'from-amber-900/30 via-red-950/40 to-stone-950/60'
  },
  {
    id: 'wines',
    title: 'Wine Cellar & Craft Beers',
    shortTitle: 'Cellar & Beers',
    icon: 'Wine',
    tagline: 'Natural skin-contact oranges, chilled Pet-Nats, bold reds, and juicy craft IPAs.',
    timeBadge: '17:00 — Late',
    bgGradient: 'from-rose-950/30 via-purple-950/30 to-stone-950/60'
  },
  {
    id: 'bites',
    title: 'Grazing Boards & Delicacies',
    shortTitle: 'Grazing & Bites',
    icon: 'Utensils',
    tagline: 'Artisanal cheese pairings, charcuterie, honeycomb, and dark cacao truffles.',
    timeBadge: 'Available Anytime',
    bgGradient: 'from-yellow-950/20 via-stone-900/40 to-stone-950/60'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- SIGNATURE SPECIALTY ---
  {
    id: 'vira-lata-caramelo',
    title: 'Vira-Lata Caramelo',
    subtitle: 'Signature Layered Iced Salted Caramel Macchiato',
    category: 'morning',
    badge: 'Maju & Esdras Signature',
    isSignature: true,
    isFeatured: true,
    timeSlot: 'anytime',
    image: '/images/vira_lata_caramelo.jpg',
    tags: ['Signature', 'Host Favorite', 'Sweet & Creamy', 'Caffeinated'],
    flavorNotes: ['Golden Salted Caramel', 'Silky Cold Milk', 'Bold Espresso Crema', 'Fleur de Sel'],
    metrics: {
      sweetness: 4,
      intensity: 4,
      acidity: 2,
      bitterness: 2,
      body: 'Creamy'
    },
    recipeStory: 
      'Our quintessential house favorite! Inspired by Brazil’s beloved "vira-lata caramelo" spirit—warm, joyful, and utterly irresistible. We build this inside a chilled fluted glass with generous ribbons of handmade salted caramel, fresh cold whole milk (or velvety oat milk), layered carefully with a double ristretto extraction floating on top and crowned with a delicate milk froth and sea salt crystals.',
    hostTip: 
      'Take your first sip without stirring to experience the contrast of hot bold espresso and icy caramel milk, then swirl gently with the golden spoon for the ultimate silky blend.',
    specs: {
      roastOrVintage: 'Medium-Dark House Roast (Chocolate & Hazelnut notes)',
      originOrRegion: 'Cerrado Mineiro, Brazil',
      abvOrCaffeine: 'High (~140mg caffeine, double shot)',
      prepMethod: 'Layered over clear ice with Aeroccino cold foam & caramel ribbon',
      glassware: 'Tall Fluted Crystal Collins Glass',
      ingredients: [
        'Fresh double shot ristretto espresso',
        'Handmade amber salted caramel sauce',
        'Chilled barista whole milk or oat milk',
        'Artisanal Madagascar vanilla essence',
        'Flaky Maldon sea salt crystal garnish'
      ],
      pairings: ['Warm Butter Croissants', 'Almond Biscotti', 'Dark Chocolate Truffles']
    }
  },

  // --- MORNING CAFE & BREAKFAST ---
  {
    id: 'specialty-pourover',
    title: 'Single-Origin Ethiopian V60',
    subtitle: 'Washed Heirloom Pour-Over Ritual',
    category: 'morning',
    badge: 'Single Origin',
    isFeatured: true,
    timeSlot: 'morning',
    image: '/images/specialty_pourover.jpg',
    tags: ['Single Origin', 'Host Favorite', 'Crisp & Refreshing', 'Caffeinated'],
    flavorNotes: ['Jasmine Florals', 'Peach Blossom', 'Bergamot Citrus', 'Wild Honey'],
    metrics: {
      sweetness: 3,
      intensity: 3,
      acidity: 4,
      bitterness: 1,
      body: 'Delicate'
    },
    recipeStory:
      'Brewed with intention using our glass Hario V60 dripper. We use precision temperature-controlled 93°C water in a 4-pour blooming method to coax out delicate floral aromatics and sparkling stone-fruit clarity.',
    hostTip:
      'Best enjoyed black without sugar or milk to appreciate the natural tea-like clarity and peach sweetness.',
    specs: {
      roastOrVintage: 'Light Filter Roast',
      originOrRegion: 'Yirgacheffe G1, Ethiopia (2,050m elevation)',
      abvOrCaffeine: 'Clean Caffeinated (~120mg)',
      prepMethod: 'Hand-poured V60 with 45s pre-bloom (1:16 ratio)',
      glassware: 'Ceramic Speckled Tasting Cup & Glass Server',
      ingredients: [
        'Freshly ground Ethiopian heirloom beans (Comandante grind)',
        'Third-wave remineralized brewing water',
        'Love and slow morning patience'
      ],
      pairings: ['Avocado Sourdough Toast', 'Lemon Poppy Pastry', 'Fresh Raspberries']
    }
  },
  {
    id: 'ceremonial-matcha',
    title: 'Ceremonial Cloud Matcha Latte',
    subtitle: 'Uji Matcha Layered Over Vanilla Oat Milk',
    category: 'tea',
    badge: 'Zero Coffee / Clean Energy',
    isFeatured: true,
    timeSlot: 'anytime',
    image: '/images/matcha_latte.jpg',
    tags: ['Vegan', 'Dairy Free', 'Sweet & Creamy', 'Caffeinated'],
    flavorNotes: ['Vibrant Green Umami', 'Silky Madagascar Vanilla', 'Creamy Toasted Oat', 'Subtle Sweetness'],
    metrics: {
      sweetness: 3,
      intensity: 3,
      acidity: 1,
      bitterness: 2,
      body: 'Silky'
    },
    recipeStory:
      'Directly sourced ceremonial grade matcha from Uji, Kyoto, hand-whisked with a 100-prong bamboo chasen until an emerald micro-froth forms, layered over chilled organic oat milk and natural vanilla.',
    hostTip:
      'Gives a sustained, jitter-free focus for 4–6 hours thanks to natural L-theanine amino acids.',
    specs: {
      roastOrVintage: 'Spring First-Harvest Ceremonial Grade',
      originOrRegion: 'Uji, Kyoto Prefecture, Japan',
      abvOrCaffeine: 'Gentle Energy (~60mg caffeine)',
      prepMethod: 'Traditional bamboo whisking at 75°C layered over ice',
      glassware: 'Modern Ribbed Tumbler',
      ingredients: [
        'Organic Uji Ceremonial Matcha Powder (3g)',
        'Filtered spring water',
        'Minor Figures barista oat milk',
        'Organic agave & pure vanilla bean'
      ],
      pairings: ['Matcha Shortbread', 'Fresh Strawberries', 'Almond Croissant']
    }
  },

  // --- EVENING COCKTAILS & BAR ---
  {
    id: 'smoked-old-fashioned',
    title: 'Smoked Cherrywood Old Fashioned',
    subtitle: 'Bourbon, House Bitters, Flamed Citrus & Woodsmoke',
    category: 'cocktails',
    badge: 'Speakeasy Favorite',
    isSignature: true,
    isFeatured: true,
    timeSlot: 'night',
    image: '/images/smoked_old_fashioned.jpg',
    tags: ['Signature', 'Host Favorite', 'Smoky & Bold', 'Low ABV'],
    flavorNotes: ['Charred Cherrywood', 'Vanilla Bourbon Oak', 'Caramelized Orange', 'Luxardo Cherry'],
    metrics: {
      sweetness: 2,
      intensity: 5,
      acidity: 1,
      bitterness: 3,
      body: 'Full-Bodied'
    },
    recipeStory:
      'Our house evening ritual. We infuse small-batch Kentucky straight bourbon with raw demerara syrup and aromatic Angostura & orange bitters, then capture swirling aromatic smoke from charred cherrywood chips directly inside the cloche.',
    hostTip:
      'Inhale the deep wood aroma before your first sip; let the heavy crystal rock glass warm gently in your hands as the ice melts slowly.',
    specs: {
      roastOrVintage: 'Small Batch Kentucky Straight Bourbon (aged 6 yrs)',
      originOrRegion: 'Louisville, Kentucky & House Bar',
      abvOrCaffeine: '32% ABV',
      prepMethod: 'Stirred over hand-carved crystal clear ice cube with cherrywood smoke',
      glassware: 'Cut-Crystal Double Rocks Tumbler',
      ingredients: [
        'Small-batch bourbon whiskey (60ml)',
        'Rich demerara sugar syrup (10ml)',
        'House blend Angostura & Orange bitters',
        'Expressed flamed orange peel',
        'Luxardo Maraschino cherry on golden brass pick',
        'Torch-charred cherrywood chips'
      ],
      pairings: ['Smoked Prosciutto', 'Dark Chocolate Truffles', 'Aged Gouda']
    }
  },
  {
    id: 'espresso-martini-riserva',
    title: 'Espresso Martini Riserva',
    subtitle: 'Fresh Double Ristretto, Craft Vodka & Kahlúa Silk',
    category: 'cocktails',
    badge: 'Nightcap Essential',
    isFeatured: true,
    timeSlot: 'night',
    image: '/images/espresso_martini.jpg',
    tags: ['Host Favorite', 'Sweet & Creamy', 'Caffeinated', 'Low ABV'],
    flavorNotes: ['Golden Espresso Crema', 'Dark Roasted Cocoa', 'Velvet Vanilla', 'Silky Spirits'],
    metrics: {
      sweetness: 3,
      intensity: 4,
      acidity: 2,
      bitterness: 2,
      body: 'Creamy'
    },
    recipeStory:
      'We never use pre-made cold brew for our martinis—only a piping-hot fresh ristretto double shot straight from our espresso machine into the shaker with sub-zero ice to create that iconic, dense golden velvet foam crown.',
    hostTip:
      'The three floating coffee beans represent Health, Wealth, and Happiness for all guests who step into our home.',
    specs: {
      roastOrVintage: 'Italian Dark Roast Espresso Blend',
      originOrRegion: 'House Bar Espresso Station',
      abvOrCaffeine: '18% ABV + ~130mg caffeine',
      prepMethod: 'Hard shaken for 15 seconds with double-strain into chilled coupe',
      glassware: 'Classic Contemporary Crystal Coupe',
      ingredients: [
        'Freshly extracted double ristretto espresso (hot)',
        'Premium quadruple-distilled vodka (45ml)',
        'Kahlúa coffee liqueur (25ml)',
        'Dash of Madagascar vanilla bean syrup',
        'Three roasted coffee beans garnish'
      ],
      pairings: ['Tiramisu Bites', 'Dark Chocolate Truffles', 'Sea Salt Pretzels']
    }
  },

  // --- WINES & CELLAR ---
  {
    id: 'orange-flame-wine',
    title: '"Orange Flame" Skin-Contact Amber Wine',
    subtitle: 'Natural Low-Intervention 2022 Maceration',
    category: 'wines',
    badge: 'Natural & Biodynamic',
    isFeatured: true,
    timeSlot: 'night',
    image: '/images/natural_wine.jpg',
    tags: ['Natural / Pet-Nat', 'Host Favorite', 'Crisp & Refreshing', 'Low ABV'],
    flavorNotes: ['Dried Apricot', 'Orange Blossom', 'Honeyed Kumquat', 'Textured Tannins'],
    metrics: {
      sweetness: 1,
      intensity: 4,
      acidity: 4,
      bitterness: 2,
      body: 'Medium'
    },
    recipeStory:
      'An exceptional amber skin-contact natural wine from a small biodynamic producer. Fermented spontaneously with indigenous yeasts on grape skins for 30 days in clay amphorae with zero sulfur added.',
    hostTip:
      'Served slightly chilled (around 12°C)—enjoy how the bouquet evolves in the glass as it opens up with ambient warmth.',
    specs: {
      roastOrVintage: 'Vintage 2022 / Unfiltered Natural Wine',
      originOrRegion: 'Friuli / Collio Hills & Slovenia Border',
      abvOrCaffeine: '12.5% ABV',
      prepMethod: 'Served in delicate Bordeaux crystal stemware',
      glassware: 'Ultra-thin Crystal Wine Stem',
      ingredients: [
        '100% Biodynamic Ribolla Gialla & Malvasia grapes',
        'Clay amphora skin-fermented',
        'Wild natural yeast fermentation'
      ],
      pairings: ['Artisanal Grazing Board', 'Aged Sheep Cheese', 'Grilled Sourdough']
    }
  },

  // --- GRAZING & BITES ---
  {
    id: 'artisan-grazing-board',
    title: 'Maju & Esdras Signature Grazing Board',
    subtitle: 'Prosciutto di Parma, 24-Mo Gouda, Figs & Honeycomb',
    category: 'bites',
    badge: 'House Feast for Guests',
    isSignature: true,
    isFeatured: true,
    timeSlot: 'anytime',
    image: '/images/grazing_board.jpg',
    tags: ['Signature', 'Host Favorite', 'Savory'],
    flavorNotes: ['Cured Prosciutto', 'Crystalline Aged Gouda', 'Wild Honeycomb', 'Fresh Mission Figs'],
    metrics: {
      sweetness: 3,
      intensity: 4,
      acidity: 2,
      bitterness: 1,
      body: 'Full-Bodied'
    },
    recipeStory:
      'Curated especially for our living room gatherings. A harmonious balance of rich savory cured meats, creamy triple-crème brie, sharp aged Dutch gouda crystals, raw honeycomb dripping from the wooden wand, toasted sourdough crisps, and fresh rosemary.',
    hostTip:
      'Try placing a slice of fig, a dollop of brie, a touch of honeycomb, and a fold of prosciutto onto a single seeded sourdough crisp for the ultimate flavor symphony.',
    specs: {
      roastOrVintage: 'Artisanal Batch Selection',
      originOrRegion: 'Local Specialty Fromagerie & Italy',
      abvOrCaffeine: 'Pure Deliciousness (0% ABV)',
      prepMethod: 'Arranged freshly on aged olive wood plank with candlelight',
      glassware: 'Olive Wood Platter & Brass Serving Ware',
      ingredients: [
        'Prosciutto di Parma DOP (aged 20 months)',
        'Aged Dutch Gouda with crunchy tyrosine crystals',
        'French Triple-Crème Brie cheese wheel',
        'Fresh California mission figs & seedless dark grapes',
        'Raw local wildflower honeycomb chunk',
        'Artisanal seeded sourdough crackers & rosemary sprigs',
        'Toasted Mediterranean walnuts & salted almonds'
      ],
      pairings: ['Orange Flame Natural Wine', 'Smoked Old Fashioned', 'Espresso Tonic']
    }
  },

  // --- ADDITIONAL REFRESHING & MORNING OPTIONS ---
  {
    id: 'cold-brew-tonic',
    title: 'Sparkling Cold Brew Tonic',
    subtitle: '18-Hour Slow Steep, Botanical Tonic & Burnt Citrus',
    category: 'morning',
    badge: 'Ultra Crisp',
    timeSlot: 'anytime',
    image: '/images/specialty_pourover.jpg',
    tags: ['Single Origin', 'Crisp & Refreshing', 'Caffeinated', 'Zero Proof'],
    flavorNotes: ['Sparkling Effervescence', 'Deep Dark Chocolate', 'Quinine Bittersweet', 'Charred Orange'],
    metrics: {
      sweetness: 2,
      intensity: 3,
      acidity: 4,
      bitterness: 3,
      body: 'Crisp'
    },
    recipeStory:
      'Slow cold extraction over 18 hours produces zero bitterness. Topped with chilled artisanal Fever-Tree Indian tonic water and a slice of caramelized dehydrated blood orange.',
    hostTip:
      'Our favorite afternoon pick-me-up on warm sunny days—fizzy, caffeinated, and delightfully refreshing.',
    specs: {
      roastOrVintage: 'Medium Colombian Huila',
      originOrRegion: 'Huila, Colombia',
      abvOrCaffeine: '110mg clean cold-steep caffeine',
      prepMethod: 'Built over crystal ice spears with gentle tonic pour',
      glassware: 'Highball Glass',
      ingredients: ['18-hour cold brew concentrate', 'Artisanal Indian tonic water', 'Dehydrated orange', 'Thyme sprig'],
      pairings: ['Lemon Poppy Pastries', 'Marcona Almonds']
    }
  },
  {
    id: 'botanical-yuzu-spritz',
    title: 'Sparkling Yuzu & Rosemary Spritz',
    subtitle: 'Zero-Proof Citrus Elixir & Bruised Fresh Herbs',
    category: 'tea',
    badge: 'Non-Alcoholic Craft',
    timeSlot: 'anytime',
    image: '/images/matcha_latte.jpg',
    tags: ['Zero Proof', 'Dairy Free', 'Vegan', 'Crisp & Refreshing'],
    flavorNotes: ['Japanese Yuzu', 'Fragrant Rosemary', 'Sparkling Club Soda', 'Meyer Lemon'],
    metrics: {
      sweetness: 2,
      intensity: 3,
      acidity: 5,
      bitterness: 1,
      body: 'Crisp'
    },
    recipeStory:
      'For guests who want a sophisticated, craft cocktail experience without any alcohol. Made with pure Japanese yuzu juice, homemade rosemary-lemongrass cordial, and micro-carbonated soda.',
    hostTip:
      'Gently slap the rosemary sprig against your wrist before garnishing to unlock its essential aromatic oils.',
    specs: {
      roastOrVintage: 'House Botanical Batch',
      originOrRegion: 'Kochi Prefecture Yuzu & Garden Herbs',
      abvOrCaffeine: '0.0% ABV (Zero-Proof)',
      prepMethod: 'Gently stirred with hand-chipped clear ice',
      glassware: 'Stemmed Spritz Goblet',
      ingredients: ['Pure Yuzu juice (25ml)', 'House rosemary-infused syrup (15ml)', 'Sparkling mineral water', 'Bruised rosemary stem'],
      pairings: ['Grazing Board', 'Avocado Toast', 'Dark Chocolates']
    }
  }
];

export const HOUSE_RULES_AND_INFO = {
  hostNames: 'Maju & Esdras',
  welcomeHeadline: 'Welcome to Our Living Room & Bar',
  tagline: 'Crafted with love, patience, and good conversation.',
  hospitalityNote: 'Everything on this menu is prepared fresh for you as our guest. Tap any item to inspect tasting notes, or add your favorites to your "Guest Tasting Flight" to let us know what you would love to try!',
  wifiNetwork: 'MajuEsdras_Guest',
  wifiPassword: 'coffee-and-cocktails',
  coffeeGear: 'Hario V60 • Flair 58 Espresso • Timemore Grinder • Fellow Stagg EKG',
  cocktailStation: 'Charred Cherrywood Smoker • Crystal Coupes • Hand-Carved Clear Ice'
};
