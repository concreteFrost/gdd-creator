import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewLocationForm from "../NewLocationForm";
import * as reactRedux from "react-redux";
import { mockGdd } from "@mocks/gdd/gddStoreMock";

describe("New Location Form component", () => {
  const useSelector = jest.spyOn(reactRedux, "useSelector");
  const useDispatch = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelector.mockImplementation(() => mockGdd);
    useDispatch.mockImplementation(() => jest.fn());

    render(<NewLocationForm />);
    jest.clearAllMocks();
  });

  it("should render component", () => {
    expect(screen.getByLabelText("Environment*")).toBeInTheDocument();
    screen.debug;
  });
  it("should change form data", async () => {
    const nameInput = screen.getByTestId("test-title") as HTMLInputElement;

    await userEvent.type(nameInput, "New Location 2");
    expect(nameInput.value).toBe("New Location 2");
  });
  it("should prevent dispatching if location name is empty", async () => {
    const submitBtn = screen.getByTestId("test-submit-form");
    await userEvent.click(submitBtn);
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(useDispatch).not.toHaveBeenCalled();
  });
  it("should submit form", async () => {
    const nameInput = screen.getByTestId("test-title") as HTMLInputElement;

    await userEvent.type(nameInput, "New Location 2");
    const submitBtn = screen.getByTestId("test-submit-form");

    await userEvent.click(submitBtn);

    expect(useDispatch).toHaveBeenCalled();
  });
});
