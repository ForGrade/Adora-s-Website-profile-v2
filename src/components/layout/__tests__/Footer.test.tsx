import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "../Footer";

describe("Footer", () => {
  it("renders ADORA.SYSTEMS brand and current year", () => {
    const year = new Date().getFullYear();
    render(<Footer />);
    expect(screen.getByText("ADORA.SYSTEMS")).toBeInTheDocument();
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
    expect(screen.getByText(/Built with Next\.js and TypeScript/)).toBeInTheDocument();
  });
});
