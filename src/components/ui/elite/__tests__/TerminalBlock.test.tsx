import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TerminalBlock } from "../TerminalBlock";

describe("TerminalBlock", () => {
  it("renders three coloured dot characters in the top bar", () => {
    const { container } = render(<TerminalBlock prompt="test@host">content</TerminalBlock>);
    const bar = container.firstElementChild?.firstElementChild;
    const dotCount = (bar?.textContent?.match(/●/g) ?? []).length;
    expect(dotCount).toBe(3);
    expect(container.textContent).toContain("test@host");
    expect(container.textContent).toContain("content");
  });
});
