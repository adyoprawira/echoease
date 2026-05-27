import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CommunityPage from "../pages/CommunityPage";
import ResourcesPage from "../pages/ResourcesPage";
import QueuePage from "../pages/QueuePage";
import ChatPage from "../pages/ChatPage";

describe("Community and resources critical flows", () => {
  it("filters community content and saves a clearly local session post", () => {
    render(
      <MemoryRouter>
        <CommunityPage />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/search demo posts/i), { target: { value: "breathing" } });
    expect(screen.getByText(/a short breathing pause/i)).toBeInTheDocument();
    expect(screen.queryByText(/small study reset ideas/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /save demo post/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/both a title and post text/i);
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "My example" } });
    fireEvent.change(screen.getByLabelText("Post text"), { target: { value: "This is a local demo note." } });
    fireEvent.click(screen.getByRole("button", { name: /save demo post/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/not sent to a backend/i);
  });

  it("prevents contact details in a public demo post", () => {
    render(
      <MemoryRouter>
        <CommunityPage />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Contact request" } });
    fireEvent.change(screen.getByLabelText("Post text"), { target: { value: "Email me at user@example.com please." } });
    fireEvent.click(screen.getByRole("button", { name: /save demo post/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/remove email addresses/i);
  });

  it("lists verified emergency telephone actions in resources", () => {
    render(
      <MemoryRouter>
        <ResourcesPage />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /call triple zero on 000/i })).toHaveAttribute("href", "tel:000");
    expect(screen.getByRole("link", { name: /call lifeline on 13 11 14/i })).toHaveAttribute("href", "tel:131114");
    expect(screen.getByRole("link", { name: /call uq counselling and crisis line/i })).toBeInTheDocument();
  });
});

describe("Queue and simulated chat safety flows", () => {
  it("shows an honest queue and lets a user leave with confirmation", () => {
    render(
      <MemoryRouter initialEntries={["/queue/guide-b"]}>
        <Routes>
          <Route path="/queue/:guideId" element={<QueuePage />} />
          <Route path="/chat" element={<p>Support options returned</p>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Support Guide B/)).toBeInTheDocument();
    expect(screen.getByText(/does not track a real queue position/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continue to simulated chat/i })).toHaveAttribute("href", "/chat-session/guide-b");
    fireEvent.click(screen.getByRole("button", { name: /leave demo queue/i }));
    expect(screen.getByRole("dialog", { name: /leave demo queue/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /^leave$/i }));
    expect(screen.getByText(/support options returned/i)).toBeInTheDocument();
  });

  it("reveals emergency options immediately for crisis-related input", () => {
    render(
      <MemoryRouter initialEntries={["/chat-session/guide-a"]}>
        <Routes>
          <Route path="/chat-session/:guideId" element={<ChatPage />} />
        </Routes>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/enter text to preview/i), { target: { value: "I want to die" } });
    fireEvent.click(screen.getByRole("button", { name: /send text/i }));
    expect(screen.getByRole("heading", { name: /urgent contacts/i })).toBeInTheDocument();
    expect(screen.getByText(/no simulated chat reply is generated/i)).toBeInTheDocument();
    expect(screen.queryByText(/suggested from words selected/i)).not.toBeInTheDocument();
  });

  it("shows neutral suggestions for non-crisis prompts and confirms ending", () => {
    render(
      <MemoryRouter initialEntries={["/chat-session/guide-b"]}>
        <Routes>
          <Route path="/chat-session/:guideId" element={<ChatPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: "Support Guide B" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /study resources/i }));
    expect(screen.getByText(/suggested resource topic: study pressure/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /end chat preview/i }));
    expect(screen.getByRole("dialog", { name: /end chat preview/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /end preview/i }));
    expect(screen.getByText(/chat preview ended/i)).toBeInTheDocument();
    expect(screen.queryByText(/please show study pressure resources/i)).not.toBeInTheDocument();
  });

  it("gives a recoverable error for an unknown guide route", () => {
    render(
      <MemoryRouter initialEntries={["/chat-session/missing-guide"]}>
        <Routes>
          <Route path="/chat-session/:guideId" element={<ChatPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /chat preview unavailable/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to support options/i })).toHaveAttribute("href", "/chat");
  });
});
