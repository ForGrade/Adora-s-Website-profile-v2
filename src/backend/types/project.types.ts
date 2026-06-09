/**
 * Project feature — backend domain types.
 */

// ---------------------------------------------------------------------------
// Domain model
// ---------------------------------------------------------------------------

export interface ProjectRecord {
  id: string;
  title: string;
  summary: string;
  type: string;
  technologies: string[];
  githubUrl: string | null;
  showcaseUrl: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------

export interface CreateProjectInput {
  title: string;
  summary: string;
  type: string;
  technologies: string[];
  githubUrl?: string | null;
  showcaseUrl?: string | null;
  featured?: boolean;
}

// ---------------------------------------------------------------------------
// Repository contract
// ---------------------------------------------------------------------------

export interface IProjectRepository {
  findAll(): Promise<ProjectRecord[]>;
  findFeatured(): Promise<ProjectRecord[]>;
  findById(id: string): Promise<ProjectRecord | null>;
}
