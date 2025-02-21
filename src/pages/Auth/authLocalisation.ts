interface AuthElements {
  username: string;
  email: string;
  pass: string;
  confirmPass: string;
  loginFormTitle: string;
  regFormTitle: string;
}

interface AuthTranslator {
  en: AuthElements;
  ru: AuthElements;
}

export const authTranslator: AuthTranslator = {
  en: {
    username: "Username",
    email: "Email",
    pass: "Password",
    confirmPass: "Confirm Password",
    loginFormTitle: "LOGIN",
    regFormTitle: "REGISTER",
  },
  ru: {
    username: "Имя",
    email: "Email",
    pass: "Пароль",
    confirmPass: "Подтвердить пароль",
    loginFormTitle: "ЛОГИН",
    regFormTitle: "РЕГИСТРАЦИЯ",
  },
};
