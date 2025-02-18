import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  component: any;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (e) {
    return true; // Если токен некорректен, считать его истёкшим
  }
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component }) => {
  const token = useSelector((state: RootState) => state.authSlice.token);

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }

  return component;
};

export default ProtectedRoute;
