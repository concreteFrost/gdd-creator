import React, { useEffect } from "react";

interface Props {
  func: any;
  inputRef: any;
}

export default function useKeyEnter({ func, inputRef }: Props) {
  useEffect(() => {
    // Подписываемся на событие keydown
    window.addEventListener("keydown", handleKeyDown);
    // Отписываемся при размонтировании
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (document.activeElement === inputRef.current) {
        const newValue = inputRef.current?.value.trim();
        if (newValue) {
          func(newValue);
          inputRef.current.value = ""; // Очищаем input после добавления
        }
      }
    }
  };

  return null;
}
