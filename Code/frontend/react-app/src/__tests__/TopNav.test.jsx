import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TopNav from "../layout/TopNav";

describe("TopNav Component", () => {
  it("renders the top navigation bar", () => {
    render(<TopNav />);
    expect(screen.getByText("UQ Student Well-being")).toBeInTheDocument();
  });

  it("renders Quick Exit button with correct link", () => {
    render(<TopNav />);
    const quickExitBtn = screen.getByText("Quick Exit");
    expect(quickExitBtn).toBeInTheDocument();
    expect(quickExitBtn.closest("a")).toHaveAttribute("href", "https://www.google.com");
  });

  it("renders notification button", () => {
    render(<TopNav />);
    const notifBtn = screen.getByLabelText("Notifications");
    expect(notifBtn).toBeInTheDocument();
  });

  it("renders profile button", () => {
    render(<TopNav />);
    const profileBtn = screen.getByLabelText("Open profile");
    expect(profileBtn).toBeInTheDocument();
  });

  it("has high contrast styling on Quick Exit (via classes)", () => {
    const { container } = render(<TopNav />);
    const quickExitBtn = screen.getByText("Quick Exit");
    expect(quickExitBtn).toHaveClass("bg-brand", "text-white", "font-bold");
  });
});
