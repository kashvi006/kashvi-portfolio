import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";

describe("SocialSync Application", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the SocialSync dashboard", () => {
    render(<App />);

    expect(screen.getByText("SocialSync")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Interactive Post Scheduler & Performance Lab"
      )
    ).toBeInTheDocument();
  });

  it("creates a scheduled post", () => {
    render(<App />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter post title"),
      {
        target: { value: "Test Post" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Write your caption..."),
      {
        target: { value: "Testing SocialSync" },
      }
    );

    const dateInput = document.querySelector(
      'input[type="date"]'
    );

    const timeInput = document.querySelector(
      'input[type="time"]'
    );

    fireEvent.change(dateInput, {
      target: { value: "2026-09-10" },
    });

    fireEvent.change(timeInput, {
      target: { value: "10:00" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Schedule Post",
      })
    );

    expect(
      screen.getByText("Instagram: Test Post")
    ).toBeInTheDocument();
  });

  it("toggles React.memo optimization", () => {
    render(<App />);

    const offButtons = screen.getAllByRole("button", {
      name: "OFF",
    });

    fireEvent.click(offButtons[0]);

    expect(
      screen.getByRole("button", {
        name: "ON",
      })
    ).toBeInTheDocument();

    expect(
      screen.getAllByText("Optimized Mode").length
    ).toBeGreaterThan(0);
  });

  it("updates the optimization toggle counter", () => {
    render(<App />);

    const offButtons = screen.getAllByRole("button", {
      name: "OFF",
    });

    fireEvent.click(offButtons[0]);

    expect(
      screen.getByText("Toggles: 1")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Total Toggles")
    ).toBeInTheDocument();
  });

  it("shows the performance monitor", () => {
    render(<App />);

    expect(
      screen.getByText("Performance Monitor")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Baseline Render")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Optimized Render")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Performance Improvement")
    ).toBeInTheDocument();
  });

  it("opens technical performance details", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Show Technical Details",
      })
    );

    expect(
      screen.getAllByText("React.memo").length
    ).toBeGreaterThan(0);

    expect(
      screen.getAllByText("useMemo").length
    ).toBeGreaterThan(0);

    expect(
      screen.getAllByText("useCallback").length
    ).toBeGreaterThan(0);

    expect(
      screen.getByText("React Profiler")
    ).toBeInTheDocument();
  });
});