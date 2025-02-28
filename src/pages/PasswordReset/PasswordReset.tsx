import {
  resetPasswordAPI,
  validateResetPasswordTokenAPI,
} from "@services/auth";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showModal } from "@store/slices/modalSlice";
import { ActiveModal } from "@store/slices/modalSlice";
import * as s from "./PasswordReset.module.scss";
import { useActionState } from "react";
import { useState } from "react";
import isStrongPassword from "@utils/passwordVerification";
import useClearOnTime from "@hooks/useClearOnTime";
import { setLoading } from "@store/slices/loaderSlice";

function PasswordReset() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [data, action] = useActionState(handlePasswordChange, null);
  const [canAccess, setCanAccess] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const dispatch = useDispatch();

  function showRedirect(msg: string) {
    dispatch(
      showModal({
        text: msg,
        activeModal: ActiveModal.Redirect,
      })
    );
  }

  async function handlePasswordChange(
    prevState: any,
    data: FormData
  ): Promise<any> {
    const fist = data.get("first_pass");
    const second = data.get("second_pass");

    if (!fist || !second) {
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

    dispatch(setLoading(true));
    try {
      const res = await resetPasswordAPI(fist.toString(), token!);

      if (res.success) {
        showRedirect("Password has been reseted!");
      }
    } catch (error: any) {
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

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        showRedirect("Invalid token");
        return;
      }

      try {
        const res = await validateResetPasswordTokenAPI(token);
        setCanAccess(true);
      } catch (error) {
        showRedirect("Invalid token");
      }
    };

    validate();
  }, [token]);

  useClearOnTime({ setText: setSubmitMessage, text: submitMessage });

  if (!canAccess) {
    return <div>Checking token...</div>;
  }

  return (
    <form action={action} className={s.reset_password_form}>
      <h2>Reset Password</h2>

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
  );
}

export default PasswordReset;
