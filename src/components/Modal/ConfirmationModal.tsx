import * as modal_styles from "./Modal.module.scss";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { closeModal } from "@store/slices/modalSlice";
import Modal from "react-modal";

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  onConfirm: any;
  text: string;
}

function ConfirmationModal({ isOpen, setOpen, onConfirm, text }: Props) {
  function handleClose() {
    setOpen(false);
  }

  async function handleConfirm() {
    onConfirm();
    handleClose();
  }

  return (
    <Modal
      isOpen={isOpen}
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
        overlay: { zIndex: 10000 },
      }}
    >
      <div className={modal_styles.submit_form}>
        <h2>{text}</h2>
        <div className={modal_styles.form_footer}>
          <button type="button" onClick={handleConfirm}>
            Confirm
          </button>
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
