import { skillCategories } from "@/features/portfolio/data/skills";
import { projects } from "@/features/portfolio/data/projects";
import { timelineItems } from "@/features/portfolio/data/timeline";
import type { Project, SkillCategory, TimelineItem } from "@/types";

export class PortfolioService {
  getProjects(): readonly Project[] {
    return projects;
  }

  getSkillCategories(): readonly SkillCategory[] {
    return skillCategories;
  }

  getTimelineItems(): readonly TimelineItem[] {
    return timelineItems;
  }
}

export const portfolioService = new PortfolioService();
