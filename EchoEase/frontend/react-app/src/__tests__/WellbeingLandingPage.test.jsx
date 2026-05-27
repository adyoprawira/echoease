import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WellbeingLandingPage from "../pages/WellbeingLandingPage";

function renderPage() {
  render(
    <MemoryRouter>
      <WellbeingLandingPage />
    </MemoryRouter>
  );
}

describe("WellbeingLandingPage", () => {
  it("discloses the prototype and exposes urgent help near the top", () => {
    renderPage();
    expect(screen.getByText(/simulated support interactions/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /need urgent help/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /get help now/i })).toHaveAttribute("href", "/resources#emergency");
  });

  it("links primary cards to functioning routes", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /read community stories/i })).toHaveAttribute("href", "/community");
    expect(screen.getByRole("link", { name: /explore chat resources/i })).toHaveAttribute("href", "/chat");
    expect(screen.getByRole("link", { name: /browse resources/i })).toHaveAttribute("href", "/resources");
  });

  it("labels example metrics and avoids activity claims", () => {
    renderPage();
    expect(screen.getByText(/example progress display only/i)).toBeInTheDocument();
    expect(screen.queryByText(/supporters online/i)).not.toBeInTheDocument();
  });
});
