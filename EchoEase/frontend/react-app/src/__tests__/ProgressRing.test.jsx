import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ProgressRing from "../components/ProgressRing";

describe("ProgressRing Component", () => {
  it("renders the progress ring", () => {
    const { container } = render(<ProgressRing value={70} label="Goal" />);
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("displays the correct percentage value", () => {
    const { container } = render(<ProgressRing value={70} label="Goal" />);
    expect(container.textContent).toContain("70%");
  });

  it("displays the correct label", () => {
    const { container } = render(<ProgressRing value={70} label="Goal" />);
    expect(container.textContent).toContain("Goal");
  });

  it("renders with default value", () => {
    const { container } = render(<ProgressRing label="Test" />);
    expect(container.textContent).toContain("70%");
  });

  it("handles value clamping at 0", () => {
    const { container } = render(<ProgressRing value={-50} label="Test" />);
    expect(container.textContent).toContain("0%");
  });

  it("handles value clamping at 100", () => {
    const { container } = render(<ProgressRing value={150} label="Test" />);
    expect(container.textContent).toContain("100%");
  });
});
