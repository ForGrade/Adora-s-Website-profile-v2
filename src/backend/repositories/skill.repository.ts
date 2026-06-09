/**
 * Skill repository.
 *
 * Reads skill data from Supabase and groups flat rows into the
 * categorised shape expected by the application layer.
 */

import { getServerClient } from "@/backend/database/supabase";
import type { SkillRow } from "@/backend/database/types";
import type { Database } from "@/backend/database/types";

export type SkillCategoryId = Database["public"]["Enums"]["skill_category"];

export interface SkillRecord {
  id: string;
  category: SkillCategoryId;
  name: string;
  proficiency: number | null;
  createdAt: string;
}

export interface GroupedSkills {
  category: SkillCategoryId;
  skills: SkillRecord[];
}

function mapRow(row: SkillRow): SkillRecord {
  return {
    id: row.id,
    category: row.category,
    name: row.name,
    proficiency: row.proficiency,
    createdAt: row.created_at,
  };
}

export class SkillRepository {
  private get db() {
    return getServerClient();
  }

  async findAll(): Promise<SkillRecord[]> {
    const { data, error } = await this.db
      .from("skills")
      .select("*")
      .order("category")
      .order("name");

    if (error) {
      throw new Error(`SkillRepository.findAll failed: ${error.message}`);
    }

    return (data ?? []).map(mapRow);
  }

  async findByCategory(category: SkillCategoryId): Promise<SkillRecord[]> {
    const { data, error } = await this.db
      .from("skills")
      .select("*")
      .eq("category", category)
      .order("name");

    if (error) {
      throw new Error(`SkillRepository.findByCategory failed: ${error.message}`);
    }

    return (data ?? []).map(mapRow);
  }

  /**
   * Returns skills grouped by category — matches the shape used by
   * the existing SkillsSection component pattern.
   */
  async findGrouped(): Promise<GroupedSkills[]> {
    const skills = await this.findAll();

    const map = new Map<SkillCategoryId, SkillRecord[]>();
    for (const skill of skills) {
      const existing = map.get(skill.category) ?? [];
      existing.push(skill);
      map.set(skill.category, existing);
    }

    return Array.from(map.entries()).map(([category, skills]) => ({
      category,
      skills,
    }));
  }
}

export const skillRepository = new SkillRepository();
