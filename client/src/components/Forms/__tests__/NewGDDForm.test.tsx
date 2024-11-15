import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewGDDForm from "../NewGDDForm";
import { GamePlatform, GameView, GDD } from "@_types/gddTypes";

const showModal = jest.fn();

describe("NewGDDForm component", () => {
  beforeEach(() => {
    render(
      <NewGDDForm setModalisOpen={showModal} modalIsOpen={true}></NewGDDForm>
    );
  });
  it("should render component", () => {
    const title = screen.getByText("Game Design Document (GDD)");

    expect(title).toBeInTheDocument();
  });
  it("should close modal window", async () => {
    const closebtn = screen.getByTestId("close_modal");

    await fireEvent.click(closebtn);

    expect(showModal).toHaveBeenCalledTimes(1);
    expect(showModal).toHaveBeenCalledWith(false);
  });
  it("should change title", async () => {
    const title = screen.getByLabelText("Title") as HTMLInputElement;

    await userEvent.type(title, "New Game");

    expect(title.value).toBe("New Game");
  });
  it("should select correct value", async () => {
    const gameView = screen.getByLabelText("Game View") as HTMLSelectElement;

    await userEvent.selectOptions(gameView, GameView.ThreeD);

    expect(gameView.value).toBe(GameView.ThreeD);
  });
});
