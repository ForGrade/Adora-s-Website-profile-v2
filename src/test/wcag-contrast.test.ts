// Feature: elite-portfolio-redesign, Property 9: WCAG AA contrast
import * as fc from "fast-check";
import { describe, it } from "vitest";
import { getContrastRatio } from "./wcag-utils";

const tokenPairs: [string, string][] = [
  ["#EAFBFF", "#081018"],
  ["#00E5FF", "#081018"],
  ["#00A3FF", "#081018"],
  ["#7E98A3", "#081018"],
  ["#7E98A3", "#0C1620"],
  ["#EAFBFF", "#0C1620"],
];

describe("Elite theme contrast", () => {
  it("Property 9: all token pairs meet WCAG AA 4.5:1", () => {
    fc.assert(
      fc.property(fc.constantFrom(...tokenPairs), ([fg, bg]) => getContrastRatio(fg, bg) >= 4.5),
      { numRuns: tokenPairs.length },
    );
  });
});
