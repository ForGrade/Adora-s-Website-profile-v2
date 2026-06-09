"use client";

import { useState } from "react";
import { Card } from "@/components/common/Card";
import { SectionHeader } from "@/components/common/SectionHeader";
import { usePortfolioData } from "@/features/portfolio/hooks/usePortfolioData";
import type { SkillCategoryId } from "@/types";

export function SkillsSection() {
  const { skillCategories } = usePortfolioData();
  const [activeCategoryId, setActiveCategoryId] = useState<SkillCategoryId>(skillCategories[0].id);
  const activeCategory =
    skillCategories.find((category) => category.id === activeCategoryId) ?? skillCategories[0];

  return (
    <section id="skills" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Skills"
          description="Technologies grouped by the way they support real software delivery."
        />
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Skill categories">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={category.id === activeCategoryId}
              onClick={() => setActiveCategoryId(category.id)}
              className="rounded-md border border-border px-4 py-2 text-sm font-semibold transition hover:border-accent data-[active=true]:border-accent data-[active=true]:bg-accent data-[active=true]:text-background"
              data-active={category.id === activeCategoryId}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activeCategory.skills.map((skill) => (
            <Card key={skill.id} className="animate-slide-up">
              <p className="text-lg font-bold text-foreground">{skill.name}</p>
              <p className="mt-2 text-sm text-muted">{activeCategory.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
