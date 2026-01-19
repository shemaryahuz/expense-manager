import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { TestProvider } from "../../../test/TestProvider";
import AlertMessage from "../AlertMessage";

describe("AlertMessage", () => {
  it("should render AlertMessage", () => {
    render(
      <TestProvider>
        <AlertMessage severity="error" message="Error message" />
      </TestProvider>,
    );

    const alertText = screen.getByText("Error message");
    expect(alertText).toBeInTheDocument();
  });

  it("should render success message", () => {
    render(
      <TestProvider>
        <AlertMessage severity="error" message="Success message" />
      </TestProvider>,
    );

    const alertText = screen.getByText("Success message");
    expect(alertText).toBeInTheDocument();
  });

  it("should be visible on the page", () => {
    render(
      <TestProvider>
        <AlertMessage severity="error" message="Error message" />
      </TestProvider>,
    );

    const alertText = screen.getByText("Error message");
    expect(alertText).toBeVisible();
  });
});
