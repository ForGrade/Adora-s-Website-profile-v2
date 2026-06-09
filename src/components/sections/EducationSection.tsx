"use client";

import { Card } from "@/components/common/Card";
import { SectionHeader } from "@/components/common/SectionHeader";
import { usePortfolioData } from "@/features/portfolio/hooks/usePortfolioData";

export function EducationSection() {
  const { timelineItems } = usePortfolioData();

  return (
    <section className="bg-surface px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title="Education, Achievements & Certificates" />
        <div className="relative space-y-5 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-border sm:before:left-1/2">
          {timelineItems.map((item, index) => (
            <div
              key={item.id}
              className="relative grid gap-4 pl-12 sm:grid-cols-2 sm:pl-0"
            >
              <div
                className={`hidden sm:block ${index % 2 === 0 ? "sm:pr-10" : "sm:col-start-2 sm:pl-10"}`}
              >
                <Card>
                  <TimelineContent item={item} />
                </Card>
              </div>
              <div className="absolute left-2 top-6 size-5 rounded-full border-4 border-surface bg-accent sm:left-1/2 sm:-ml-2.5" />
              <div className="sm:hidden">
                <Card>
                  <TimelineContent item={item} />
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface TimelineContentProps {
  readonly item: {
    readonly category: string;
    readonly title: string;
    readonly subtitle?: string;
    readonly description?: string;
  };
}

function TimelineContent({ item }: TimelineContentProps) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {item.category}
      </p>
      <h3 className="mt-2 text-lg font-bold text-foreground">{item.title}</h3>
      {item.subtitle ? <p className="mt-2 text-sm font-semibold text-muted">{item.subtitle}</p> : null}
      {item.description ? <p className="mt-1 text-sm text-muted">{item.description}</p> : null}
    </>
  );
}
