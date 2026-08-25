import nadinePhoto from "@/assets/team/nadine.webp";
import laurenPhoto from "@/assets/team/lauren.webp";
import leahPhoto from "@/assets/team/leah.webp";
import amberPhoto from "@/assets/team/amber.webp";
import medinePhoto from "@/assets/team/medine.webp";
import maddiePhoto from "@/assets/team/maddie.webp";
import joannePhoto from "@/assets/team/joanne.webp";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "nadine",
    name: "Nadine",
    role: "Co-owner of Belaisy Lounge",
    bio: "Nadine has been in the hairdressing industry and qualified for over 20 years. A mum of three, she teamed up with her sister-in-law Lauren to open Belaisy Lounge, inspired by their children. Nadine specialises in colouring, styling and longer hair transformations.",
    image: nadinePhoto,
  },
  {
    id: "lauren",
    name: "Lauren",
    role: "Co-owner of Belaisy Lounge",
    bio: "Lauren has been in the hairdressing industry for 17 years. She is a mum of two and with her sister-in-law Nadine their children had inspired them together to open Belaisy Lounge. Lauren specialises in colouring, pixie cuts and gents barbering. Any fun hair style Lauren can do!",
    image: laurenPhoto,
  },
  {
    id: "leah",
    name: "Leah",
    role: "Hair Stylist and Extensionist",
    bio: "Leah has been qualified as a hair stylist for 3 years and qualified in hair extensions for 2 years. Leah specialises in foiling, styling and hair extensions such as nanos, ultra tips and tapes.",
    image: leahPhoto,
  },
  {
    id: "amber",
    name: "Amber",
    role: "Nail Technician",
    bio: "Amber offers BIAB nail treatments and a range of nail art designs. Having recently joined the industry, she is passionate about helping people feel their best, leaving the appointment feeling more confident.",
    image: amberPhoto,
  },
  {
    id: "medine",
    name: "Medine",
    role: "Aesthetics Practitioner",
    bio: "Medine is a retired nurse qualified with 25 years experience. She offers a range of treatments such as skin boosters, dermal fillers, skin rejuvenation and mesotherapy. Medine specialises in advanced skincare, making sure every treatment is tailored to you and is able to create you a personalised plan.",
    image: medinePhoto,
  },
  {
    id: "maddie",
    name: "Maddie",
    role: "Permanent Jewellery Specialist",
    bio: "Maddie specialises in permanent jewellery. Permanent jewellery is a simple and unique way to wear your favourite pieces without a clasp. Each piece Maddie ensures is fitted to suit you and then is welded together. The permanent jewellery is perfect for everyday wear and creating something special that lasts.",
    image: maddiePhoto,
  },
  {
    id: "joanne",
    name: "Joanne",
    role: "Massage Therapist and Phlebotomist",
    bio: "Joanne has been qualified as a massage therapist for a year and also has 12 years experience as a phlebotomist. Living with a medical condition herself called lipodema, this is what inspired her decision to qualify in massage therapy. Joanne specialises in manual lymphatic drainage and relaxing massage therapy.",
    image: joannePhoto,
  },
];
