export const projects = [
  {
    slug: "axo-group-uscore",
    title: "Redesigning uScore, a Nordic fintech SaaS product",
    company: "Axo Group",
    role: "UX Designer (CRO & Product Focus)",
    location: "Copenhagen, Denmark",
    year: "2023 – Present",
    tags: ["SaaS", "Fintech", "CRO", "1M+ users"],
    accent: "#3654A6",
    tagline:
      "Took over design for a financial SaaS product with over a million users in the Nordics after its initial launch, and helped grow it into a profitable business unit.",
    summary:
      "I took over the design for uScore, a financial SaaS product with over a million users across the Nordics, shortly after its initial launch. Working closely with product, marketing, and research teams, I led a redesign and rethink of the platform to better meet user needs and business goals.",
    responsibilities: [
      "Gathered user insights through interviews and data to reshape the UX and UI of the platform.",
      "Worked cross-functionally with product, marketing, and research teams to align design decisions with business goals.",
      "Contributed to marketing materials for subsequent campaigns.",
    ],
    highlights: [
      "The product grew into a profitable business unit within the first year.",
      "User reviews improved from 3.7 to 4.3.",
    ],
    cover: "01",
  },
  {
    slug: "flat101-cro",
    title: "CRO strategy and design consultancy for international clients",
    company: "Flat 101",
    role: "UX Designer, CRO & Design Consultant",
    location: "Madrid, Spain",
    year: "2021 – 2023",
    tags: ["CRO", "Consultancy", "Design Systems", "Multi-client"],
    accent: "#2F6F5E",
    tagline:
      "Collaborated with multiple teams and international clients on UX strategies aimed at improving conversion rates and key business metrics.",
    summary:
      "At Flat 101, I worked across multiple teams and international clients on UX strategy focused on conversion rate optimization, taking the lead on or contributing to projects spanning user research, design system migrations, and product optimization.",
    responsibilities: [
      "Led and contributed to user research across client projects.",
      "Worked on design system migrations for client products.",
      "Turned complex data and user insights into practical design solutions aimed at improving conversion rates and business metrics.",
    ],
    highlights: [
      "Delivered CRO-focused design strategy across multiple international client accounts.",
    ],
    cover: "02",
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
