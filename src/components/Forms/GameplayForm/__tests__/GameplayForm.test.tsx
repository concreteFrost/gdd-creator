import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GameplayForm from "../GameplayForm";
import { GamePlay } from "@_types/gddTypes";
import { mockGameplay } from "@mocks/gdd/gddStoreMock";
import userEvent from "@testing-library/user-event";
import { gamplayFormTranslator } from "../localisation/gameplayFormTranslator";

describe("Gameplay form component", () => {
  const handleSubmit = jest.fn();
  const formData: GamePlay = mockGameplay;
  const setFormData = jest.fn();
  const t = gamplayFormTranslator['en']

  beforeEach(() => {
    render(
      <GameplayForm
        t={t}
        handleFormSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      ></GameplayForm>
    );
    jest.clearAllMocks();
  });
  it("should render form", () => {
    expect(screen.getByText("Story")).toBeInTheDocument();
  });
  it("should change form values", async () => {
    const difficultyInput = screen.getByTestId(
      "test-difficulty"
    ) as HTMLInputElement;

    await userEvent.type(difficultyInput, "new difficulty");
    expect(setFormData).toHaveBeenCalledTimes("new difficulty".length);

    const playerExperience = screen.getByTestId(
      "test-player-experience"
    ) as HTMLInputElement;

    await userEvent.type(playerExperience, "experience");
    expect(setFormData).toHaveBeenCalled();
  });
  it("should submit form on button click", async () => {
    const submitBtn = screen.getByTestId(
      "test-submit-form"
    ) as HTMLInputElement;
    await userEvent.click(submitBtn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  it("should prevent adding empty objectives and progression", async () => {
    const objectivesInput = screen.getByTestId("test-objectives");
    await userEvent.type(objectivesInput, "{enter}");

    expect(setFormData).toHaveBeenCalledTimes(0);

    const progressionInput = screen.getByTestId("test-progression");
    await userEvent.type(progressionInput, "{enter}");

    expect(setFormData).toHaveBeenCalledTimes(0);
  });
});
