import React, { useEffect } from "react";

interface Props {
  func: any;
  inputRef: any;
}

export function useKeyEnterWithInput({ func, inputRef }: Props) {
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

export function useKeyEnter(func: any) {
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
      func();
    }
  };

  return null;
}
