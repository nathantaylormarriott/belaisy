export const business = {
  name: "Belaisy Hair",
  shortName: "Belaisy",
  tagline: "Hair · Beauty · Lounge",
  logoTagline: "Hair and Beauty Lounge",
  heroTagline: [
    "Hair and Beauty Lounge",
    "On Long Street, Atherstone.",
  ] as const,
  street: "41–43 Long Street",
  town: "Atherstone",
  county: "Warwickshire",
  postcode: "CV9 1AY",
  country: "GB",
  phoneDisplay: "01827 954544",
  phoneHref: "tel:+441827954544",
  lat: 52.5766,
  lng: -1.5496,
  facebook: "https://www.facebook.com/p/Belaisy-Hair-61589957811341/",
  instagram: "https://www.instagram.com/belaisylounge/",
  google:
    "https://www.google.com/maps/search/?api=1&query=Belaisy+Hair+41-43+Long+Street+Atherstone",
  hours: [
    { day: "Monday", open: "9:00 am", close: "3:00 pm", schema: ["Mo", "09:00", "15:00"] },
    { day: "Tuesday", open: "9:00 am", close: "7:00 pm", schema: ["Tu", "09:00", "19:00"] },
    { day: "Wednesday", open: "Closed", close: "", schema: ["We", "00:00", "00:00"] },
    { day: "Thursday", open: "9:00 am", close: "7:00 pm", schema: ["Th", "09:00", "19:00"] },
    { day: "Friday", open: "9:00 am", close: "7:00 pm", schema: ["Fr", "09:00", "19:00"] },
    { day: "Saturday", open: "9:00 am", close: "3:00 pm", schema: ["Sa", "09:00", "15:00"] },
    { day: "Sunday", open: "Closed", close: "", schema: ["Su", "00:00", "00:00"] },
  ],
} as const;

export const fullAddress = `${business.street}, ${business.town}, ${business.county} ${business.postcode}`;

/** Google Knowledge Graph ID - used for linking; reviews load via Places API. */
export const businessGoogleKgmid = "" as const;
