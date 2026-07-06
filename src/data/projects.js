import uscoreVehicleMobile from "../assets/uscore-vehicle/mobile.png";
import uscoreVehicleDesktop from "../assets/uscore-vehicle/desktop.png";

export const projects = [
  {
    slug: "uscore-vehicle-page",
    title: "Redesigning the vehicle overview page for uScore",
    company: "Axo Group",
    role: "UX Designer (CRO & Product Focus)",
    location: "Copenhagen, Denmark",
    year: "2024",
    tags: ["Fintech", "Dashboard", "Mobile & Desktop", "Prototype"],
    accent: "#20344F",
    tagline:
      "Redesigned how users track a vehicle's value and loan health in the uScore app — from a single card to a full overview page with trends and tailored product recommendations.",
    summary:
      "As part of my ongoing work on uScore, I redesigned the vehicle overview experience: a dedicated page where users can see their car's details, track its estimated value over time, monitor their loan (balance, rate, remaining term), and discover relevant financial products — all in one place, on both mobile and desktop.",
    responsibilities: [
      "Designed the vehicle detail card, value trend chart (5mo / 12mo / 3yr / max), and loan summary layout.",
      "Built a working front-end prototype covering multiple real states: no loan, one loan, several loans, and different loan-to-value levels.",
      "Adapted the layout for both mobile and desktop.",
    ],
    highlights: [
      "Prototype covers real edge cases (0–4+ vehicles, different loan-to-value bands) rather than just the happy path.",
      "Before/after comparison coming soon.",
    ],
    images: {
      mobile: uscoreVehicleMobile,
      desktop: uscoreVehicleDesktop,
    },
  },
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
    cover: "02",
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
    cover: "03",
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
