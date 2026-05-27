import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

function renderSidebar(path = "/") {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Sidebar />
    </MemoryRouter>
  );
}

describe("Sidebar", () => {
  it("provides accessible desktop and mobile primary route names", () => {
    renderSidebar();
    expect(screen.getAllByRole("link", { name: "Community" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Chat" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Resources" }).length).toBeGreaterThan(0);
  });

  it("marks Settings unavailable and routes Help to resources", () => {
    renderSidebar();
    expect(screen.getByText(/settings \(unavailable\)/i).closest("[aria-disabled='true']")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /help resources/i })).toHaveAttribute("href", "/resources");
  });
});
