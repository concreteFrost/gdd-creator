import React, { ComponentType } from "react";
import Modal from "react-modal";
import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { ActiveModal } from "@store/slices/modalSlice";

export default function withModalWindow<T extends object>(
  WrappedComponent: ComponentType<T>
) {
  return (props: T) => {
    const { activeModal } = useSelector((state: RootState) => state.modalSlice);
    return (
      <Modal
        isOpen={activeModal !== ActiveModal.None}
        ariaHideApp={false}
        style={{
          content: {
            border: "none",
            background: "none",
            position: "absolute",
            overflow: "hidden",
            top: "50%",
            left: "50%",
            height: "100vh",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <WrappedComponent {...props} />
      </Modal>
    );
  };
}
