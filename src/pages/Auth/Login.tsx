import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@hooks/useLogin";
import * as style from "./Login.module.scss";
import useClearOnTime from "@hooks/useClearOnTime";
import GDDHeader from "@components/Headers/GDDHeader";
import { authTranslator } from "./authLocalisation";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitMessage, setSubmitMessage] = useState<string>("");

  const lang = useCurrentLanguage();
  const t = authTranslator[lang];

  const navigate = useNavigate();

  useClearOnTime({ setText: setSubmitMessage, text: submitMessage });

  const handleLogin = useLogin(email, password, setSubmitMessage);

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div>
      <GDDHeader></GDDHeader>
      <form onSubmit={handleLogin} className={style.login_container}>
        <h2>{t.loginFormTitle}</h2>
        <div className={style.form_group}>
          <label>{t.email}:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ margin: "10px 0", padding: "8px", width: "100%" }}
          />
        </div>
        <div className={style.form_group}>
          <label>{t.pass}:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ margin: "10px 0", padding: "8px", width: "100%" }}
          />
        </div>

        {/**ERROR MSG */}
        {submitMessage.length > 0 ? (
          <div className={`${style.form_group} ${style.error}`}>
            {`*${submitMessage}`}
          </div>
        ) : null}

        <div className={style.button_group}>
          <button type="submit" className={style.login_btn}>
            {t.loginFormTitle}
          </button>
          <button
            type="button"
            onClick={handleRegisterRedirect}
            className={style.register_btn}
          >
            {t.regFormTitle}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
