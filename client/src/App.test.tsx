import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import App from "./App";

describe("App component", () => {
  it("should have correct title", () => {
    render(<App></App>);
  });
});
