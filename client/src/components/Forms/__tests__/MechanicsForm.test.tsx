import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MechanicsForm from "../MechanicsForm/MechanicsForm";
import { NewMechnicForm } from "@_types/gddTypes";
import * as reactRedux from "react-redux";
import { initialTypes } from "@store/slices/mechanicsTypeSlice";

const mockData: NewMechnicForm = {
  name: "",
  description: "",
  typeId: "undefined",
  interactions: [],
  examples: [],
  gddId: "",
};

const mockSetForm = jest.fn((callback) => {
  const upd = callback(mockData);
  Object.assign(mockData, upd);
});
const mockFormSubmit = jest.fn();

describe("Mechanics Form Component", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) => initialTypes);
    useDispatchMock.mockReturnValue(jest.fn());

    render(
      <MechanicsForm
        formData={mockData}
        setFormData={mockSetForm}
        handleFormSubmit={mockFormSubmit}
      ></MechanicsForm>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render component", () => {
    expect(screen.getByText("Name*")).toBeInTheDocument();
  });

  it("should change input values", async () => {
    const title = screen.getByTestId("test-title") as HTMLInputElement;
    const newTitle = "new title";

    await userEvent.type(title, newTitle);

    expect(mockSetForm).toHaveBeenCalled();
    expect(mockSetForm).toHaveBeenCalledTimes(newTitle.length);
  });

  it("shows type modal when clicking edit types button", async () => {
    const editTypesButton = screen.getByTestId("test-edit-types-btn");

    await userEvent.click(editTypesButton);

    const modal = screen.getByTestId("types-modal-input-test");
    expect(modal).toBeInTheDocument();
  });
  it("should add tag on the screen", async () => {
    const exampleInput = screen.getByTestId("test-example-input");

    await userEvent.type(exampleInput, "new example{Enter}");

    expect(mockSetForm).toHaveBeenCalled();
  });

  it("should assign type when clicking enter button", async () => {
    const editTypesButton = screen.getByTestId("test-edit-types-btn");

    await userEvent.click(editTypesButton);

    const typeInput = screen.getByTestId("types-modal-input-test");

    await userEvent.type(typeInput, "new type{Enter}");

    expect(mockSetForm).toHaveBeenCalledTimes(1);
  });
});
