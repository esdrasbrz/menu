import type { MenuSection } from '../types/menu';

export const HOUSE = {
  hosts: 'Maju & Esdras',
  tagline: 'Our home café and bar. Help yourself.',
  wifiNetwork: 'MajuEsdras_Guest',
  wifiPassword: 'coffee-and-cocktails'
};

export const MENU: MenuSection[] = [
  {
    id: 'cafe',
    title: 'Café',
    subtitle: 'Breakfast and afternoon bites',
    hours: 'Morning until dusk',
    items: [
      {
        id: 'vira-lata-caramelo',
        name: 'Vira-Lata Caramelo',
        description: 'Iced salted caramel macchiato — the house signature',
        image: '/images/vira_lata_caramelo.jpg',
        notes: ['Salted caramel', 'Cold milk', 'Espresso crema', 'Sea salt'],
        story:
          'Named for Brazil’s beloved caramel-coated street dog — warm, joyful, impossible to ignore. Built in a chilled glass with ribbons of handmade salted caramel and cold milk, a double ristretto floated on top, finished with froth and flaky salt.',
        hostTip:
          'First sip without stirring, to catch the hot espresso against the cold caramel milk. Then swirl.'
      },
      {
        id: 'specialty-pourover',
        name: 'Ethiopian V60',
        description: 'Single-origin pour-over, washed Yirgacheffe heirloom',
        image: '/images/specialty_pourover.jpg',
        notes: ['Jasmine', 'Peach', 'Bergamot', 'Wild honey'],
        story:
          'Hand-poured through a glass V60 at 93 °C in four pours, with a 45-second bloom. Slow and deliberate, which is the point of it.',
        hostTip: 'Drink it black. Sugar and milk flatten the peach.'
      },
      {
        id: 'ceremonial-matcha',
        name: 'Cloud Matcha Latte',
        description: 'Ceremonial Uji matcha over vanilla oat milk',
        image: '/images/matcha_latte.jpg',
        notes: ['Green umami', 'Vanilla', 'Toasted oat'],
        story:
          'Ceremonial-grade matcha from Uji, Kyoto, whisked by hand with a bamboo chasen until it froths, then layered over chilled oat milk and vanilla.',
        hostTip: 'Gentler than coffee and it lasts longer — good for a slow afternoon.'
      },
      {
        id: 'cold-brew-tonic',
        name: 'Cold Brew Tonic',
        description: 'Eighteen-hour steep, tonic water, burnt orange',
        image: '/images/specialty_pourover.jpg',
        notes: ['Sparkling', 'Dark chocolate', 'Quinine', 'Charred orange'],
        story:
          'Eighteen hours of cold extraction takes the bitterness out entirely. Poured over ice with tonic and a slice of dehydrated blood orange.',
        hostTip: 'The one to ask for on a hot afternoon.'
      },
      {
        id: 'botanical-yuzu-spritz',
        name: 'Yuzu & Rosemary Spritz',
        description: 'Zero-proof citrus, house rosemary cordial, soda',
        image: '/images/matcha_latte.jpg',
        notes: ['Yuzu', 'Rosemary', 'Meyer lemon'],
        story:
          'For anyone who wants something with craft to it and no alcohol in it. Japanese yuzu juice, a rosemary-lemongrass cordial we make here, and sparkling water.',
        hostTip: 'Slap the rosemary against your wrist before it goes in the glass.'
      },
      {
        id: 'artisan-grazing-board',
        name: 'Grazing Board',
        description: 'Prosciutto, aged gouda, figs and honeycomb',
        image: '/images/grazing_board.jpg',
        notes: ['Cured prosciutto', 'Aged gouda', 'Honeycomb', 'Fresh figs'],
        story:
          'Prosciutto di Parma, triple-crème brie, gouda aged long enough to crunch, raw honeycomb, mission figs, seeded sourdough crisps and rosemary, on an olive wood plank.',
        hostTip:
          'Fig, brie, honeycomb and a fold of prosciutto on one crisp. Build it in that order.'
      }
    ]
  },
  {
    id: 'night',
    title: 'Night',
    subtitle: 'Drinks for evening gatherings',
    hours: 'Dusk until late',
    items: [
      {
        id: 'smoked-old-fashioned',
        name: 'Smoked Old Fashioned',
        description: 'Bourbon, house bitters, flamed citrus, cherrywood smoke',
        image: '/images/smoked_old_fashioned.jpg',
        notes: ['Cherrywood', 'Vanilla oak', 'Caramelised orange', 'Luxardo'],
        story:
          'Small-batch bourbon stirred with demerara and Angostura, then trapped under a cloche with smoke from charred cherrywood chips. It takes a few minutes and it is worth them.',
        hostTip:
          'Breathe in the smoke before the first sip, and let the ice do its work slowly.'
      },
      {
        id: 'espresso-martini-riserva',
        name: 'Espresso Martini',
        description: 'Fresh double ristretto, vodka, Kahlúa',
        image: '/images/espresso_martini.jpg',
        notes: ['Espresso crema', 'Roasted cocoa', 'Vanilla'],
        story:
          'Never cold brew — a hot double ristretto straight from the machine into the shaker with frozen ice, which is what builds that dense golden foam.',
        hostTip:
          'The three coffee beans on top are for health, wealth and happiness. House rule.'
      },
      {
        id: 'orange-flame-wine',
        name: 'Orange Flame',
        description: 'Skin-contact amber wine, natural, 2022',
        image: '/images/natural_wine.jpg',
        notes: ['Dried apricot', 'Orange blossom', 'Kumquat', 'Tannin'],
        story:
          'Ribolla Gialla and Malvasia from a small biodynamic grower, fermented on the skins for thirty days in clay amphorae with no added sulphur.',
        hostTip: 'Served cool, around 12 °C. It opens up as it warms in the glass.'
      }
    ]
  }
];
