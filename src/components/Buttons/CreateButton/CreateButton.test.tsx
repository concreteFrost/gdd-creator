import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateButton from "./CreateButton";

const mockedFunction = jest.fn();

describe("CreateButton Component", () => {
  test("renders the button with the provided title", () => {
    render(<CreateButton title="Create" action={mockedFunction} />);

    // Проверяем, что кнопка отображается с правильным текстом
    const button = screen.getByRole("button", { name: /create/i });
    expect(button).toBeInTheDocument();
  });

  test("calls the action prop when clicked", () => {
    render(<CreateButton title="Create" action={mockedFunction} />);

    const button = screen.getByRole("button", { name: /create/i });
    fireEvent.click(button);

    // Проверяем, что функция mockAction была вызвана один раз при клике
    expect(mockedFunction).toHaveBeenCalledTimes(1);
  });
});
