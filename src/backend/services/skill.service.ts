/**
 * Skill backend service.
 */

import { skillRepository } from "@/backend/repositories/skill.repository";
import type { GroupedSkills, SkillRecord } from "@/backend/repositories/skill.repository";
import type { ServiceResult } from "@/backend/types/common.types";

export class SkillService {
  async getAll(): Promise<ServiceResult<SkillRecord[]>> {
    try {
      const skills = await skillRepository.findAll();
      return { ok: true, data: skills };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch skills";
      console.error("[SkillService]", message);
      return { ok: false, error: "Unable to load skills at this time." };
    }
  }

  async getGrouped(): Promise<ServiceResult<GroupedSkills[]>> {
    try {
      const grouped = await skillRepository.findGrouped();
      return { ok: true, data: grouped };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch grouped skills";
      console.error("[SkillService]", message);
      return { ok: false, error: "Unable to load skills at this time." };
    }
  }
}

export const skillService = new SkillService();
