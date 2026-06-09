import type { SkillCategory } from "@/types";

export const skillCategories: readonly SkillCategory[] = [
  {
    id: "programming",
    label: "Programming Languages",
    skills: [
      { id: "javascript", name: "JavaScript", categoryId: "programming" },
      { id: "typescript", name: "TypeScript", categoryId: "programming" },
      { id: "python", name: "Python", categoryId: "programming" },
      { id: "java", name: "Java", categoryId: "programming" },
      { id: "cpp", name: "C++", categoryId: "programming" },
      { id: "csharp", name: "C#", categoryId: "programming" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    skills: [
      { id: "postgresql", name: "PostgreSQL", categoryId: "databases" },
      { id: "supabase", name: "Supabase", categoryId: "databases" },
    ],
  },
  {
    id: "web",
    label: "Web Technologies",
    skills: [
      { id: "html", name: "HTML", categoryId: "web" },
      { id: "css", name: "CSS", categoryId: "web" },
      { id: "web-javascript", name: "JavaScript", categoryId: "web" },
      { id: "web-typescript", name: "TypeScript", categoryId: "web" },
    ],
  },
  {
    id: "tools",
    label: "Development Tools",
    skills: [
      { id: "xampp", name: "XAMPP", categoryId: "tools" },
      { id: "git", name: "Git", categoryId: "tools" },
      { id: "github", name: "GitHub", categoryId: "tools" },
      { id: "cursor", name: "Cursor", categoryId: "tools" },
    ],
  },
];
