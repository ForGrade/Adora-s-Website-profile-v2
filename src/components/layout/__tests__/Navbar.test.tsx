import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Navbar } from "../Navbar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@/components/ui/ThemeToggle", () => ({
  ThemeToggle: () => <button type="button">Theme</button>,
}));

describe("Navbar", () => {
  it("renders ADORA.SYSTEMS brand text", () => {
    render(<Navbar />);
    expect(screen.getByText("ADORA.SYSTEMS")).toBeInTheDocument();
  });

  it("sets aria-current=page on the active link", () => {
    render(<Navbar />);
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("aria-current", "page");
  });
});
