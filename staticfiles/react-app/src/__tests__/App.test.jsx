import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("App Component", () => {
  it("renders the app without crashing", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText("UQ Student Well-being")).toBeInTheDocument();
  });

  it("renders the MainLayout wrapper", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("renders the sidebar with navigation items", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Chat")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("renders the Quick Exit button in the top nav", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const quickExitBtn = screen.getByText("Quick Exit");
    expect(quickExitBtn).toBeInTheDocument();
    expect(quickExitBtn.closest("a")).toHaveAttribute("href", "https://www.google.com");
  });
});
