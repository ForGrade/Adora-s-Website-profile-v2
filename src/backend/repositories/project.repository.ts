/**
 * Project repository.
 *
 * Reads project data from Supabase. All DB-to-domain mapping lives here.
 */

import { getServerClient } from "@/backend/database/supabase";
import type { ProjectRow } from "@/backend/database/types";
import type { IProjectRepository, ProjectRecord } from "@/backend/types/project.types";

function mapRow(row: ProjectRow): ProjectRecord {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    type: row.type,
    technologies: row.technologies,
    githubUrl: row.github_url,
    showcaseUrl: row.showcase_url,
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class ProjectRepository implements IProjectRepository {
  private get db() {
    return getServerClient();
  }

  async findAll(): Promise<ProjectRecord[]> {
    const { data, error } = await this.db
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`ProjectRepository.findAll failed: ${error.message}`);
    }

    return (data ?? []).map(mapRow);
  }

  async findFeatured(): Promise<ProjectRecord[]> {
    const { data, error } = await this.db
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`ProjectRepository.findFeatured failed: ${error.message}`);
    }

    return (data ?? []).map(mapRow);
  }

  async findById(id: string): Promise<ProjectRecord | null> {
    const { data, error } = await this.db
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // row not found
      throw new Error(`ProjectRepository.findById failed: ${error.message}`);
    }

    return data ? mapRow(data) : null;
  }
}

export const projectRepository = new ProjectRepository();
