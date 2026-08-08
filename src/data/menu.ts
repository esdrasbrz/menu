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
        id: "espresso",
        name: "Espresso",
        description: "Duplo ou Simples",
        image: "/images/espresso.webp",
        notes: ["Chocolate", "Nozes", "Avelã"],
        story:
          "Método de extração sob pressão criado na Itália " +
          "para extrair rapidamente os óleos essenciais do café, e o seu nome " +
          'vem do italiano para "pressionado para fora"',
        hostTip: "Dê uma leve misturada na crema antes de tomar.",
      },
      {
        id: "v60",
        name: "Hario V60",
        description: "Café especial filtrado na Hario V60®",
        image: "/images/specialty_pourover.jpg",
        notes: ["Frutas amarelas", "Caramelo claro"],
        story:
          "Seu nome deriva do seu formato cônico com um ângulo preciso de 60 graus, " +
          "projetado para direcionar o fluxo de água para o centro, aumentando o " +
          "tempo de contato com o café.",
        hostTip:
          "Espera um minuto ou dois para ele dar uma amornada. Conforme a " +
          "temperatura cai, os aromas se abrem e você consegue sentir de verdade as notas " +
          "mais doces e frutadas da torra.",
      },
      {
        id: "aeropress",
        name: "Aeropress",
        description: "Café especial preparado na Aeropress®",
        image: "/images/aeropress.webp",
        notes: ["Frutas amarelas", "Caramelo claro"],
        story:
          "Inventada em 2005 por Alan Adler, que usou princípios de física e hidráulica para criar o método, " +
          "combinando a imersão total da prensa francesa com a pressão rápida do espresso.",
        hostTip:
          "Experimente dar o primeiro gole retendo " +
          "o café no meio da língua antes de engolir para sentir a textura aveludada.",
      },
      {
        id: "capuccino",
        name: "Capuccino Italiano",
        description: "Café espresso com leite vaporizado",
        image: "/images/capuccino.jpg",
        notes: ["Microespuma aveludada"],
        story:
          "Reza a lenda que a cor da mistura de café com leite, rematada por uma espuma clara, lembrava " +
          "a túnica com capuz usada pelos Frades Menores Capuchinhos (Cappuccini), do século XVII.",
        hostTip:
          "Experimente não misturar a espuma com a colher antes de beber. " +
          "O charme da bebida está no contraste entre a cremosidade fria da " +
          "espuma e o espresso quente.",
      },
      {
        id: "viralatte-caramelo",
        name: "ViraLatte Caramelo",
        description:
          "Macchiato de caramelo — o clássico da casa (gelado ou quente)",
        image: "/images/viralatte_caramelo.jpg",
        notes: ["Caramelo", "Leite", "Crema de espresso"],
        story:
          "Batizado em homenagem ao querido cachorro caramelo das ruas do Brasil — caloroso, alegre, impossível de ignorar.",
        hostTip: "Acrescente canela. Muita!",
      },
      {
        id: "agua",
        name: "Água da casa",
        description: "É o que é",
        image: "/images/agua.jpg",
        notes: ["Aguada"],
        story: "",
        hostTip: "Beba com frequência.",
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
