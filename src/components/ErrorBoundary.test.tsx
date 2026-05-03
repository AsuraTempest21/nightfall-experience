import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "@/components/ErrorBoundary";

// A component that always throws during render
const ThrowingChild = () => {
  throw new Error("Test error");
};

// A component that renders fine
const GoodChild = () => <div>All good</div>;

describe("ErrorBoundary", () => {
  // Suppress React error boundary console.error in tests
  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("should render children when there is no error", () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    );
    expect(screen.getByText("All good")).toBeDefined();
  });

  it("should render fallback UI when a child throws", () => {
    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>
    );
    expect(screen.getByText("Something went wrong")).toBeDefined();
    expect(screen.getByText("Try Again")).toBeDefined();
    expect(screen.getByText("Go Home")).toBeDefined();
  });

  it("should render custom fallback if provided", () => {
    render(
      <ErrorBoundary fallback={(error) => <div>Custom: {error.message}</div>}>
        <ThrowingChild />
      </ErrorBoundary>
    );
    expect(screen.getByText("Custom: Test error")).toBeDefined();
  });
});
