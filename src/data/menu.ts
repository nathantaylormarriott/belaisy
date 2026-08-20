export type MenuItem = {
  name: string;
  price?: string;
  description?: string;
  note?: string;
  vegetarian?: boolean;
};

export type MenuSection = {
  id: string;
  title: string;
  subtitle?: string;
  note?: string;
  items: MenuItem[];
};

export type MenuChapter = {
  id: string;
  label: string;
  title: string;
  intro?: string;
  sections: MenuSection[];
};

export const menuChapters: MenuChapter[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    title: "Breakfast",
    intro: "Served until 11:30am.",
    sections: [
      {
        id: "breakfast-mains",
        title: "Morning bites",
        items: [
          { name: "Bacon muffin", price: "£3.95" },
          { name: "Sausage muffin", price: "£3.95" },
          { name: "2 slices of toast with butter", price: "£1.20" },
          { name: "2 slices of toast with jam or marmalade", price: "£1.55" },
        ],
      },
      {
        id: "mini-pastries",
        title: "Mini pastries",
        items: [
          { name: "1 pastry", price: "£1.25" },
          { name: "3 pastries", price: "£3.50" },
        ],
      },
    ],
  },
  {
    id: "daytime",
    label: "Daytime",
    title: "Toasties, focaccia & pizza",
    sections: [
      {
        id: "toasties",
        title: "Toasties",
        note: "All £6.25",
        items: [
          {
            name: "Four cheese & onion",
            price: "£6.25",
            description: "Mature cheddar, mozzarella, Brie & red onion chutney",
          },
          {
            name: "Chicken & bacon",
            price: "£6.25",
            description: "Shredded chicken, crispy bacon, mozzarella & mayo",
          },
          {
            name: "Salami piccante",
            price: "£6.25",
            description: "Spicy salami, mozzarella, sunblush tomatoes & rocket",
          },
        ],
      },
      {
        id: "focaccia",
        title: "Focaccia",
        note: "All served with dressed rocket",
        items: [
          {
            name: "Prosciutto, mozzarella & pesto",
            price: "£8.95",
            description: "Prosciutto, mozzarella, pesto & rocket",
          },
          {
            name: "Salami piccante",
            price: "£8.50",
            description: "Spicy salami, mozzarella, rocket & chilli jam",
          },
          {
            name: "Caprese",
            price: "£7.95",
            description: "Mozzarella, tomato, pesto & rocket",
            vegetarian: true,
          },
          {
            name: "Mortadella, mozzarella & pesto",
            price: "£8.50",
            description: "Mortadella, mozzarella, pesto, sunblush tomatoes & rocket",
          },
        ],
      },
      {
        id: "pizza",
        title: "Stone-baked pizza",
        items: [
          {
            name: "Margherita",
            price: "£4.95",
            description: "Tomato sauce & mozzarella",
          },
          {
            name: "Add meat toppings",
            note: "+95p each — pepperoni, chorizo, prosciutto",
          },
          {
            name: "Add toppings",
            note: "+75p each — red onion, jalapeño, mozzarella",
          },
        ],
      },
    ],
  },
  {
    id: "evening",
    label: "Evening",
    title: "Small plates & salads",
    intro: "Served 4:30pm–8pm Sun–Wed · 4:30pm–9pm Thu–Sat",
    sections: [
      {
        id: "small-plates",
        title: "Small plates",
        items: [
          {
            name: "Salt & pepper chicken bites",
            price: "£6.95",
            description: "Crispy chicken, salt, pepper & chilli, served with sweet chilli dip",
          },
          {
            name: "SFC chicken fillets",
            price: "£6.95",
            description: "Southern fried chicken fillets with smoky BBQ dip",
          },
          {
            name: "Chicken skewers",
            price: "£7.25",
            description: "Marinated chicken skewers served with garlic mayo",
          },
          {
            name: "Breaded garlic mushrooms",
            price: "£6.50",
            description: "Crispy breaded mushrooms with garlic mayo dip",
          },
          {
            name: "Halloumi",
            price: "£6.95",
            description: "Golden halloumi with sweet chilli dip & rocket",
          },
          {
            name: "Mini camembert & warm bread",
            price: "£8.95",
            description:
              "Whole baked camembert with rosemary, caramelised red onion chutney & warm sourdough",
          },
          {
            name: "Bourbon glazed pork belly bites",
            price: "£7.50",
            description: "Sticky bourbon BBQ pork belly bites served with a small coleslaw",
          },
          {
            name: "Broccoli & cauliflower bites",
            price: "£6.50",
            description: "Crispy broccoli & cauliflower bites served with garlic mayo",
            vegetarian: true,
          },
          {
            name: "Mini lasagne",
            price: "£7.95",
            description: "Individual oven-baked lasagne",
          },
          {
            name: "King prawn pil pil",
            price: "£9.95",
            description: "King prawns, garlic, chilli, olive oil & crusty bread",
          },
          {
            name: "Burrata salad",
            price: "£7.95",
            description: "Burrata, tomatoes, fresh basil & balsamic glaze",
            vegetarian: true,
          },
        ],
      },
      {
        id: "salads",
        title: "Salads",
        items: [
          {
            name: "Chicken Caesar salad — small",
            price: "£7.95",
            description: "Fresh lettuce, chicken, parmesan, croutons & Caesar dressing",
          },
          {
            name: "Chicken Caesar salad — large",
            price: "£10.95",
            description: "Fresh lettuce, chicken, parmesan, croutons & Caesar dressing",
          },
        ],
      },
    ],
  },
  {
    id: "boards",
    label: "Boards",
    title: "Sharing boards",
    intro: "Perfect for pairing with a glass of wine.",
    sections: [
      {
        id: "sharing-boards",
        title: "Curated boards",
        items: [
          {
            name: "The Cosy board (for one)",
            price: "£12.95",
            description:
              "A selection of cured meats & cheeses, mixed olives, hummus, caramelised red onion chutney, grapes & warm sourdough bread",
          },
          {
            name: "The Chapter board (for two)",
            price: "£22.95",
            description:
              "A generous selection of cured meats & cheeses, mixed olives, hummus, caramelised red onion chutney, sunblush tomatoes, grapes & warm sourdough bread",
          },
        ],
      },
    ],
  },
];

export const menuServiceNotes = [
  "Please order at the bar.",
  "If you have any allergies or dietary requirements, please let us know.",
  "Coffee, wine and cocktails are also served — ask at the bar for today's drinks list.",
] as const;
