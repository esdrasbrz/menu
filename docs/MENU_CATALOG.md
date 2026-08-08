# Menu Catalog & Hospitality Knowledge

This document details the beverage and hospitality catalog curated for **Maju & Esdras**, including flavor characteristics, serving rituals, and instructions for extending the menu.

---

## 1. Signature Spotlight

### **Vira-Lata Caramelo**
- **Category**: Morning & Afternoon Cafe
- **Classification**: Layered Iced Salted Caramel Macchiato
- **Flavor Notes**: Golden Salted Caramel, Silky Cold Milk, Bold Espresso Crema, Fleur de Sel
- **Metrics**: Sweetness 4/5 • Intensity 4/5 • Acidity 2/5 • Bitterness 2/5 • Body: Creamy
- **Lore**: Inspired by Brazil's warm and beloved "vira-lata caramelo" spirit. Built in a tall fluted crystal glass with generous ribbons of handmade salted caramel sauce, chilled whole or barista oat milk, topped with a freshly extracted double ristretto shot and Maldon sea salt crystals.
- **Host Ritual**: Guests are invited to take their first sip without stirring to enjoy the contrast of hot bold crema and icy caramel milk, then gently stir with the golden spoon for a silky blend.

---

## 2. Category Breakdown

### ☀️ Morning Cafe & Breakfast (07:00 — 12:00)
1. **Vira-Lata Caramelo**: Signature layered salted caramel macchiato.
2. **Single-Origin Ethiopian V60**: Washed Yirgacheffe G1 heirloom beans, brewed on a glass Hario V60 with notes of jasmine, peach blossom, and bergamot.
3. **Sparkling Cold Brew Tonic**: 18-hour cold brew steep with Fever-Tree Indian tonic and caramelized dehydrated citrus.

### 🫖 Afternoon Tea & Refreshers (12:00 — 18:00)
1. **Ceremonial Cloud Matcha Latte**: Sourced directly from Uji, Kyoto. Hand-whisked with a 100-prong bamboo chasen and layered over vanilla oat milk.
2. **Sparkling Yuzu & Rosemary Spritz**: Zero-proof botanical refresher made with Japanese yuzu juice, homemade rosemary-lemongrass cordial, and sparkling mineral water.

### 🍸 Signature Cocktails & Evening Bar (18:00 — Late)
1. **Smoked Cherrywood Old Fashioned**: Small-batch bourbon infused with rich demerara syrup, Angostura & orange bitters, captured in a cloche with aromatic charred cherrywood smoke.
2. **Espresso Martini Riserva**: Fresh double ristretto espresso, premium craft vodka, Kahlúa, and Madagascar vanilla, garnished with three coffee beans symbolizing Health, Wealth, and Happiness.

### 🍷 Wine Cellar & Craft Beers (17:00 — Late)
1. **"Orange Flame" Skin-Contact Amber Wine**: Natural low-intervention 2022 skin-fermented Ribolla Gialla / Malvasia with notes of dried apricot, orange blossom, and subtle amphora tannins.

### 🧀 Grazing Boards & Delicacies (Available Anytime)
1. **Maju & Esdras Signature Grazing Board**: Prosciutto di Parma DOP, 24-month aged Dutch Gouda, French Triple-Crème Brie, fresh mission figs, raw honeycomb wand, and seeded sourdough crisps.

---

## 3. How to Add New Items

To add a new wine bottle, coffee bean origin, or cocktail creation:

1. Open `src/data/menuData.ts`.
2. Add a new object to the `MENU_ITEMS` array adhering to the `MenuItem` type:

```typescript
{
  id: 'oaxacan-paloma',
  title: 'Oaxacan Mezcal Paloma',
  subtitle: 'Artisanal Mezcal, Fresh Grapefruit & Smoked Salt',
  category: 'cocktails',
  badge: 'House Twist',
  isFeatured: true,
  timeSlot: 'night',
  image: '/images/smoked_old_fashioned.jpg',
  tags: ['Host Favorite', 'Smoky & Bold', 'Low ABV'],
  flavorNotes: ['Smoky Agave', 'Ruby Grapefruit', 'Lime Zest', 'Chili Salt'],
  metrics: {
    sweetness: 2,
    intensity: 4,
    acidity: 4,
    bitterness: 2,
    body: 'Crisp'
  },
  recipeStory: 'Hand-shaken artisanal mezcal with freshly squeezed pink grapefruit and lime juice.',
  hostTip: 'Lick a touch of the smoked chili rim before each sip.',
  specs: {
    originOrRegion: 'Oaxaca, Mexico',
    abvOrCaffeine: '15% ABV',
    prepMethod: 'Shaken over crushed ice with smoked salt rim',
    glassware: 'Highball Glass',
    ingredients: ['Mezcal Joven', 'Fresh grapefruit juice', 'Lime', 'Agave', 'Soda'],
    pairings: ['Artisanal Grazing Board', 'Salted Marcona Almonds']
  }
}
```
3. Save the file. Vite HMR will reload the page immediately.
