import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProfessionalSelectionPage from "../pages/ProfessionalSelectionPage";
import ChatPage from "../pages/ChatPage";
import QueuePage from "../pages/QueuePage";

function renderFlow() {
  render(
    <MemoryRouter initialEntries={["/chat"]}>
      <Routes>
        <Route path="/chat" element={<ProfessionalSelectionPage />} />
        <Route path="/chat-session/:guideId" element={<ChatPage />} />
        <Route path="/queue/:guideId" element={<QueuePage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProfessionalSelectionPage", () => {
  it("presents fictional scripted options and truthful privacy limits", () => {
    renderFlow();
    expect(screen.getByRole("heading", { name: /choose a support preview/i })).toBeInTheDocument();
    expect(screen.getByText("Support Guide A")).toBeInTheDocument();
    expect(screen.getAllByText(/scripted prototype guide/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/no encryption, anonymity guarantee/i)).toBeInTheDocument();
  });

  it("carries the selected guide into chat", () => {
    renderFlow();
    fireEvent.click(screen.getByRole("button", { name: /start simulated chat/i }));
    expect(screen.getByRole("heading", { name: "Support Guide A" })).toBeInTheDocument();
    expect(screen.getByText(/scripted prototype simulation/i)).toBeInTheDocument();
  });

  it("routes a queue choice to an honest demo queue", () => {
    renderFlow();
    fireEvent.click(screen.getByRole("button", { name: /open demo queue/i }));
    expect(screen.getByRole("heading", { name: /demo queue preview/i })).toBeInTheDocument();
    expect(screen.getByText(/does not track a real queue position/i)).toBeInTheDocument();
  });

  it("confirms a booking preview without claiming a booking was submitted", () => {
    renderFlow();
    fireEvent.click(screen.getByRole("button", { name: /try booking preview/i }));
    const dialog = screen.getByRole("dialog", { name: /booking interaction preview/i });
    expect(dialog).toBeInTheDocument();
    const closeButton = screen.getByRole("button", { name: /close booking interaction preview/i });
    const saveButton = screen.getByRole("button", { name: /save demo selection/i });
    expect(closeButton).toHaveFocus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(saveButton).toHaveFocus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(closeButton).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: /save demo selection/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/no appointment was submitted/i);
  });

  it("opens accessible verified urgent contacts", () => {
    renderFlow();
    fireEvent.click(screen.getByRole("button", { name: /open urgent contacts/i }));
    expect(screen.getByRole("dialog", { name: /urgent contacts/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /call triple zero on 000/i })).toHaveAttribute("href", "tel:000");
  });
});
