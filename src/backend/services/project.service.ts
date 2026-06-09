/**
 * Project backend service.
 *
 * Retrieves project data from the database. The service layer is the right
 * place to add sorting, filtering, or caching in the future.
 */

import { projectRepository } from "@/backend/repositories/project.repository";
import type { ProjectRecord } from "@/backend/types/project.types";
import type { ServiceResult } from "@/backend/types/common.types";

export class ProjectService {
  async getAll(): Promise<ServiceResult<ProjectRecord[]>> {
    try {
      const projects = await projectRepository.findAll();
      return { ok: true, data: projects };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch projects";
      console.error("[ProjectService]", message);
      return { ok: false, error: "Unable to load projects at this time." };
    }
  }

  async getFeatured(): Promise<ServiceResult<ProjectRecord[]>> {
    try {
      const projects = await projectRepository.findFeatured();
      return { ok: true, data: projects };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch featured projects";
      console.error("[ProjectService]", message);
      return { ok: false, error: "Unable to load featured projects at this time." };
    }
  }

  async getById(id: string): Promise<ServiceResult<ProjectRecord | null>> {
    try {
      const project = await projectRepository.findById(id);
      return { ok: true, data: project };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch project";
      console.error("[ProjectService]", message);
      return { ok: false, error: "Unable to load this project at this time." };
    }
  }
}

export const projectService = new ProjectService();
