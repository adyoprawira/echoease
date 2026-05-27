import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

const renderSidebar = (initialPath = "/") => {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Sidebar />
    </MemoryRouter>
  );
};

describe("Sidebar Component", () => {
  it("renders the sidebar", () => {
    renderSidebar();
    expect(screen.getByText("Well-being Hub")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    renderSidebar();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Chat")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("renders Support & Well-being on the Courses page", () => {
    renderSidebar("/courses");
    const supportLink = screen.getByRole("link", { name: /Support & Well-being/i });
    expect(supportLink).toBeInTheDocument();
    expect(supportLink).toHaveAttribute("href", "/");
  });

  it("hides Support & Well-being on non-Courses pages", () => {
    renderSidebar("/");
    expect(screen.queryByRole("link", { name: /Support & Well-being/i })).not.toBeInTheDocument();
  });

  it("renders Settings and Help links at bottom", () => {
    renderSidebar();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
  });

  it("renders correct branding subtitle", () => {
    renderSidebar();
    expect(screen.getByText("Student Support")).toBeInTheDocument();
  });
});
