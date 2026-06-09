/**
 * Career insights backend service.
 */

import { careerInsightsRepository } from "@/backend/repositories/career-insights.repository";
import type {
  CareerInsightRecord,
  InsightCategory,
} from "@/backend/repositories/career-insights.repository";
import type { ServiceResult } from "@/backend/types/common.types";

export class CareerInsightsService {
  async getPublished(): Promise<ServiceResult<CareerInsightRecord[]>> {
    try {
      const insights = await careerInsightsRepository.findPublished();
      return { ok: true, data: insights };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch insights";
      console.error("[CareerInsightsService]", message);
      return { ok: false, error: "Unable to load career insights at this time." };
    }
  }

  async getById(id: string): Promise<ServiceResult<CareerInsightRecord | null>> {
    try {
      const insight = await careerInsightsRepository.findById(id);
      return { ok: true, data: insight };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch insight";
      console.error("[CareerInsightsService]", message);
      return { ok: false, error: "Unable to load this insight at this time." };
    }
  }

  async getByCategory(
    category: InsightCategory,
  ): Promise<ServiceResult<CareerInsightRecord[]>> {
    try {
      const insights = await careerInsightsRepository.findByCategory(category);
      return { ok: true, data: insights };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch insights by category";
      console.error("[CareerInsightsService]", message);
      return { ok: false, error: "Unable to load insights at this time." };
    }
  }
}

export const careerInsightsService = new CareerInsightsService();
