import { useDispatch } from "react-redux";
import { loginAPI } from "@services/auth";
import { useNavigate } from "react-router-dom";
import { login } from "@store/slices/authSlice";
import { setLoading } from "@store/slices/loaderSlice";

export const useLogin = (email: string, password: string, setMessage: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await loginAPI(email, password);

      if (res.success) {
        dispatch(
          login({
            username: res.user.username,
            token: res.token,
            email: res.user.email,
          })
        );
        navigate("/");
      } else {
        setMessage(res.message);
      }
      // dispatch(login({ username: res.user.username, token: res.token }));
    } catch (error) {
      setMessage(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return handleLogin;
};
