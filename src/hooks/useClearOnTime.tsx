import React, { useEffect } from "react";

interface Props {
  setText: (text: string) => void;
  text: string; // Передаем сам текст в зависимость
}

export default function useClearOnTime({ setText, text }: Props) {
  useEffect(() => {
    if (text) {
      // Запускаем таймер только если текст существует
      const timer = setTimeout(() => {
        setText(""); // очищаем текст
      }, 3000);

      // Очищаем таймер при размонтировании или изменении текста
      return () => {
        clearTimeout(timer);
      };
    }
  }, [text, setText]); // Зависимость теперь от текста и setText

  return null;
}
