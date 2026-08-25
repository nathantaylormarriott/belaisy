export type TreatmentItem = {
  name: string;
  price: string;
  description?: string;
  note?: string;
  duration?: string;
};

export type TreatmentSection = {
  id: string;
  title: string;
  subtitle?: string;
  note?: string;
  items: TreatmentItem[];
};

export type TreatmentChapter = {
  id: string;
  label: string;
  title: string;
  provider: string;
  providerRole?: string;
  intro?: string;
  contact?: string;
  contactHref?: string;
  availability?: string;
  sections: TreatmentSection[];
  footnotes?: string[];
};

export const treatmentChapters: TreatmentChapter[] = [
  {
    id: "belaisy-hair",
    label: "Hair",
    title: "Cuts, styling and treatments",
    provider: "Belaisy Lounge",
    providerRole: "Salon team",
    intro:
      "Everyday cuts, blow dries and in-salon treatments with the Belaisy team. Prices shown are starting points unless stated.",
    sections: [
      {
        id: "belaisy-gents",
        title: "Gents",
        items: [
          { name: "Dry cut", price: "from £15.00" },
          { name: "Shampoo and cut", price: "£17.50" },
        ],
      },
      {
        id: "belaisy-kids",
        title: "Kids",
        items: [
          { name: "Dry cut", price: "from £15.50" },
          { name: "Shampoo cut", price: "£19.50" },
          { name: "Cut and blow dry", price: "£30.00" },
        ],
      },
      {
        id: "belaisy-womens",
        title: "Women's",
        items: [
          { name: "Dry cut", price: "from £21.00" },
          { name: "Shampoo cut", price: "£26.50" },
          { name: "Cut and finish", price: "£42.00" },
          { name: "Cut and finish — long hair", price: "£47.00" },
          { name: "Blow dry", price: "£20.00" },
          { name: "Long hair blow dry", price: "£25.00" },
          { name: "Bouncy blow dry", price: "£30.00" },
        ],
      },
      {
        id: "belaisy-extras",
        title: "Styling and treatments",
        items: [
          { name: "Hair up", price: "from £30.00" },
          { name: "Deep conditioning treatment", price: "£10.00" },
          { name: "Treatment", price: "£20.00" },
        ],
      },
    ],
  },
  {
    id: "belaisy-colour",
    label: "Colour",
    title: "Colour and highlights",
    provider: "Belaisy Lounge",
    providerRole: "Salon team",
    intro: "Root regrowth, full-head colour, foils and toners. A patch test is required at least 48 hours before your colour appointment.",
    sections: [
      {
        id: "belaisy-roots",
        title: "Root regrowth",
        subtitle: "Price varies by time since last colour",
        items: [
          { name: "4 weeks", price: "£36.50" },
          { name: "6 weeks", price: "£40.00" },
          { name: "8 weeks", price: "£44.00" },
        ],
      },
      {
        id: "belaisy-semi",
        title: "Semi-permanent colour",
        items: [
          { name: "Semi — short", price: "£25.00" },
          { name: "Semi — long", price: "£33.50" },
        ],
      },
      {
        id: "belaisy-full-colour",
        title: "Permanent full-head colour",
        items: [
          { name: "Full head", price: "£50.00" },
          { name: "Full head — long hair", price: "£65.00" },
        ],
      },
      {
        id: "belaisy-foils",
        title: "Foils",
        items: [
          { name: "Half head foils", price: "£60.00" },
          { name: "Full head foils", price: "£80.00" },
          { name: "Full head foils — long hair", price: "£90.00" },
        ],
      },
      {
        id: "belaisy-toners",
        title: "Toners",
        items: [
          { name: "Toner — short", price: "£20.00" },
          { name: "Toner — long", price: "£30.00" },
        ],
      },
    ],
    footnotes: ["Colour services require a patch test at least 48 hours beforehand."],
  },
  {
    id: "leah-hair",
    label: "Leah",
    title: "Leah Allton — Hair",
    provider: "Leah Allton",
    providerRole: "Hair stylist and extensionist",
    intro:
      "Colour, cuts, blow dries, treatments and Remi Cachet Ultra Tips extension fittings. Leah specialises in foiling, styling and extensions.",
    sections: [
      {
        id: "leah-colour",
        title: "Colour services",
        items: [
          { name: "4 week root retouch", price: "£36" },
          { name: "6 week root retouch", price: "£40" },
          { name: "8 week root retouch", price: "£44" },
          { name: "Full head of colour", price: "£50" },
          { name: "Half head of foils", price: "£60" },
          { name: "Full head of foils", price: "£80" },
          { name: "Toner", price: "£20" },
        ],
      },
      {
        id: "leah-cuts",
        title: "Cut and blow drys",
        items: [
          { name: "Dry cut", price: "£15" },
          { name: "Shampoo cut", price: "£20" },
          { name: "Cut and blow dry", price: "£35" },
          { name: "Long hair cut and blow dry", price: "£40" },
          { name: "Blow dry", price: "£18" },
          { name: "Long hair blow dry", price: "£22" },
        ],
      },
      {
        id: "leah-treatments",
        title: "Treatments",
        items: [{ name: "Deep conditioning treatment", price: "£20" }],
      },
      {
        id: "leah-extensions",
        title: "Hair extensions — fittings",
        subtitle: "Ultra Tips · Remi Cachet",
        note: "Price based on number of strands / packs fitted",
        items: [
          { name: "25 strands (1 pack)", price: "£50" },
          { name: "50 strands (2 packs)", price: "£65" },
          { name: "75 strands (3 packs)", price: "£80" },
          { name: "100 strands (4 packs)", price: "£95" },
          { name: "125 strands (5 packs)", price: "£125" },
          { name: "150 strands (6 packs)", price: "£150" },
        ],
      },
    ],
  },
  {
    id: "amber-nails",
    label: "Nails",
    title: "Amber — Nails",
    provider: "Amber",
    providerRole: "Nail technician",
    intro:
      "Gel polish, BIAB (Builder in a Bottle) and toe treatments. Amber offers BIAB and a range of nail art — introductory prices currently apply.",
    sections: [
      {
        id: "amber-gel",
        title: "Gel nails",
        items: [
          { name: "Gel polish (natural nails)", price: "£20" },
          { name: "Gel polish with simple nail art", price: "£25" },
          { name: "Gel removal and reapplication", price: "£25" },
          { name: "Gel removal only", price: "£10" },
        ],
      },
      {
        id: "amber-biab",
        title: "BIAB — Builder in a Bottle",
        items: [
          { name: "BIAB overlay (plain)", price: "£25" },
          { name: "BIAB with gel colour", price: "£30" },
          { name: "BIAB with simple nail art", price: "£35" },
          { name: "BIAB infill (2–3 weeks)", price: "£25" },
          { name: "BIAB removal", price: "£12" },
        ],
      },
      {
        id: "amber-toes",
        title: "Toes",
        items: [
          { name: "Gel toes", price: "£20" },
          { name: "Gel toes with simple nail art", price: "£25" },
          { name: "Gel toes removal and reapplication", price: "£25" },
          { name: "Gel toes removal only", price: "£10" },
        ],
      },
      {
        id: "amber-addons",
        title: "Add-ons",
        note: "Added to the price of your chosen service",
        items: [
          { name: "French tip", price: "+£5" },
          { name: "Simple nail art", price: "+£5" },
          { name: "Detailed nail art", price: "from +£10" },
          { name: "Chrome / glitter", price: "+£3" },
          { name: "Repair (per nail)", price: "£2" },
        ],
      },
    ],
    footnotes: ["Introductory prices currently apply."],
  },
  {
    id: "maddie-jewellery",
    label: "Jewellery",
    title: "Maddie — Permanent jewellery",
    provider: "FordEverLinks",
    providerRole: "Permanent jewellery by Maddie",
    intro:
      "Welded permanent jewellery — bracelets, anklets and custom charms. Each piece is fitted to you with no clasp, perfect for everyday wear.",
    sections: [
      {
        id: "jewellery-bracelets",
        title: "Bracelets",
        items: [
          { name: "Sterling silver", price: "£40" },
          { name: "Sterling silver (premium chain)", price: "£45", note: "⭐ Premium style" },
          { name: "Gold-filled", price: "£50" },
          { name: "Gold-filled (premium chain)", price: "£55", note: "⭐ Premium style" },
        ],
      },
      {
        id: "jewellery-anklets",
        title: "Anklets",
        items: [
          { name: "Sterling silver", price: "£50" },
          { name: "Sterling silver (premium chain)", price: "£55", note: "⭐ Premium style" },
          { name: "Gold-filled", price: "£60" },
          { name: "Gold-filled (premium chain)", price: "£65", note: "⭐ Premium style" },
        ],
      },
      {
        id: "jewellery-charms",
        title: "Charms and connectors",
        items: [
          { name: "Plain", price: "£10" },
          { name: "Initials", price: "£10" },
          { name: "Birthstones", price: "£12" },
          { name: "Other", price: "£12" },
        ],
      },
    ],
    footnotes: [
      "⭐ Premium chain styles are +£5 on top of the standard price (already included in premium prices above).",
      "A £10 non-refundable deposit is required when booking permanent jewellery.",
    ],
  },
  {
    id: "joanne-massage",
    label: "Massage",
    title: "Joanne — Serenity Calm",
    provider: "Serenity Calm",
    providerRole: "Massage therapy by Joanne",
    intro:
      "Relaxing and restorative massage within Belaisy Lounge. Joanne specialises in manual lymphatic drainage and relaxing massage therapy.",
    availability: "Massage appointments available on Mondays.",
    sections: [
      {
        id: "massage-services",
        title: "Massage",
        items: [
          {
            name: "Manual lymphatic drainage",
            price: "£70",
            duration: "60 mins",
            description: "Vodder method — gentle, specialised treatment to support detoxification and reduce fluid retention.",
          },
          {
            name: "Full body massage",
            price: "£50",
            duration: "60 mins",
            description: "A deeply restorative full-body experience to relax, rebalance and renew.",
          },
          {
            name: "Leg revival",
            price: "£35",
            duration: "30 mins",
            description: "Revive tired, heavy legs through soothing massage.",
          },
          {
            name: "Back, neck and shoulder",
            price: "£35",
            duration: "30 mins",
            description: "Targeted tension relief for stress-prone areas.",
          },
        ],
      },
    ],
  },
  {
    id: "medine-aesthetics",
    label: "Aesthetics",
    title: "Medine — Ardic Aesthetics",
    provider: "Ardic Aesthetics",
    providerRole: "Medical aesthetics and skin rejuvenation by Medine",
    intro:
      "Medine is a retired nurse with 25 years' experience, offering advanced skincare and medical aesthetic treatments tailored to you.",
    contact: "07387 955836",
    contactHref: "tel:+447387955836",
    sections: [
      {
        id: "aesthetics-wrinkle",
        title: "Anti-wrinkle treatments",
        items: [
          { name: "1 area", price: "£110" },
          { name: "2 areas", price: "£145" },
          { name: "3 areas", price: "£180" },
          { name: "Masseter", price: "£180" },
        ],
      },
      {
        id: "aesthetics-prp",
        title: "PRP rejuvenation",
        items: [
          { name: "PRP face", price: "£130" },
          { name: "PRP neck", price: "£130" },
          { name: "PRP hair", price: "£150" },
          { name: "PRP face and neck", price: "£180" },
          {
            name: "Signature package — hair + face + neck",
            price: "£250",
            note: "Best value package",
          },
        ],
      },
      {
        id: "aesthetics-boosters",
        title: "Skin boosters",
        items: [
          { name: "Seventy Hyal 2000", price: "£140" },
          { name: "Vitaran", price: "£150" },
          { name: "Profhilo", price: "£190" },
        ],
      },
      {
        id: "aesthetics-other",
        title: "Mesotherapy and fillers",
        items: [
          { name: "Mesotherapy", price: "£120" },
          { name: "Lip filler — 0.5ml", price: "£120" },
          { name: "Lip filler — 1ml", price: "£160" },
          { name: "Dermal filler (other areas)", price: "£160/ml" },
        ],
      },
    ],
    footnotes: ["Consultation required before aesthetic treatments. Contact Medine directly to book."],
  },
];

