import type { ContactInfo, HireReason } from "@/types";

export const SITE_METADATA = {
  title: "John Mark R. Adora | Software Developer Portfolio",
  description:
    "Personal portfolio of John Mark R. Adora, a BSCS student and software developer focused on modern web applications, databases, and software engineering.",
  ownerName: "John Mark R. Adora",
  role: "Computer Science Student | Aspiring Software Engineer",
  tagline: "Mobile Developer | Web Developer | Continuous Learner",
  siteUrl: undefined,
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/case-studies", label: "Case Studies" },
] as const;

export const CONTACT_INFO: readonly ContactInfo[] = [
  { label: "Email", value: "johnmark25.com@gmail.com", href: "mailto:johnmark25.com@gmail.com" },
  { label: "Phone", value: "09360987757", href: "tel:09360987757" },
  { label: "Location", value: "Pasay City, Philippines" },
];

export const SOCIAL_LINKS: readonly { readonly label: string; readonly href: string }[] = [];

export const HIRE_REASONS: readonly HireReason[] = [
  {
    title: "Problem Solving",
    description:
      "Able to analyze problems and develop effective solutions using software engineering principles.",
  },
  {
    title: "Continuous Learner",
    description:
      "Constantly improving technical and professional skills to adapt to industry trends.",
  },
  {
    title: "Team Collaboration",
    description: "Works effectively with teams and communicates ideas clearly.",
  },
  {
    title: "Passion for Technology",
    description:
      "Motivated to create impactful software solutions and contribute to meaningful projects.",
  },
];
