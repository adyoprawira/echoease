import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TopNav from "../layout/TopNav";
import { QUICK_EXIT_URL } from "../data/mvpContent";

describe("TopNav", () => {
  it("uses the consistent quick exit destination", () => {
    render(<TopNav />);
    expect(screen.getByRole("link", { name: /quick exit/i })).toHaveAttribute("href", QUICK_EXIT_URL);
  });

  it("labels unavailable controls honestly", () => {
    render(<TopNav />);
    expect(screen.getByRole("button", { name: /notifications unavailable/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /profile unavailable/i })).toBeDisabled();
  });
});
