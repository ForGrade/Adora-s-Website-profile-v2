/**
 * Career insights repository.
 *
 * Handles reads for the career-insights feature module.
 * Only published insights are exposed through the public API.
 */

import { getServerClient } from "@/backend/database/supabase";
import type { CareerInsightRow } from "@/backend/database/types";
import type { Database } from "@/backend/database/types";

export type InsightCategory = Database["public"]["Enums"]["insight_category"];

export interface CareerInsightRecord {
  id: string;
  title: string;
  content: string;
  category: InsightCategory;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

function mapRow(row: CareerInsightRow): CareerInsightRecord {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    category: row.category,
    tags: row.tags,
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class CareerInsightsRepository {
  private get db() {
    return getServerClient();
  }

  /** Returns only published insights — used by the public API. */
  async findPublished(): Promise<CareerInsightRecord[]> {
    const { data, error } = await this.db
      .from("career_insights")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`CareerInsightsRepository.findPublished failed: ${error.message}`);
    }

    return (data ?? []).map(mapRow);
  }

  async findById(id: string): Promise<CareerInsightRecord | null> {
    const { data, error } = await this.db
      .from("career_insights")
      .select("*")
      .eq("id", id)
      .eq("published", true)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`CareerInsightsRepository.findById failed: ${error.message}`);
    }

    return data ? mapRow(data) : null;
  }

  async findByCategory(category: InsightCategory): Promise<CareerInsightRecord[]> {
    const { data, error } = await this.db
      .from("career_insights")
      .select("*")
      .eq("published", true)
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`CareerInsightsRepository.findByCategory failed: ${error.message}`);
    }

    return (data ?? []).map(mapRow);
  }
}

export const careerInsightsRepository = new CareerInsightsRepository();
