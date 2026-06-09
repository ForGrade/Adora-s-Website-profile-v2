// Feature: elite-portfolio-redesign, Property 3: MetricPanel renders every item
import * as fc from "fast-check";
import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { MetricPanel } from "../MetricPanel";

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return {
    ...actual,
    useReducedMotion: () => true,
    useInView: () => true,
  };
});

const metricItemArb = fc.record({
  label: fc.string({ minLength: 1, maxLength: 40 }),
  value: fc.oneof(
    fc.integer({ min: 0, max: 9999 }),
    fc.string({ minLength: 1, maxLength: 20 }),
  ),
  unit: fc.option(fc.string({ minLength: 1, maxLength: 10 }), { nil: undefined }),
});

describe("MetricPanel", () => {
  it("Property 3: renders every label, value, and unit", () => {
    fc.assert(
      fc.property(fc.array(metricItemArb, { minLength: 1, maxLength: 8 }), (items) => {
        const { unmount } = render(<MetricPanel items={items} />);
        const passes = items.every((item) => {
          const labelEl = screen.queryByText(item.label);
          const valueEl = screen.queryByText(String(item.value));
          const unitEl = item.unit ? screen.queryByText(item.unit) : true;
          return !!labelEl && !!valueEl && !!unitEl;
        });
        unmount();
        return passes;
      }),
      { numRuns: 100 },
    );
  });
});
