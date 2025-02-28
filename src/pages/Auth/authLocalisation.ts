interface AuthElements {
  username: string;
  email: string;
  pass: string;
  confirmPass: string;
  loginFormTitle: string;
  regFormTitle: string;

  regMessages: {
    passwordMismatch: string;
    emptyFields: string;
    weakPassword: string;
  };

  loginMessages: {
    emptyEmail: string;
  };
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

    loginMessages: {
      emptyEmail: "email cant be blank",
    },

    regMessages: {
      passwordMismatch: "passwords do not match!",
      emptyFields: "all fields are required",
      weakPassword: "your password is too weak",
    },
  },
  ru: {
    username: "Имя",
    email: "Email",
    pass: "Пароль",
    confirmPass: "Подтвердить пароль",
    loginFormTitle: "ЛОГИН",
    regFormTitle: "РЕГИСТРАЦИЯ",

    loginMessages: {
      emptyEmail: "email поле не заполнено",
    },

    regMessages: {
      passwordMismatch: "пароли не совпадают",
      emptyFields: "не все поля заполнены",
      weakPassword: "пароль слишком слабый",
    },
  },
};
