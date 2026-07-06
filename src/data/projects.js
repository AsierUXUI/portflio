import uscoreVehicleMobile from "../assets/uscore-vehicle/mobile.png";
import uscoreVehicleDesktop from "../assets/uscore-vehicle/desktop.png";

import gamaConcept from "../assets/case-studies/a3media-gama/concept.jpg";
import gamaIdeation from "../assets/case-studies/a3media-gama/ideation.jpg";
import gamaDesign from "../assets/case-studies/a3media-gama/design.jpg";

import axaConcept from "../assets/case-studies/axa-cro/concept.jpg";
import axaIdeation from "../assets/case-studies/axa-cro/ideation.jpg";
import axaDesign from "../assets/case-studies/axa-cro/design.jpg";

import mmiConcept from "../assets/case-studies/mmi-torre-cristal/concept.jpg";
import mmiIdeation from "../assets/case-studies/mmi-torre-cristal/ideation.jpg";
import mmiDesign from "../assets/case-studies/mmi-torre-cristal/design.jpg";

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
    prototypeUrl: `${import.meta.env.BASE_URL}prototypes/uscore-vehicle/index.html`,
  },
  {
    slug: "a3media-gama",
    title: "Redesigning GAMA, Atresmedia's 20-year-old media tool",
    client: "A3Media (Atresmedia)",
    company: "Flat 101",
    role: "UX/UI Designer",
    duration: "2 months",
    team: "Two UX/UI designers",
    tags: ["Design System", "B2B Tool", "UI Kit"],
    accent: "#E14D2A",
    tagline:
      "Turned a 20-year-old internal media-management tool into a modern MVP, working with a dev team that had never used Figma or a component library before.",
    images: { desktop: gamaConcept },
    sections: [
      {
        key: "concept",
        title: "Concept",
        image: gamaConcept,
        text: "GAMA is A3Media's internal tool for managing all kinds of media content — video, photos, audio, programs, series, movies — from the moment it's created. It's used by many different types of users and hadn't changed in over 20 years: the interface was obsolete and the experience was a struggle even for experienced users. The client wanted to modernize it and was also interested in eventually marketing the tool itself, but given its complexity and steep learning curve, that wasn't realistic in its current state — so we scoped an MVP built around the core functionality, focused on improving both the experience and the interface.",
      },
      {
        key: "ideation",
        title: "Ideation",
        image: gamaIdeation,
        text: "After running tests with users to gather qualitative insights, we mapped the flows for the tool's seven main functionalities that would later become the proposed solution. To ideate original solutions, we benchmarked similar content-management tools to see which patterns could fit GAMA's way of working, while parallel ideation sessions explored solutions that would add real value — all while keeping the tool flexible enough for very different user profiles.",
      },
      {
        key: "design",
        title: "Design",
        image: gamaDesign,
        text: "Once the direction was clear, we built low-fidelity wireframes for each flow and validated them periodically with the client, applying changes where needed. Once flows and functionality were validated, we built a UI kit of reusable components, designed to be flexible and scalable so the client's team could keep using them without complication — many of them based on the PrimeNG libraries to make the developers' job easier.",
      },
    ],
    conclusions: [
      {
        title: "UI and componentization",
        text: "This was a demanding UI project — not just because of the number of screens, but because the development team had never used Figma or a free component library like PrimeNG before. Designing a solid, atomic-design-based UI kit and explaining how to use, adjust, and scale it to teammates who'd never worked that way was a real exercise in itself.",
      },
      {
        title: "Stakeholder management",
        text: "One of the things I worked hardest on and learned the most from was managing the expectations of stakeholders unfamiliar with UX — explaining what we were doing, why we were making certain decisions, and making sure personal opinions didn't creep into the final product.",
      },
      {
        title: "Flexible design",
        text: "Designing one tool for such different user profiles — novices and power users alike — without much room for research or testing was a real challenge. We still found ways to ease the learning curve for new users while speeding up daily tasks for experienced ones, through an organized dashboard and shortcuts.",
      },
    ],
  },
  {
    slug: "axa-cro",
    title: "CRO sprints across AXA's contracting funnels",
    client: "AXA",
    company: "Flat 101",
    role: "UX/UI Designer",
    duration: "2.5-week sprints",
    team: "One UX/UI designer",
    tags: ["CRO", "A/B Testing", "Behavioral Design"],
    accent: "#00008F",
    tagline:
      "Ongoing conversion-rate-optimization work across AXA's contracting funnels — small, evidence-based interface changes, measured with A/B tests.",
    images: { desktop: axaConcept },
    sections: [
      {
        key: "concept",
        title: "Concept",
        image: axaConcept,
        text: "A large-scale CRO project designing small solutions throughout AXA's different contracting funnels on the web, then running A/B tests to measure whether each change was actually worth implementing. No single task moves the needle by much on its own, but the sum of many small, validated changes is what makes the real difference. These projects mix disciplines — UX, development, digital analytics, SEO — and require constant communication with stakeholders, since everything runs on 3-week sprints.",
      },
      {
        key: "ideation",
        title: "Ideation",
        image: axaIdeation,
        text: "After picking one of the tasks the client defined, I assess whether it genuinely needs addressing or whether other actions should be prioritized first. The problems are often simple to solve — mostly because the existing designs weren't originally built by UX designers and don't meet basic usability standards — but I still justify every design with heuristics, UX laws, small benchmarks, and, in some cases, cognitive biases and behavioral design. Once I know what I want to do, I check technical feasibility with the development team before moving forward.",
      },
      {
        key: "design",
        title: "Design",
        image: axaDesign,
        text: "Once the direction is clear, I turn the ideas into interfaces in Sketch. One of the more interesting — and complex — parts is translating cognitive biases into a physical design that actually triggers them, which takes a lot of reference-gathering and looking at how other companies solve similar problems. Once a design is defined and technically feasible, the analytics team chooses the metrics, KPIs, traffic, and measurement plan for the A/B test, and everything gets exported to InVision for developers to implement. If the variant beats the original by a meaningful margin, a write-up goes to the client's dev team so it can ship for good.",
      },
    ],
    conclusions: [
      {
        title: "Behavioural design",
        text: "This has been one of the most enriching projects in terms of behavioral economics — designing with cognitive biases in mind to make tasks easier for users, and being able to justify those decisions to clients in a much more solid way.",
      },
      {
        title: "Data analysis",
        text: "Working with the analytics department taught me to read data far more critically, using tools like Content Square to focus effort on the parts of a site that actually need it, or to see user behavior quickly through recordings and heatmaps.",
      },
      {
        title: "Surveys and A/B testing",
        text: "AB testing and user testing weren't areas I'd had much chance to work on before this project. Comparing how differently I framed early surveys against later ones taught me a lot about writing more neutral, less leading questions.",
      },
      {
        title: "A personal thought",
        text: "One thing I learned here is not to give in to individual stakeholder preferences once a solution has been proposed with solid reasoning behind it — defending your work with confidence and assertiveness turned out to matter more than I'd expected.",
      },
    ],
  },
  {
    slug: "mmi-torre-cristal",
    title: "Redesigning Mutua Madrileña Inmobiliaria's real-estate site",
    client: "Mutua Madrileña Inmobiliaria",
    company: "Flat 101",
    role: "UX/UI Designer",
    duration: "5 months",
    team: "Three UX/UI designers",
    tags: ["Real Estate", "Brand Identity", "Responsive"],
    accent: "#0B1E3D",
    tagline:
      "A full redesign of a real-estate brand's website, including a brand identity that was still being defined as the project went on.",
    images: { desktop: mmiConcept },
    sections: [
      {
        key: "concept",
        title: "Concept",
        image: mmiConcept,
        text: "After a long time without touching their website, Mutua Madrileña's real-estate division wanted a complete redesign of their platform — something that would feel exclusive and elegant while staying modern, for clients renting or managing office space in some of Madrid's best locations. We worked in Figma to build a responsive experience for both desktop and mobile, validated with the client in weekly meetings, and worked on both visual design and copywriting.",
      },
      {
        key: "ideation",
        title: "Ideation",
        image: mmiIdeation,
        text: "As with any client project, once a task is chosen we assess whether it's genuinely worth solving or whether something else should be prioritized. Since the existing site hadn't been touched by a UX designer, most fixes were fairly clear — but we still justified every design decision with heuristics, UX laws, and small benchmarks, and checked feasibility with the development team before moving forward.",
      },
      {
        key: "design",
        title: "Design",
        image: mmiDesign,
        text: "We translated the agreed direction into interfaces in Sketch, paying particular attention to translating the brand's still-forming identity — \"elegance,\" \"subtlety,\" \"fineness\" — into something concrete, mostly through reference-gathering and inspiration maps. Designs were validated with the client, checked for technical feasibility, and delivered to the dev team through InVision.",
      },
    ],
    conclusions: [
      {
        title: "Responsive and mobile design",
        text: "Designing for both desktop and mobile meant constantly rethinking solutions that would hold up on both. Learning to work with auto-layout saved a lot of time and effort, especially when clients asked for changes overnight or within a few hours.",
      },
      {
        title: "Brand and identity design",
        text: "The most interesting part of this project was designing for a brand identity that wasn't fully defined yet and was being created on the fly. Translating feelings like \"elegance\" or \"subtlety\" into an interface seemed complex at first, but got much easier through references and inspiration maps.",
      },
      {
        title: "Receiving feedback",
        text: "The hardest part was accepting some fairly harsh criticism from the client. I've always been fairly self-critical, but I learned that criticism — when well-founded and delivered without disrespect — is one of the most useful things a project can have, as long as it leaves room to keep building rather than shutting the work down.",
      },
    ],
  },
  {
    slug: "alsea",
    title: "A multi-brand app for a Mexican restaurant franchise group",
    client: "Alsea",
    company: "Flat 101",
    role: "UX/UI Designer",
    duration: "Ongoing",
    team: "Six UX/UI designers",
    status: "In progress",
    tags: ["Multi-brand", "Mobile App", "In progress"],
    accent: "#134E4A",
    tagline:
      "Designing a single app that works across several restaurant brands at once, without flattening what makes each of them recognizable.",
    sections: [
      {
        key: "concept",
        title: "Concept",
        text: "Alsea operates multiple restaurant brands across Latin America, and this project is about designing one multi-brand app that works across all of them without erasing each brand's own identity.",
      },
      {
        key: "ideation",
        title: "Ideation",
        text: "The core challenge is finding solutions that let the different brands coexist within the same experience without any of them losing what makes them recognizable.",
      },
      {
        key: "design",
        title: "Design",
        text: "The goal is a distinct, recognizable visual language for each brand individually, while keeping the multichannel experience underneath consistent and coherent.",
      },
    ],
    conclusions: [],
    cover: "05",
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
