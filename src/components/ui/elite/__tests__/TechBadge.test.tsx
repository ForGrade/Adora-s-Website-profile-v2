// Feature: elite-portfolio-redesign, Property 2: TechBadge proficiency colour mapping
import * as fc from "fast-check";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { TechBadge } from "../TechBadge";

function expectedColor(proficiency: number | undefined): string {
  if (proficiency === undefined) return "var(--color-primary)";
  if (proficiency < 50) return "var(--color-muted)";
  if (proficiency < 80) return "var(--color-secondary)";
  return "var(--color-primary)";
}

describe("TechBadge", () => {
  it("Property 2: maps every proficiency value to exactly one dot colour", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 100 }), (proficiency) => {
        const { container, unmount } = render(
          <TechBadge name="Test" proficiency={proficiency} />,
        );
        const dot = container.querySelector("[data-testid='proficiency-dot']") as HTMLElement | null;
        const passes = dot?.style.backgroundColor === expectedColor(proficiency);
        unmount();
        return passes;
      }),
      { numRuns: 100 },
    );
  });

  it("omitted proficiency resolves to primary colour", () => {
    const { container } = render(<TechBadge name="Test" />);
    const dot = container.querySelector("[data-testid='proficiency-dot']") as HTMLElement;
    expect(dot.style.backgroundColor).toBe("var(--color-primary)");
  });
});
