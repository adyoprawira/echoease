import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { QUICK_EXIT_URL } from "../data/mvpContent";

function renderApp(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

describe("App navigation", () => {
  it("renders the landing layout with an accessible skip link and quick exit", () => {
    renderApp();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getByRole("link", { name: /skip to main content/i })).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("link", { name: /quick exit/i })).toHaveAttribute("href", QUICK_EXIT_URL);
  });

  it("navigates the landing emergency action to implemented resources", () => {
    renderApp();
    fireEvent.click(screen.getByRole("link", { name: /get help now/i }));
    expect(screen.getByRole("heading", { name: /support resources/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /urgent help/i })).toBeInTheDocument();
  });

  it("exposes implemented primary community and chat routes", () => {
    renderApp();
    fireEvent.click(screen.getByRole("link", { name: /read community stories/i }));
    expect(screen.getByRole("heading", { name: /community stories/i })).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("link", { name: "Chat" })[0]);
    expect(screen.getByRole("heading", { name: /choose a support preview/i })).toBeInTheDocument();
  });
});
