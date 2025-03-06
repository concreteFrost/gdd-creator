import { useActionState, useState } from "react";
import CreateButton from "@components/Buttons/CreateButton/CreateButton";
import * as s from "./Profile.module.scss";
import useClearOnTime from "@hooks/useClearOnTime";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@store/slices/authSlice";
import { RootState } from "@store/store";
import { Ref } from "react";
import isStrongPassword from "@utils/passwordVerification";
import { deleteAccountAPI, updatePasswordAPI } from "@services/auth";
import { ActiveModal, showModal } from "@store/slices/modalSlice";
import { closeGDD } from "@store/slices/gddSlice";
import withConfirmationModal from "@components/_hoc/withConfirmationModal";
import { setLoading } from "@store/slices/loaderSlice";

interface ProfileFormProps {
  modalRef: Ref<HTMLDivElement>;
  showConfirmationModal?: (text: string, callback: () => void) => void;
  setProfileVisible: (isVisible: boolean) => void;
}

function ProfileForm({
  modalRef,
  showConfirmationModal,
  setProfileVisible,
}: ProfileFormProps) {
  const { username, email } = useSelector(
    (state: RootState) => state.authSlice
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, action] = useActionState(handlePasswordChange, null);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  useClearOnTime({ setText: setSubmitMessage, text: submitMessage });

  async function handlePasswordChange(
    prevState: any,
    data: FormData
  ): Promise<any> {
    const old = data.get("old_pass");
    const fist = data.get("first_pass");
    const second = data.get("second_pass");

    if (!fist || !old || !second) {
      setSubmitMessage("all fields are required");
      return;
    }

    if (fist !== second) {
      setSubmitMessage("passwords do not match");
      return;
    }

    if (!isStrongPassword(fist?.toString())) {
      setSubmitMessage("this password is too weak");
      return;
    }

    try {
      const res = await updatePasswordAPI(old.toString(), fist.toString());

      if (res.success) {
        dispatch(
          showModal({ activeModal: ActiveModal.Info, text: "Success!!!" })
        );
        setFormVisible(false);
        return;
      }

      setSubmitMessage(res.message);
    } catch (error: any) {
      dispatch(
        showModal({
          activeModal: ActiveModal.Info,
          text: "Something went wrong",
        })
      );
    }
  }

  async function handleAccountDeletion() {
    dispatch(setLoading(true));
    try {
      const res = await deleteAccountAPI();

      if (res.success) {
        handleLogout();
      } else {
        dispatch(
          showModal({
            activeModal: ActiveModal.Info,
            text: "Something went wrong",
          })
        );
      }
    } catch (error) {
      dispatch(
        showModal({
          activeModal: ActiveModal.Info,
          text: "Something went wrong",
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  function handleLogout() {
    dispatch(logout());
    dispatch(closeGDD());
    navigate("/login");
  }

  async function handleDeleteAccountClick() {
    if (!showConfirmationModal) return;

    showConfirmationModal(
      "You are about to delete your account!\n Are you sure ?",
      () => handleAccountDeletion()
    );
  }

  return (
    <div ref={modalRef} className={s.profile_content_wrapper}>
      <span>
        <button
          className={s.close_btn}
          onClick={() => setProfileVisible(false)}
        >
          x
        </button>
      </span>
      <div className={s.form_group}>
        <label htmlFor="">Name:</label>
        <input type="text" readOnly value={username} />
      </div>

      <div className={s.form_group}>
        <label htmlFor="">Email:</label>
        <input type="text" readOnly value={email} />
      </div>

      <div className={s.form_group}>
        <button
          className={s.reset_password_btn}
          onClick={() => setFormVisible(!isFormVisible)}
        >
          password reset
        </button>
      </div>

      {isFormVisible ? (
        <form action={action} className={s.reset_password_form}>
          <div className={s.form_group}>
            <label htmlFor="">Old Password:</label>
            <input type="password" id="old_pass" name="old_pass" />
          </div>
          <div className={s.form_group}>
            <label htmlFor="">New Password:</label>
            <input type="password" id="first_pass" name="first_pass" />
          </div>

          <div className={s.form_group}>
            <label htmlFor="">Confirm Password:</label>
            <input type="password" id="second_pass" name="second_pass" />
          </div>

          {/**ERROR MSG */}
          {submitMessage.length > 0 ? (
            <div className={`${s.form_group} ${s.error}`}>{submitMessage}</div>
          ) : null}
          <button>Submit</button>
        </form>
      ) : null}

      <div className={s.footer}>
        <CreateButton title="LOGOUT" action={handleLogout}></CreateButton>
        <button
          role="button"
          className={s.delete_account_btn}
          onClick={handleDeleteAccountClick}
        >
          delete account
        </button>
      </div>
    </div>
  );
}

export default withConfirmationModal(ProfileForm);
