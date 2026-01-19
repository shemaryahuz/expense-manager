import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { TestProvider } from "../../../test/TestProvider";
import Loader from "../Loader";

describe("Loader", () => {
  it("should render Loader", () => {
    render(
      <TestProvider>
        <Loader />
      </TestProvider>,
    );
    const loader = document.querySelector(".MuiCircularProgress-root");
    const laoderText = screen.getByText("Loading...");
    expect(loader).toBeInTheDocument();
    expect(laoderText).toBeInTheDocument();
  });

  it("should be visible on the page", () => {
    render(
      <TestProvider>
        <Loader />
      </TestProvider>,
    );

    const loader = document.querySelector(".MuiCircularProgress-root");
    const laoderText = screen.getByText("Loading...");
    expect(loader).toBeVisible();
    expect(laoderText).toBeVisible();
  });
});
