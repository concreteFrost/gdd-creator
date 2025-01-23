import useClearOnTime from "@hooks/useClearOnTime";
import { registerAPI } from "@services/auth";
import { login } from "@store/slices/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [errorMessage, setErrorMsaage] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useClearOnTime({ setText: setErrorMsaage, text: errorMessage });

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
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username ? username : ""}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ margin: "10px 0", padding: "8px", width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email ? email : ""}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ margin: "10px 0", padding: "8px", width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password ? password : ""}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ margin: "10px 0", padding: "8px", width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ margin: "10px 0", padding: "8px", width: "100%" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Register
        </button>
      </form>

      <span style={{ marginTop: "20px", color: "red" }}>{errorMessage}</span>
    </div>
  );
};

export default Register;
