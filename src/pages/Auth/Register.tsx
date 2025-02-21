import useClearOnTime from "@hooks/useClearOnTime";
import { registerAPI } from "@services/auth";
import { login } from "@store/slices/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as style from "./Login.module.scss";
import { authTranslator } from "./authLocalisation";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import GDDHeader from "@components/Headers/GDDHeader";

const Register = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [errorMessage, setErrorMsaage] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useClearOnTime({ setText: setErrorMsaage, text: errorMessage });

  const lang = useCurrentLanguage();
  const t = authTranslator[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username && !password && !email) {
      console.log("all fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await registerAPI(username!, email!, password!);
      dispatch(
        login({
          username: res.user.username,
          token: res.token,
          email: res.user.email,
        })
      );
      navigate("/");
    } catch (error: any) {
      setErrorMsaage(`*${error}`);
    }
    // Здесь можно добавить логику отправки данных на сервер
  };

  return (
    <div>
      <GDDHeader></GDDHeader>
      <form onSubmit={handleSubmit} className={style.login_container}>
        <h2>{t.regFormTitle}</h2>
        <div className={style.form_group}>
          <label htmlFor="username">{t.username}:</label>
          <input
            type="text"
            id="username"
            value={username ? username : ""}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={style.form_group}>
          <label htmlFor="email">{t.email}:</label>
          <input
            type="email"
            id="email"
            value={email ? email : ""}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={style.form_group}>
          <label htmlFor="password">{t.pass}:</label>
          <input
            type="password"
            id="password"
            value={password ? password : ""}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={style.form_group}>
          <label htmlFor="confirmPassword">{t.confirmPass}:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className={style.button_group}>
          <button type="submit" className={style.login_btn}>
            {t.regFormTitle}
          </button>
          <button
            type="button"
            className={style.register_btn}
            onClick={() => {
              navigate("/login");
            }}
          >
            {t.loginFormTitle}
          </button>
        </div>

        {/**ERROR MSG */}
        {errorMessage.length > 0 ? (
          <div className={`${style.form_group} ${style.error}`}>
            {`${errorMessage}`}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Register;
