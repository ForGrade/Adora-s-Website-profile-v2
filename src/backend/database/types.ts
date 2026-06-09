/**
 * Supabase database type definitions.
 *
 * These mirror the exact table/column structure in Supabase.
 * They are the raw DB layer — not the application domain types.
 * Run `npx supabase gen types typescript` to regenerate from a live project.
 */

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: ContactSubmissionRow;
        Insert: ContactSubmissionInsert;
        Update: Partial<ContactSubmissionInsert>;
      };
      projects: {
        Row: ProjectRow;
        Insert: ProjectInsert;
        Update: Partial<ProjectInsert>;
      };
      skills: {
        Row: SkillRow;
        Insert: SkillInsert;
        Update: Partial<SkillInsert>;
      };
      career_insights: {
        Row: CareerInsightRow;
        Insert: CareerInsightInsert;
        Update: Partial<CareerInsightInsert>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      skill_category: "programming" | "databases" | "web" | "tools";
      insight_category: "career" | "technology" | "learning" | "industry";
    };
  };
}

// ---------------------------------------------------------------------------
// contact_submissions
// ---------------------------------------------------------------------------

export interface ContactSubmissionRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface ContactSubmissionInsert {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

// ---------------------------------------------------------------------------
// projects
// ---------------------------------------------------------------------------

export interface ProjectRow {
  id: string;
  title: string;
  summary: string;
  type: string;
  technologies: string[];
  github_url: string | null;
  showcase_url: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectInsert {
  id?: string;
  title: string;
  summary: string;
  type: string;
  technologies: string[];
  github_url?: string | null;
  showcase_url?: string | null;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

// ---------------------------------------------------------------------------
// skills
// ---------------------------------------------------------------------------

export interface SkillRow {
  id: string;
  category: Database["public"]["Enums"]["skill_category"];
  name: string;
  proficiency: number | null; // 1–100
  created_at: string;
}

export interface SkillInsert {
  id?: string;
  category: Database["public"]["Enums"]["skill_category"];
  name: string;
  proficiency?: number | null;
  created_at?: string;
}

// ---------------------------------------------------------------------------
// career_insights
// ---------------------------------------------------------------------------

export interface CareerInsightRow {
  id: string;
  title: string;
  content: string;
  category: Database["public"]["Enums"]["insight_category"];
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CareerInsightInsert {
  id?: string;
  title: string;
  content: string;
  category: Database["public"]["Enums"]["insight_category"];
  tags?: string[];
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}
