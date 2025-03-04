import React, { ComponentType, useState, useRef } from "react";
import ConfirmationModal from "@components/Modal/ConfirmationModal";

export default function withConfirmationModal<T extends object>(
  WrappedComponent: ComponentType<T>
) {
  return function WithModalComponent(props: T) {
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);
    const [text, setConfirmationText] = useState("");
    const callbackRef = useRef<(() => void) | null>(null);

    function showConfirmationModal(confirmText: string, callback: () => void) {
      setConfirmationText(confirmText);
      callbackRef.current = callback;
      setConfirmationVisible(true);
    }

    function handleConfirm() {
      if (callbackRef.current) {
        callbackRef.current();
      }
      setConfirmationVisible(false);
    }

    return (
      <>
        <WrappedComponent
          {...props}
          showConfirmationModal={showConfirmationModal} // ✅ Передаём функцию в компонент
        />
        <ConfirmationModal
          isOpen={isConfirmationVisible}
          setOpen={setConfirmationVisible}
          onConfirm={handleConfirm}
          text={text}
        />
      </>
    );
  };
}
