export type PolicyPoint = {
  title: string;
  body: string;
  icon: "application" | "duration" | "reaction" | "notice" | "late" | "noshow";
};

export type Policy = {
  id: string;
  title: string;
  subtitle?: string;
  intro?: string;
  points: PolicyPoint[];
  closing?: string[];
};

export const salonPolicies: Policy[] = [
  {
    id: "patch-test",
    title: "Patch test policy",
    subtitle: "Patch testing policy",
    intro:
      "All new clients requiring colour work must have had a patch test at least 48 hours before their appointment.",
    points: [
      {
        icon: "application",
        title: "Application",
        body: "Colour is applied behind the ear.",
      },
      {
        icon: "duration",
        title: "Duration",
        body: "The patch test must be left for 48 hours before your appointment.",
      },
      {
        icon: "reaction",
        title: "Reactions",
        body:
          "Redness, itching or any discomfort means the patch test is positive. Wash off immediately and take appropriate precautions for the reaction.",
      },
    ],
    closing: [
      "The importance of a patch test is crucial — it helps keep you safe before any colour service.",
      "If you are unsure whether you need one, please ask when booking.",
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation and no-show policy",
    intro:
      "At Belaisy Hair and Beauty Lounge, we kindly ask that all cancellations be made at least 48 hours before your scheduled appointment.",
    points: [
      {
        icon: "notice",
        title: "48 hours' notice",
        body: "Required for any appointment cancellation or rescheduling.",
      },
      {
        icon: "late",
        title: "Late cancellations",
        body: "Cancellations made within 48 hours of the appointment will incur a charge.",
      },
      {
        icon: "noshow",
        title: "No-shows",
        body: "No-show appointments will be charged 100% of the scheduled service cost.",
      },
    ],
    closing: [
      "We understand that unexpected situations and emergencies can happen. If you are unable to attend your appointment, please contact us as soon as possible and we will do our best to assist you.",
      "We are on hand on social media or by phone to pick up cancellations — the earlier you let us know, the better we can help.",
      "Thank you for your understanding and cooperation.",
    ],
  },
];
