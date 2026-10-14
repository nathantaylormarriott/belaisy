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
    bio: "Over 20 years in hairdressing and co-owner of Belaisy Lounge. Nadine specialises in colour, styling and longer hair transformations, with family at the heart of the salon she built with Lauren.",
    image: nadinePhoto,
  },
  {
    id: "lauren",
    name: "Lauren",
    role: "Co-owner of Belaisy Lounge",
    bio: "17 years in the industry and co-owner of Belaisy Lounge. Lauren specialises in colour, pixie cuts and gents barbering, and loves creative, personality-led styles that feel truly you.",
    image: laurenPhoto,
  },
  {
    id: "leah",
    name: "Leah",
    role: "Hair Stylist and Extensionist",
    bio: "Qualified stylist and extensionist focused on foils, blow dries and extension fittings. Leah works with nanos, ultra tips and tapes to create natural, polished results you can wear with confidence.",
    image: leahPhoto,
  },
  {
    id: "amber",
    name: "Amber",
    role: "Nail Technician",
    bio: "Nail technician offering BIAB and custom nail art. Amber is passionate about detail and making sure you leave feeling polished, cared for and a little more confident than when you arrived.",
    image: amberPhoto,
  },
  {
    id: "medine",
    name: "Medine",
    role: "Aesthetics Practitioner",
    bio: "Aesthetics practitioner and retired nurse with 25 years of care experience. Medine offers skin boosters, fillers and rejuvenation, with every treatment plan tailored to your goals.",
    image: medinePhoto,
  },
  {
    id: "maddie",
    name: "Maddie",
    role: "Permanent Jewellery Specialist",
    bio: "Permanent jewellery specialist creating clasp-free pieces fitted just for you. Maddie welds each bracelet or anklet in place for effortless everyday wear and a lasting personal touch.",
    image: maddiePhoto,
  },
  {
    id: "joanne",
    name: "Joanne",
    role: "Massage Therapist and Phlebotomist",
    bio: "Massage therapist and phlebotomist, specialising in manual lymphatic drainage and relaxing massage. Joanne’s path into therapeutic body work was inspired by her own experience with lipedema.",
    image: joannePhoto,
  },
];
