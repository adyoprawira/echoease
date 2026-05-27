import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CoursesPage from "../pages/CoursesPage";

describe("CoursesPage", () => {
  it("renders the courses heading", () => {
    render(<CoursesPage />);
    expect(screen.getByText("Courses")).toBeInTheDocument();
  });

  it("renders course cards", () => {
    render(<CoursesPage />);
    expect(screen.getByText("Introduction to Electrical Systems")).toBeInTheDocument();
    expect(screen.getByText("Algorithms & Data Structures")).toBeInTheDocument();
    expect(screen.getByText("Introduction to Philosophy")).toBeInTheDocument();
  });

  it("renders course codes", () => {
    render(<CoursesPage />);
    // Course codes appear in the deadline section
    expect(screen.getByText(/ENGG1300: Lab Report 2/)).toBeInTheDocument();
    expect(screen.getByText(/COMP3506: Programming Assignment 1/)).toBeInTheDocument();
  });

  it("renders View Course buttons", () => {
    render(<CoursesPage />);
    const viewButtons = screen.getAllByText(/View Course/);
    expect(viewButtons).toHaveLength(3);
  });

  it("renders search bar", () => {
    render(<CoursesPage />);
    const searchInput = screen.getByPlaceholderText("Search your courses");
    expect(searchInput).toBeInTheDocument();
  });

  it("renders Upcoming Deadlines section", () => {
    render(<CoursesPage />);
    expect(screen.getByText("Upcoming Deadlines")).toBeInTheDocument();
  });

  it("renders deadline items", () => {
    render(<CoursesPage />);
    expect(screen.getByText(/ENGG1300: Lab Report 2/)).toBeInTheDocument();
    expect(screen.getByText(/COMP3506: Programming Assignment 1/)).toBeInTheDocument();
  });

  it("renders deadline times", () => {
    render(<CoursesPage />);
    expect(screen.getByText("Due Tomorrow, 11:59 PM")).toBeInTheDocument();
    expect(screen.getByText("Due Friday, 5:00 PM")).toBeInTheDocument();
  });

  it("renders Current Terms label", () => {
    render(<CoursesPage />);
    expect(screen.getByText("Current Terms")).toBeInTheDocument();
  });
});
