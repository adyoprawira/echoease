import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProfessionalSelectionPage from "../pages/ProfessionalSelectionPage";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ProfessionalSelectionPage", () => {
  it("renders the page title and subtitle", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    expect(screen.getByRole("heading", { name: /professional selection/i })).toBeInTheDocument();
    expect(
      screen.getByText(/this page represents another website/i)
    ).toBeInTheDocument();
  });

  it("displays all three professionals", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    expect(screen.getByText("Dr. Sarah Jenkins")).toBeInTheDocument();
    expect(screen.getByText("Marcus Thompson")).toBeInTheDocument();
    expect(screen.getByText("Dr. Elena Rodriguez")).toBeInTheDocument();
  });

  it("displays professional roles correctly", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    expect(screen.getByText("Clinical Psychologist")).toBeInTheDocument();
    expect(screen.getByText("Mental Health Counselor")).toBeInTheDocument();
    expect(screen.getByText("Trauma Specialist")).toBeInTheDocument();
  });

  it("displays correct availability statuses", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    expect(screen.getByText("AVAILABLE NOW")).toBeInTheDocument();
    expect(screen.getByText("IN A SESSION")).toBeInTheDocument();
    expect(screen.getByText("AWAY")).toBeInTheDocument();
  });

  it("displays action buttons with correct labels", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    expect(screen.getByRole("button", { name: /start chat/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /join queue/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /schedule for later/i })).toBeInTheDocument();
  });

  it("displays privacy reassurance section", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    expect(screen.getByText("Privacy Reassurance")).toBeInTheDocument();
    expect(
      screen.getByText(/your identity remains anonymous to other students/i)
    ).toBeInTheDocument();
  });

  it("displays crisis support section", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    expect(screen.getByText("Need Immediate Help?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /call crisis support/i })).toBeInTheDocument();
  });

  it("displays emergency exit link", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    const emergencyExit = screen.getByRole("link", { name: /emergency exit/i });
    expect(emergencyExit).toBeInTheDocument();
    expect(emergencyExit).toHaveAttribute("href", "https://www.google.com");
  });

  it("displays the redirect button to the real site", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    const redirectButton = screen.getByRole("link", { name: /go to uq student well-being/i });
    expect(redirectButton).toBeInTheDocument();
    expect(redirectButton).toHaveAttribute("href", "/");
  });

  it("opens schedule modal when clicking schedule button", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    const scheduleButton = screen.getByRole("button", { name: /schedule for later/i });
    fireEvent.click(scheduleButton);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/select an available slot/i)).toBeInTheDocument();
  });

  it("displays time slots in schedule modal", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    const scheduleButton = screen.getByRole("button", { name: /schedule for later/i });
    fireEvent.click(scheduleButton);
    expect(screen.getByLabelText("Today, 4:30 PM")).toBeInTheDocument();
    expect(screen.getByLabelText("Tomorrow, 10:00 AM")).toBeInTheDocument();
    expect(screen.getByLabelText("Friday, 11:30 AM")).toBeInTheDocument();
  });

  it("closes schedule modal when clicking cancel", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    const scheduleButton = screen.getByRole("button", { name: /schedule for later/i });
    fireEvent.click(scheduleButton);
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(screen.queryByText(/select an available slot/i)).not.toBeInTheDocument();
  });

  it("opens crisis support modal when clicking crisis support button", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    const crisisButton = screen.getByRole("button", { name: /call crisis support/i });
    fireEvent.click(crisisButton);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy lifeline/i })).toBeInTheDocument();
  });

  it("displays emergency numbers in crisis modal", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    const crisisButton = screen.getByRole("button", { name: /call crisis support/i });
    fireEvent.click(crisisButton);
    expect(screen.getByText(/000/)).toBeInTheDocument();
    expect(screen.getByText(/13 11 14/)).toBeInTheDocument();
    expect(screen.getByText(/07 3365 1704/)).toBeInTheDocument();
  });

  it("displays professional descriptions", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    expect(
      screen.getByText(/academic pressure and anxiety management/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/holistic well-being and interpersonal/i)).toBeInTheDocument();
  });

  it("displays professional tags", () => {
    renderWithRouter(<ProfessionalSelectionPage />);
    expect(screen.getByText("#Anxiety")).toBeInTheDocument();
    expect(screen.getByText("#StudyBurnout")).toBeInTheDocument();
    expect(screen.getByText("#RelationshipsIssues")).toBeInTheDocument();
    expect(screen.getByText("#PTSD")).toBeInTheDocument();
  });
});

