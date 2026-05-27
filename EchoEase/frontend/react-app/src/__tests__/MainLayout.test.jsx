import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

describe("MainLayout Component", () => {
  it("renders the layout container", () => {
    render(
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    );
    const layout = screen.getByRole("main");
    expect(layout).toBeInTheDocument();
  });

  it("renders sidebar and top nav", () => {
    render(
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    );
    expect(screen.getByText("Well-being Hub")).toBeInTheDocument();
    expect(screen.getByText("UQ Student Well-being")).toBeInTheDocument();
  });

  it("applies correct CSS classes for flex layout", () => {
    const { container } = render(
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    );
    const mainDiv = container.querySelector("div.flex");
    expect(mainDiv).toHaveClass("flex", "min-h-screen");
  });
});
