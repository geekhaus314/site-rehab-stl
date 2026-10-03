export const studio = {
  name: "Web Rehab STL",
  founder: "Jake",
  city: "Florissant",
  email: "geekhaus314@proton.me",
  site: "https://webrehabstl.pages.dev",
  price: 1200,
  description:
    "Websites for St. Louis trades that get you found when people search, chosen over the other quotes, and booked while you work. From $1,200, days not months, no monthly fee.",
  areas: [
    {
      name: "St. Louis County",
      places: [
        "Florissant",
        "St. Louis",
        "Chesterfield",
        "Kirkwood",
        "Ballwin",
        "Bridgeton",
        "Hazelwood",
        "Maryland Heights",
        "Overland",
      ],
    },
    {
      name: "St. Charles County",
      places: ["St. Charles", "O'Fallon, MO", "St. Peters", "Wentzville"],
    },
    {
      name: "West of St. Louis",
      places: ["Troy, MO", "Winfield", "Warrenton"],
    },
    {
      name: "Illinois side of the river",
      places: [
        "O'Fallon, IL",
        "Belleville",
        "Edwardsville",
        "East St. Louis",
        "Alton",
        "Grafton",
        "Troy, IL",
      ],
    },
  ],
  services: [
    {
      label: "Found",
      title: "Found when they search for you",
      body:
        "Someone types your trade into a phone three miles from your house. The pages, titles and listings that decide whether you come up are set up properly, so you are one of the names they see.",
      outcome: "You are on the list instead of the other way around.",
    },
    {
      label: "Chosen",
      title: "Chosen before they call the other three",
      body:
        "Most people get three quotes. They look at all three, and they pick the one that looks like it knows what it is doing. That is a design problem, and it is the part I am best at.",
      outcome: "They pick you on the website, not on price alone.",
    },
    {
      label: "Booked",
      title: "Booked while your hands are full",
      body:
        "Enquiries that arrive in your phone the second they are sent, appointments in a calendar, cards taken. It works the hours you do not.",
      outcome: "Work comes in without you chasing it.",
    },
    {
      label: "Yours",
      title: "Yours, with room to grow into it",
      body:
        "No monthly fee, no hostage hosting, no permission needed to change anything. Start with one page and add the rest when you are ready for it.",
      outcome: "Start small, scale up, and never rent your own site back.",
    },
  ],
  projects: [
    {
      title: "Hair and extensions clinic — live on its own domain",
      body:
        "A working clinic site with service pages, a shop section and admin tooling, on myhairloss.com with the www and admin subdomains live. Built it, and I still look after it — which is the part worth saying out loud, because a site that needs an outsider to babysit it is not really fixed.",
      url: "https://myhairloss.com",
      link: "myhairloss.com",
      shots: [
        { name: "brian-home", alt: "Brian Ivie Hair homepage" },
        { name: "myhairloss", alt: "myhairloss.com site" },
        { name: "brian-services", alt: "Brian Ivie Hair service pages" },
        { name: "brian-shop", alt: "Brian Ivie Hair shop section" },
      ],
    },
    {
      title: "Wildlife photographer — rebuilt so the work comes first",
      body:
        "My mother photographs wildlife. This is her site — rebuilt, faster, and rearranged so the photographs land before the words do. Editorial type, dark gallery presentation, full-screen lightbox.",
      url: "https://angie-viefhaus.pages.dev",
      link: "angie-viefhaus.pages.dev",
      shots: [{ name: "angie-pages", alt: "Angie Viefhaus photography portfolio" }],
    },
    {
      title: "Wholesale distributor — store, accounts and checkout",
      body:
        "A real store rather than a brochure: product catalogue, brand browse, accounts, card payments and email — for a distributor here in Florissant. The parts that break are accounts, money and notifications, and this one handles all three.",
      url: "https://kananenterprises.vercel.app/united",
      link: "kananenterprises.vercel.app/united",
      shots: [
        { name: "kananos-home", alt: "United Distribution storefront" },
        { name: "kanan-e-checkout", alt: "United Distribution checkout flow" },
      ],
    },
  ],
} as const;

export const estimatorQuestions = [
  {
    id: "have",
    line: null,
    ask: "Do you have a website?",
    options: [
      { label: "Yes, and it is mine", weight: {} },
      { label: "Yes, but it is not really mine", weight: { rehab: 3 } },
      { label: "There is one somewhere, I think", weight: { rehab: 2 } },
      { label: "No", weight: { launch: 3 } },
    ],
  },
  {
    id: "working",
    line: "rehab",
    ask: "When someone looks you up, can they do anything from the site?",
    help: "Call, book, or send you a message. Any of those count.",
    options: [
      { label: "It takes people somewhere else entirely", weight: { rehab: 3 } },
      { label: "They cannot call or book from it", weight: { rehab: 2 } },
      { label: "It works, it just looks old", weight: { rehab: 1 } },
      { label: "It does its job", weight: {} },
    ],
  },
  {
    id: "found",
    line: "visibility",
    ask: "When people search for your trade near you, do you come up?",
    options: [
      { label: "No, or I have honestly no idea", weight: { visibility: 3 } },
      { label: "Only from people who already know me", weight: { visibility: 2 } },
      { label: "I come up, but a long way down", weight: { visibility: 1 } },
      { label: "Yes, I get found", weight: {} },
    ],
  },
  {
    id: "taking-work",
    line: "systems",
    ask: "Do you want the site to be taking work for you?",
    help: "Bookings, quotes, or card payments — while you are busy, not after.",
    options: [
      { label: "Yes — bookings and quotes", weight: { systems: 3 } },
      { label: "Yes — taking card payments", weight: { systems: 3 } },
      { label: "No, it just needs to look right", weight: {} },
    ],
  },
] as const;

export type EstimatorLine = "rehab" | "launch" | "visibility" | "systems" | "none";
export type EstimatorAnswers = Record<string, string>;
export type EstimatorTotals = Record<Exclude<EstimatorLine, "none">, number>;

export const scoreEstimate = (answers: EstimatorAnswers): EstimatorTotals => {
  const totals: EstimatorTotals = { rehab: 0, launch: 0, visibility: 0, systems: 0 };
  for (const question of estimatorQuestions) {
    const selected = question.options.find((option) => option.label === answers[question.id]);
    if (!selected) continue;
    for (const [line, weight] of Object.entries(selected.weight)) {
      totals[line as keyof EstimatorTotals] += weight;
    }
  }
  return totals;
};

export const primaryEstimateLine = (totals: EstimatorTotals): EstimatorLine => {
  if (Object.values(totals).every((value) => value === 0)) return "none";
  const order: Exclude<EstimatorLine, "none">[] =
    totals.rehab > 0 ? ["rehab", "systems", "visibility"] : ["launch", "systems", "visibility"];
  return order.reduce((best, line) => (totals[line] > totals[best] ? line : best), order[0]);
};
