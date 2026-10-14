import { business, fullAddress } from "@/lib/business";

function openingHoursAnswer() {
  const open = business.hours
    .filter((entry) => entry.open !== "Closed")
    .map((entry) => `${entry.day} ${entry.open} to ${entry.close}`);
  const closed = business.hours.filter((entry) => entry.open === "Closed").map((entry) => entry.day);
  const closedLine = closed.length > 0 ? ` Closed on ${closed.join(" and ")}.` : "";
  return `${open.join(". ")}.${closedLine}`;
}

export const faqs = [
  {
    question: "Where is Belaisy?",
    answer: `Belaisy Hair and Beauty Lounge is at ${fullAddress}.`,
  },
  {
    question: "What are your opening hours?",
    answer: openingHoursAnswer(),
  },
  {
    question: "How do I book an appointment?",
    answer: `Call us on ${business.phoneDisplay}, send a message through the form on this page, or DM us on Instagram. We'll find a time that works.`,
  },
  {
    question: "Do I need a patch test before colour?",
    answer:
      "Yes. New clients booking colour need a patch test at least 48 hours before the appointment. Colour is applied behind the ear and left for 48 hours. If you are unsure whether you need one, ask when you book.",
  },
  {
    question: "What happens if I need to cancel?",
    answer:
      "Please give at least 48 hours' notice. Cancellations inside 48 hours incur a charge, and a no-show is charged the full cost of the booked service. If something unexpected comes up, call or message us as soon as you can.",
  },
  {
    question: "What can I book at the lounge?",
    answer:
      "Cuts, colour and styling with the Belaisy team, plus Leah's extensions, Amber's nails, Maddie's permanent jewellery, Joanne's massage and Medine's aesthetics. Some treatments are with independent professionals in the lounge, so book the right person for the service.",
  },
] as const;
