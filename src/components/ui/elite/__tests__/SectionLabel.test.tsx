// Feature: elite-portfolio-redesign, Property 11: SectionLabel renders children with required typography classes
import * as fc from "fast-check";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionLabel } from "../SectionLabel";

describe("SectionLabel", () => {
  it("Property 11: applies typography classes and preserves children text", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1, maxLength: 60 }), (text) => {
        const { container, unmount } = render(<SectionLabel>{text}</SectionLabel>);
        const el = container.firstElementChild;
        const passes =
          el?.classList.contains("uppercase") &&
          el?.classList.contains("tracking-[0.2em]") &&
          el?.classList.contains("font-mono") &&
          screen.getByText(text) !== null;
        unmount();
        return passes;
      }),
      { numRuns: 100 },
    );
  });
});
