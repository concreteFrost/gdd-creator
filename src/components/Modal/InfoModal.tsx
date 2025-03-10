import withModalWindow from "@components/_hoc/withModalWindow";
import * as button_styles from "@components/Buttons/Button.module.scss";
import * as modal_styles from "./Modal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { closeModal } from "@store/slices/modalSlice";
import { useKeyEnter } from "@hooks/useKeyEnter";

function InfoModal() {
  const { text } = useSelector((state: RootState) => state.modalSlice);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeModal());
  }

  useKeyEnter(() => handleClose());

  return (
    <div className={modal_styles.submit_form}>
      <h2>{text}</h2>
      <div className={modal_styles.form_footer}>
        <button
          data-testid="close_modal"
          type="button"
          className={button_styles.create_btn}
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default InfoModal;
