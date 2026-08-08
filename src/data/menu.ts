import type { MenuSection } from "../types/menu";

export const HOUSE = {
  hosts: "Maju & Esdras",
  tagline: "Nosso café e bar em casa. Fique à vontade.",
};

/** Labels for the two top-level views. */
export const TABS = {
  menu: "Cardápio",
  album: "Álbum",
};

/** The album tab. The photos themselves come from Immich, not from here. */
export const ALBUM = {
  title: "Álbum",
  subtitle: "Nossos convidados, drink na mão",
  hours: "De todas as noites",
  loading: "Carregando as fotos…",
  error: "Não foi possível carregar o álbum agora.",
  empty: "Ainda não há fotos por aqui.",
};

export const MENU: MenuSection[] = [
  {
    id: "cafe",
    title: "Café",
    subtitle: "Para o café da manhã e a tarde",
    hours: "Da manhã ao entardecer",
    items: [
      {
        id: "vira-lata-caramelo",
        name: "Vira-Lata Caramelo",
        description:
          "Macchiato gelado de caramelo salgado — o clássico da casa",
        image: "/images/vira_lata_caramelo.jpg",
        notes: [
          "Caramelo salgado",
          "Leite gelado",
          "Crema de espresso",
          "Flor de sal",
        ],
        story:
          "Batizado em homenagem ao querido cachorro caramelo das ruas do Brasil — caloroso, alegre, impossível de ignorar. Montado em copo gelado com fios de caramelo salgado feito em casa e leite gelado, um ristretto duplo flutuando por cima, finalizado com espuma e flor de sal.",
        hostTip:
          "O primeiro gole sem mexer, para pegar o espresso quente contra o leite gelado com caramelo. Depois, misture.",
      },
      {
        id: "specialty-pourover",
        name: "V60 Etíope",
        description: "Coado de origem única, Yirgacheffe heirloom lavado",
        image: "/images/specialty_pourover.jpg",
        notes: ["Jasmim", "Pêssego", "Bergamota", "Mel silvestre"],
        story:
          "Coado à mão em V60 de vidro a 93 °C em quatro despejos, com 45 segundos de pré-infusão. Lento e cuidadoso, que é justamente a graça dele.",
        hostTip: "Tome puro. Açúcar e leite achatam o pêssego.",
      },
      {
        id: "ceremonial-matcha",
        name: "Matcha Latte Nuvem",
        description:
          "Matcha cerimonial de Uji sobre leite de aveia com baunilha",
        image: "/images/matcha_latte.jpg",
        notes: ["Umami verde", "Baunilha", "Aveia tostada"],
        story:
          "Matcha de grau cerimonial de Uji, em Kyoto, batido à mão com um chasen de bambu até espumar, e então servido em camadas sobre leite de aveia gelado com baunilha.",
        hostTip:
          "Mais suave que café e dura mais tempo — perfeito para uma tarde sem pressa.",
      },
      {
        id: "cold-brew-tonic",
        name: "Cold Brew Tônica",
        description:
          "Extração de dezoito horas, água tônica e laranja queimada",
        image: "/images/specialty_pourover.jpg",
        notes: [
          "Borbulhante",
          "Chocolate amargo",
          "Quinino",
          "Laranja tostada",
        ],
        story:
          "Dezoito horas de extração a frio tiram o amargor por completo. Servido com gelo, água tônica e uma rodela de laranja sanguínea desidratada.",
        hostTip: "O pedido certo para uma tarde quente.",
      },
      {
        id: "botanical-yuzu-spritz",
        name: "Spritz de Yuzu e Alecrim",
        description:
          "Sem álcool: cítricos, xarope de alecrim da casa e água com gás",
        image: "/images/matcha_latte.jpg",
        notes: ["Yuzu", "Alecrim", "Limão-siciliano"],
        story:
          "Para quem quer algo bem feito e sem álcool. Suco de yuzu japonês, um xarope de alecrim e capim-limão que fazemos aqui, e água com gás.",
        hostTip: "Bata o ramo de alecrim no pulso antes de colocá-lo no copo.",
      },
      {
        id: "artisan-grazing-board",
        name: "Tábua de Frios",
        description:
          "Presunto de Parma, gouda envelhecido, figos e favo de mel",
        image: "/images/grazing_board.jpg",
        notes: [
          "Presunto de Parma",
          "Gouda envelhecido",
          "Favo de mel",
          "Figos frescos",
        ],
        story:
          "Presunto di Parma, brie triplo creme, gouda envelhecido a ponto de estalar, favo de mel puro, figos, crocantes de fermentação natural com sementes e alecrim, numa tábua de oliveira.",
        hostTip:
          "Figo, brie, favo de mel e uma dobra de presunto sobre um crocante. Monte nessa ordem.",
      },
    ],
  },
  {
    id: "night",
    title: "Noite",
    subtitle: "Drinks para os encontros da noite",
    hours: "Do entardecer ao amanhecer",
    items: [
      {
        id: "smoked-old-fashioned",
        name: "Old Fashioned Defumado",
        description:
          "Bourbon, bitter da casa, cítrico flambado e defumação de cerejeira",
        image: "/images/smoked_old_fashioned.jpg",
        notes: [
          "Madeira de cerejeira",
          "Carvalho e baunilha",
          "Laranja caramelizada",
          "Luxardo",
        ],
        story:
          "Bourbon de pequenos lotes mexido com demerara e Angostura, depois preso sob uma redoma com a fumaça de lascas de cerejeira tostadas. Leva alguns minutos e vale cada um deles.",
        hostTip:
          "Sinta o aroma da fumaça antes do primeiro gole e deixe o gelo trabalhar devagar.",
      },
      {
        id: "espresso-martini-riserva",
        name: "Espresso Martini",
        description: "Ristretto duplo na hora, vodca e Kahlúa",
        image: "/images/espresso_martini.jpg",
        notes: ["Crema de espresso", "Cacau torrado", "Baunilha"],
        story:
          "Nunca com cold brew — um ristretto duplo quente direto da máquina para a coqueteleira com gelo congelado, e é isso que forma aquela espuma dourada e densa.",
        hostTip:
          "Os três grãos de café por cima são para saúde, prosperidade e felicidade. Regra da casa.",
      },
      {
        id: "orange-flame-wine",
        name: "Chama Laranja",
        description: "Vinho laranja de maceração, natural, 2022",
        image: "/images/natural_wine.jpg",
        notes: ["Damasco seco", "Flor de laranjeira", "Kumquat", "Taninos"],
        story:
          "Ribolla Gialla e Malvasia de um pequeno produtor biodinâmico, fermentados com as cascas por trinta dias em ânforas de barro, sem sulfitos adicionados.",
        hostTip:
          "Servido fresco, por volta de 12 °C. Ele se abre conforme aquece na taça.",
      },
    ],
  },
];
