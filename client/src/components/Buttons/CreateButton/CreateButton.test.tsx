import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateButton from "./CreateButton";

describe("CreateButton Component", () => {
  test("renders the button with the provided title", () => {
    render(<CreateButton title="Create" action={() => {}} />);

    // Проверяем, что кнопка отображается с правильным текстом
    const button = screen.getByRole("button", { name: /create/i });
    expect(button).toBeInTheDocument();
  });

  test("calls the action prop when clicked", () => {
    const mockAction = jest.fn();
    render(<CreateButton title="Create" action={mockAction} />);

    const button = screen.getByRole("button", { name: /create/i });
    fireEvent.click(button);

    // Проверяем, что функция mockAction была вызвана один раз при клике
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
