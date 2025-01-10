import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditGddForm from "../EditGDDForm";
import * as reactRedux from "react-redux";
import { editGeneralInfo, initialState } from "@store/slices/gddSlice";
import { GamePlatform, GameView } from "@_types/gddTypes";
import { ActiveModal, showModal } from "@store/slices/modalSlice";

jest.mock("@hooks/useClearOnTime", () => jest.fn());

describe("GeneralInfoForm component", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) => initialState);
    useDispatchMock.mockReturnValue(jest.fn());

    render(<EditGddForm></EditGddForm>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render component", () => {
    expect(screen.getByLabelText("Title*")).toBeInTheDocument();
  });

  it("should get default values on component render", () => {
    expect(screen.getByLabelText("Title*")).toHaveValue("");
    expect(screen.getByLabelText("Genre")).toHaveValue("");
    expect(screen.getByLabelText("Game View")).toHaveValue(
      GameView.FirstPerson
    );
    expect(screen.getByLabelText("Platform")).toHaveValue(GamePlatform.PC);
  });

  it("should change title", async () => {
    const title = screen.getByLabelText("Title*") as HTMLInputElement;

    await userEvent.type(title, "New Game");

    expect(title.value).toBe("New Game");
  });

  it("should dispatch correct action on form submit", async () => {
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);

    const titleInput = screen.getByLabelText("Title*") as HTMLInputElement;
    await userEvent.type(titleInput, "New Game Title");

    const genreInput = screen.getByLabelText("Genre") as HTMLInputElement;
    await userEvent.type(genreInput, "Test Genre");

    const viewSelect = screen.getByLabelText("Game View") as HTMLSelectElement;
    await userEvent.selectOptions(viewSelect, "Top Down");

    const platformSelect = screen.getByLabelText(
      "Platform"
    ) as HTMLSelectElement;
    await userEvent.selectOptions(platformSelect, "PC");

    // Нажать на кнопку "Save"
    const submitBtn = screen.getByText("Save");
    await fireEvent.click(submitBtn);

    // Ожидание, что были вызваны все нужные действия
    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(
        editGeneralInfo({
          ...initialState.gdd,
          genre: "Test Genre",
          platform: GamePlatform.PC,
          title: "New Game Title",
          view: GameView.TopDown,
        })
      );

      expect(dispatchMock).toHaveBeenCalledWith(
        showModal({
          text: "Success",
          activeModal: ActiveModal.Info,
        })
      );
    });
  });

  it("should prevent form submission if title is missing", async () => {
    const titleInput = screen.getByLabelText("Title*") as HTMLInputElement;

    await userEvent.clear(titleInput);

    const submitBtn = screen.getByText("Save");
    await userEvent.click(submitBtn);

    const error = screen.getByText("Title is required");

    expect(error).toBeInTheDocument();
  });
});
