import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@store/slices/authSlice";
import { loginAPI } from "@services/auth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginAPI(email, password);

      if (res.success) {
        console.log("success");
        dispatch(
          login({
            username: res.user.username,
            token: res.token,
            email: res.user.email,
          })
        );
        navigate("/");
      }
      // dispatch(login({ username: res.user.username, token: res.token }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ margin: "10px 0", padding: "8px", width: "100%" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ margin: "10px 0", padding: "8px", width: "100%" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Login
        </button>
        <button
          type="button"
          onClick={handleRegisterRedirect}
          style={{ padding: "10px 20px" }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
