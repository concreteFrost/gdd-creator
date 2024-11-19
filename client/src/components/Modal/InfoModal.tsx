import withModalWindow from "@components/_hoc/withModalWindow";
import * as button_styles from "@styles/modules/button.module.scss";
import * as modal_styles from "@styles/modules/form.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { closeModal } from "@store/slices/modalSlice";

function InfoModal() {
  const { text } = useSelector((state: RootState) => state.modalSlice);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeModal());
  }

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
