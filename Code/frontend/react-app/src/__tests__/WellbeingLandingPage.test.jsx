import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WellbeingLandingPage from "../pages/WellbeingLandingPage";

describe("WellbeingLandingPage", () => {
  it("renders the landing page heading", () => {
    render(<WellbeingLandingPage />);
    expect(screen.getByText(/Welcome, Alex/)).toBeInTheDocument();
  });

  it("renders the primary cards section", () => {
    render(<WellbeingLandingPage />);
    expect(screen.getByText("Read Community Stories")).toBeInTheDocument();
    expect(screen.getByText("Chat with Someone")).toBeInTheDocument();
  });

  it("renders the Emergency Resources banner", () => {
    render(<WellbeingLandingPage />);
    expect(screen.getByText("Emergency Resources")).toBeInTheDocument();
    expect(screen.getByText("Get Help Now")).toBeInTheDocument();
  });

  it("renders the Mindfulness Pulse section", () => {
    render(<WellbeingLandingPage />);
    expect(screen.getByText("Mindfulness Pulse")).toBeInTheDocument();
  });

  it("renders the event/support card", () => {
    render(<WellbeingLandingPage />);
    expect(screen.getByText(/Feeling stressed about exams/)).toBeInTheDocument();
  });

  it("renders correct card titles", () => {
    render(<WellbeingLandingPage />);
    expect(screen.getByText("Read Community Stories")).toBeInTheDocument();
    expect(screen.getByText("Chat with Someone")).toBeInTheDocument();
    expect(screen.getByText("Mindfulness Pulse")).toBeInTheDocument();
  });

  it("renders support online indicator", () => {
    render(<WellbeingLandingPage />);
    expect(screen.getByText(/3 Supporters Online/)).toBeInTheDocument();
  });

  it("renders tags on event card", () => {
    render(<WellbeingLandingPage />);
    expect(screen.getByText("#ExamPrep")).toBeInTheDocument();
    expect(screen.getByText("#MentalHealth")).toBeInTheDocument();
    expect(screen.getByText("#Support")).toBeInTheDocument();
  });
});
