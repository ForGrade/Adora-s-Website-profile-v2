import { Card } from "@/components/common/Card";
import { SectionHeader } from "@/components/common/SectionHeader";
import { HIRE_REASONS } from "@/constants";

export function WhyHireMeSection() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="Why Should You Hire Me?" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HIRE_REASONS.map((reason) => (
            <Card key={reason.title}>
              <h3 className="text-lg font-bold text-foreground">{reason.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{reason.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
