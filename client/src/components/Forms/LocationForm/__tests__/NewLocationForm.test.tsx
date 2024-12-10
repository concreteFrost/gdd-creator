import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewLocationForm from "../NewLocationForm";
import * as reactRedux from "react-redux";
import { mockGdd } from "@mocks/gdd/gddStoreMock";
import * as React from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const mockSetState = jest.fn();

describe("New Location Form component", () => {
  const useSelector = jest.spyOn(reactRedux, "useSelector");
  const useDispatch = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    (React.useState as jest.Mock).mockImplementation((initialState) => [
      initialState,
      mockSetState,
    ]);

    useSelector.mockImplementation(() => mockGdd);
    useDispatch.mockImplementation(() => jest.fn());

    render(<NewLocationForm />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render component", () => {
    expect(screen.getByLabelText("Environment*")).toBeInTheDocument();
    screen.debug;
  });
  it("should change form data", async () => {
    const nameInput = screen.getByTestId("test-title") as HTMLInputElement;

    await userEvent.type(nameInput, "New Location 2");

    // expect(nameInput.value).toBe("New Location 2");
    expect(mockSetState).toHaveBeenCalledTimes("New Location 2".length);
  });
});
