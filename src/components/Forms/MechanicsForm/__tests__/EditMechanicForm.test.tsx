import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditMechanicForm from "../EditMechanicsForm";
import * as reactRedux from "react-redux";
import * as router from "react-router-dom";
import { mockMechanics, mockTypes } from "@mocks/gdd/gddStoreMock";
import { editMechanic, initialMechanics } from "@store/slices/mechanicsSlice";

describe("EditMechanicForm Component", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
  let useParams = jest.spyOn(router, "useParams");

  beforeEach(() => {
    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockImplementation((selector) =>
      selector({
        mechanicsTypeSlice: {
          types: mockTypes,
        },
        mechanicsSlice: {
          mechanics: mockMechanics,
        },
      })
    );
  });
  it("should render component if id param is correct", () => {
    useParams.mockReturnValue({ mechanicId: "123" });
    render(<EditMechanicForm></EditMechanicForm>);
    const nameValue = screen.getByTestId("test-title") as HTMLInputElement;
    expect(nameValue.value).toBe("Grab");
  });
  it("should not render form if id param is incorrect", () => {
    useParams.mockReturnValue({ mechanicId: "1" });
    render(<EditMechanicForm></EditMechanicForm>);
    expect(screen.getByText("Not found")).toBeInTheDocument();
  });
  it("should change form data", async () => {
    useParams.mockReturnValue({ mechanicId: "123" });
    render(<EditMechanicForm></EditMechanicForm>);
    const nameValue = screen.getByTestId("test-title") as HTMLInputElement;

    await userEvent.clear(nameValue);
    await userEvent.type(nameValue, "Throw{enter}");

    const selectValue = screen.getByTestId(
      "test-type-select"
    ) as HTMLSelectElement;

    await userEvent.selectOptions(selectValue, "2");

    expect(selectValue.value).toBe("2");
    expect(nameValue.value).toBe("Throw");
  });
  it("should save changes in game mechanics on form submit", async () => {
    useParams.mockReturnValue({ mechanicId: "123" });
    render(<EditMechanicForm></EditMechanicForm>);
    const nameValue = screen.getByTestId("test-title") as HTMLInputElement;

    await userEvent.clear(nameValue);
    await userEvent.type(nameValue, "Throw{enter}");

    const selectValue = screen.getByTestId(
      "test-type-select"
    ) as HTMLSelectElement;

    await userEvent.selectOptions(selectValue, "2");

    const submitBtn = screen.getByTestId(
      "test-submit-form"
    ) as HTMLButtonElement;

    await submitBtn.click();

    await waitFor(() => {
      expect(useDispatchMock).toHaveBeenCalled();
    });
  });
});
