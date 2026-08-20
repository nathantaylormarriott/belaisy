export const business = {
  name: "The Cosy Chapter",
  tagline: "Books · Coffee · Wine",
  heroTagline:
    "Boutique Book, Coffee and Wine Bar with Cosy Reading and Curated Foods.",
  street: "45–47 Long Street",
  town: "Atherstone",
  county: "Warwickshire",
  postcode: "CV9 1AZ",
  country: "GB",
  phoneDisplay: "01827 908437",
  phoneHref: "tel:+441827908437",
  lat: 52.577,
  lng: -1.5502,
  facebook: "https://www.facebook.com/p/The-Cosy-Chapter-61589824645559/",
  instagram: "https://www.instagram.com/thecosychapter1/",
  google: "https://share.google/15P40De080wmGlvLu",
  hours: [
    { day: "Monday", open: "8:00 am", close: "8:00 pm", schema: ["Mo", "08:00", "20:00"] },
    { day: "Tuesday", open: "8:00 am", close: "8:00 pm", schema: ["Tu", "08:00", "20:00"] },
    { day: "Wednesday", open: "8:00 am", close: "8:00 pm", schema: ["We", "08:00", "20:00"] },
    { day: "Thursday", open: "8:00 am", close: "11:00 pm", schema: ["Th", "08:00", "23:00"] },
    { day: "Friday", open: "8:00 am", close: "11:00 pm", schema: ["Fr", "08:00", "23:00"] },
    { day: "Saturday", open: "8:00 am", close: "11:00 pm", schema: ["Sa", "08:00", "23:00"] },
    { day: "Sunday", open: "8:00 am", close: "8:00 pm", schema: ["Su", "08:00", "20:00"] },
  ],
} as const;

export const fullAddress = `${business.street}, ${business.town}, ${business.county} ${business.postcode}`;

/** Google Knowledge Graph ID — used for linking; reviews load via Places API. */
export const businessGoogleKgmid = "/g/11zhfsd12t" as const;
