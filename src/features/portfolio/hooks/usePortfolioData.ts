"use client";

import { useMemo } from "react";
import { portfolioService } from "@/features/portfolio/services/portfolio.service";

export function usePortfolioData() {
  return useMemo(
    () => ({
      projects: portfolioService.getProjects(),
      skillCategories: portfolioService.getSkillCategories(),
      timelineItems: portfolioService.getTimelineItems(),
    }),
    [],
  );
}