export const treatmentOverview = [
  { label: "Belaisy hair", href: "#belaisy-hair", description: "Cuts, styling and treatments" },
  { label: "Belaisy colour", href: "#belaisy-colour", description: "Colour, foils and toners" },
  { label: "Leah Allton", href: "#leah-hair", description: "Colour, cuts and extensions" },
  { label: "Amber — nails", href: "#amber-nails", description: "Gel, BIAB and nail art" },
  { label: "Permanent jewellery", href: "#maddie-jewellery", description: "FordEverLinks by Maddie" },
  { label: "Serenity Calm", href: "#joanne-massage", description: "Massage by Joanne" },
  { label: "Ardic Aesthetics", href: "#medine-aesthetics", description: "Medical aesthetics by Medine" },
] as const;

export type HomeTreatmentPreview = {
  chapterId: string;
  title: string;
  provider: string;
  summary: string;
};

/** Curated snapshot for the homepage — links through to the full price list. */
export const homeTreatmentPreview: HomeTreatmentPreview[] = [
  {
    chapterId: "belaisy-hair",
    title: "Cuts, styling and treatments",
    provider: "Belaisy team",
    summary: "Gents, kids and women's cuts, blow dries, hair ups and in-salon conditioning treatments.",
  },
  {
    chapterId: "belaisy-colour",
    title: "Colour and highlights",
    provider: "Belaisy team",
    summary: "Root regrowth, semi and permanent colour, foils and toners.",
  },
  {
    chapterId: "leah-hair",
    title: "Colour, cuts and extensions",
    provider: "Leah Allton",
    summary: "Colour, foils, cuts, blow dries and Remi Cachet Ultra Tips extension fittings.",
  },
  {
    chapterId: "amber-nails",
    title: "Gel, BIAB and nail art",
    provider: "Amber",
    summary: "Gel polish, BIAB overlays and infills, toe treatments and nail art add-ons.",
  },
  {
    chapterId: "maddie-jewellery",
    title: "Permanent jewellery",
    provider: "Maddie · FordEverLinks",
    summary: "Welded bracelets and anklets in sterling silver or gold-filled, with custom charms.",
  },
  {
    chapterId: "joanne-massage",
    title: "Serenity Calm massage",
    provider: "Joanne",
    summary: "Manual lymphatic drainage, full body, leg revival and back, neck and shoulder massage.",
  },
  {
    chapterId: "medine-aesthetics",
    title: "Ardic Aesthetics",
    provider: "Medine",
    summary: "Anti-wrinkle treatments, PRP rejuvenation, skin boosters, mesotherapy and dermal fillers.",
  },
];

export const treatmentServiceNotes = [
  "Belaisy Lounge is home to independent beauty professionals — book the right therapist for your treatment.",
  "Colour and aesthetic services require a consultation; patch tests are needed at least 48 hours before colour.",
  "Prices were taken from each therapist's published price list — confirm exact pricing when booking.",
  "Call 01827 954544 for salon appointments, or contact individual therapists where a direct number is listed.",
  "Follow @belaisylounge on Instagram for updates, offers and availability.",
] as const;
