export type SkillCategoryId = "programming" | "databases" | "web" | "tools";

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly categoryId: SkillCategoryId;
}

export interface SkillCategory {
  readonly id: SkillCategoryId;
  readonly label: string;
  readonly skills: readonly Skill[];
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly type: string;
  readonly summary: string;
  readonly technologies: readonly string[];
  readonly badges: readonly string[];
  readonly githubUrl?: string;
  readonly showcaseUrl?: string;
}

export interface HireReason {
  readonly title: string;
  readonly description: string;
}

export interface TimelineItem {
  readonly id: string;
  readonly category: "Education" | "Achievements" | "Certificates";
  readonly title: string;
  readonly subtitle?: string;
  readonly description?: string;
}

export interface ContactInfo {
  readonly label: string;
  readonly value: string;
  readonly href?: string;
}

export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

export interface ContactSubmissionResult {
  readonly ok: boolean;
  readonly message: string;
}

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";
