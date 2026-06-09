// Feature: elite-portfolio-redesign, Property 12: IntelPanel title is rendered when provided
import * as fc from "fast-check";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { IntelPanel } from "../IntelPanel";

describe("IntelPanel", () => {
  it("Property 12: title row correlates with title prop; children always render", () => {
    fc.assert(
      fc.property(
        fc.option(fc.string({ minLength: 1, maxLength: 40 }), { nil: undefined }),
        fc.string({ minLength: 1, maxLength: 80 }),
        (title, body) => {
          const { container, unmount } = render(
            <IntelPanel title={title}>{body}</IntelPanel>,
          );
          const header = container.querySelector(".border-b");
          const hasHeader = title !== undefined;
          const passes =
            (hasHeader ? header !== null && screen.queryByText(title!) !== null : header === null) &&
            screen.queryByText(body) !== null;
          unmount();
          return passes;
        },
      ),
      { numRuns: 100 },
    );
  });
});
