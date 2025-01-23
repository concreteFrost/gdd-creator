import * as button_styles from "@components/Buttons/Button.module.scss";
import * as modal_styles from "./Modal.module.scss";
import { closeModal } from "@store/slices/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";

function RedirectModal() {
  const { text } = useSelector((state: RootState) => state.modalSlice);
  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch(closeModal());
    window.location.pathname = "/";
  }
  return (
    <div className={modal_styles.submit_form}>
      <h2>{text}</h2>
      <div className={modal_styles.form_footer}>
        <button
          data-testid="close_modal"
          type="button"
          className={button_styles.create_btn}
          onClick={handleCloseModal}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default RedirectModal;
