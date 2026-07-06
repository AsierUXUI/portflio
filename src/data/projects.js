export const projects = [
  {
    slug: "fintech-onboarding",
    title: "Rebuilding onboarding for a fintech app",
    tagline: "Cut sign-up drop-off by redesigning a 9-step form into a guided 3-step flow.",
    year: "2025",
    role: "Lead Product Designer",
    timeline: "8 weeks",
    tools: ["Figma", "Maze", "Notion"],
    tags: ["Mobile", "UX Research", "0→1"],
    accent: "#3654A6",
    summary:
      "A fintech client's mobile onboarding lost most users before they reached their first transaction. The task was to find out why and design a flow people would actually finish.",
    problem:
      "Analytics showed a 62% drop-off across a 9-screen onboarding form. Support tickets pointed to confusing identity-verification steps and unclear progress. Placeholder: replace with your real discovery notes and data.",
    process: [
      {
        title: "Research",
        detail:
          "Reviewed session recordings and ran 6 moderated interviews with recent drop-offs to find the exact steps where people gave up.",
      },
      {
        title: "Flow mapping",
        detail:
          "Consolidated 9 screens into 3 logical stages, moved identity verification later so users saw value before being asked for sensitive documents.",
      },
      {
        title: "Prototyping & testing",
        detail:
          "Tested two prototypes with 12 users via Maze, iterated on copy and error states based on task-completion and confidence scores.",
      },
    ],
    outcome:
      "Placeholder result: +24% completion rate in the first month post-launch, verified against a holdout A/B group.",
    cover: "01",
  },
  {
    slug: "design-system",
    title: "A design system for a growing SaaS platform",
    tagline: "Unified five product teams around one component library and token set.",
    year: "2024",
    role: "Design Systems Lead",
    timeline: "4 months",
    tools: ["Figma", "Storybook", "React"],
    tags: ["Design Systems", "Component Library", "Cross-team"],
    accent: "#2F6F5E",
    summary:
      "Five product squads were shipping visually inconsistent UI with duplicated components. The goal was a shared system that didn't slow teams down.",
    problem:
      "Each team had its own button, spacing, and color variants. Placeholder: swap in the real audit numbers — e.g., how many duplicate components existed before the system shipped.",
    process: [
      {
        title: "Audit",
        detail:
          "Catalogued every UI pattern in production across teams and grouped near-duplicates to define a minimal core set.",
      },
      {
        title: "Tokens & components",
        detail:
          "Defined a token layer (color, spacing, type) and built the first 20 components in Figma paired 1:1 with React implementations.",
      },
      {
        title: "Rollout",
        detail:
          "Ran office hours and migration guides per team, tracked adoption weekly instead of mandating a big-bang switch.",
      },
    ],
    outcome:
      "Placeholder result: adopted by all 5 teams within one quarter, new feature UI review time dropped noticeably.",
    cover: "02",
  },
  {
    slug: "care-scheduling",
    title: "Simplifying appointment booking for a healthcare provider",
    tagline: "Redesigned a confusing scheduling flow for patients with low digital confidence.",
    year: "2024",
    role: "Product Designer",
    timeline: "6 weeks",
    tools: ["Figma", "UserTesting", "FigJam"],
    tags: ["Accessibility", "Healthcare", "UX Research"],
    accent: "#8A4B2E",
    summary:
      "Patients, including many older adults, struggled to book appointments online and were calling the front desk instead, overloading staff.",
    problem:
      "Placeholder: describe the real baseline — e.g., call-center volume, task success rate in usability tests, or specific accessibility failures found in an audit.",
    process: [
      {
        title: "Accessibility audit",
        detail:
          "Ran the existing flow against WCAG 2.1 AA and found low-contrast text, unlabeled form fields, and no error recovery guidance.",
      },
      {
        title: "Co-design sessions",
        detail:
          "Worked with 5 patients aged 55+ to redesign the flow around plain language, larger touch targets, and a single clear next action per screen.",
      },
      {
        title: "Validation",
        detail:
          "Tested revised flow with the same group plus new participants, tracked task completion and time-on-task.",
      },
    ],
    outcome:
      "Placeholder result: task completion rate rose from baseline to a majority of first-time users completing booking unassisted.",
    cover: "03",
  },
  {
    slug: "checkout-optimization",
    title: "Reducing checkout abandonment for an e-commerce brand",
    tagline: "Streamlined a 5-step checkout and rebuilt trust signals at the point of payment.",
    year: "2023",
    role: "UX/UI Designer",
    timeline: "5 weeks",
    tools: ["Figma", "Hotjar", "Google Analytics"],
    tags: ["E-commerce", "Conversion", "UI"],
    accent: "#5B4B8A",
    summary:
      "Cart abandonment was concentrated at the payment step. The brief was to find friction points and redesign for trust and clarity.",
    problem:
      "Placeholder: replace with the real funnel numbers — where exactly users dropped off and what heatmaps/session replays revealed.",
    process: [
      {
        title: "Funnel analysis",
        detail:
          "Used analytics and session replays to isolate the payment step as the highest-drop point in the funnel.",
      },
      {
        title: "Redesign",
        detail:
          "Reduced the flow from 5 steps to 2, added persistent order summary, and surfaced security badges and return policy near the payment button.",
      },
      {
        title: "A/B test",
        detail:
          "Ran the new flow against the original for 3 weeks across a meaningful share of traffic before full rollout.",
      },
    ],
    outcome:
      "Placeholder result: measurable lift in completed checkouts, with the largest gains on mobile.",
    cover: "04",
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
