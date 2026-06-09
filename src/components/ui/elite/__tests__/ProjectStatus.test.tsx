import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectStatus } from "../ProjectStatus";

describe("ProjectStatus", () => {
  it.each([
    ["Operational", "Operational"],
    ["Development", "Development"],
    ["Archived", "Archived"],
  ] as const)("renders %s status label", (status, label) => {
    render(<ProjectStatus status={status} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
