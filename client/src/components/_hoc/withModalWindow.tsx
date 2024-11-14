import React, { Component, ComponentType } from "react";
import Modal from "react-modal";

interface NewGDDModalProps {
  modalIsOpen: boolean;
  setModalisOpen: (isOpen: boolean) => void; // Добавляем setModalisOpen в тип пропсов
}

export default function withModalWindow<T extends object>(
  Component: ComponentType<T & NewGDDModalProps>
) {
  return (props: T & NewGDDModalProps) => {
    return (
      <Modal
        isOpen={props.modalIsOpen}
        ariaHideApp={false}
        style={{
          content: { border: "none", background: "none" },
        }}
      >
        <Component {...props} />
      </Modal>
    );
  };
}
