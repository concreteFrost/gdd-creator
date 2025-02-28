import { AxiosResponse } from "axios";
import axiosClient from "./axiosSetup"; // Импортируем настроенный axiosClient
import { AuthResponse, BaseResponse } from "./types/apiTypes";

// Функция для логина
export const loginAPI = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosClient.post(
      "/auth/login",
      { email, password }
    );
    return response.data; // Возвращаем данные ответа, включая токен
  } catch (error: any) {
    throw error.response.data.message;
  }
};

// Функция для регистрации
export const registerAPI = async (
  username: string,
  email: string,
  password_hash: string
): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosClient.post(
      "/auth/register",
      { username, password_hash, email }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

// Функция для получения данных пользователя (например, для авторизованных запросов)
export const getUserData = async (): Promise<{ id: string; email: string }> => {
  try {
    const response = await axiosClient.get("/user/data");
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const updatePasswordAPI = async (
  old_password: string,
  new_password: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const toSubmit = {
      old_password,
      new_password,
    };
    const response: AxiosResponse<{ success: boolean; message: string }> =
      await axiosClient.put("/auth/update-password", toSubmit);

    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const forgotPasswordAPI = async (
  email: string
): Promise<BaseResponse> => {
  console.log(email);
  try {
    const resonse: AxiosResponse<BaseResponse> = await axiosClient.post(
      "/auth/forgot-password",
      { email: email }
    );

    return resonse.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const validateResetPasswordTokenAPI = async (
  token: string
): Promise<BaseResponse> => {
  try {
    const resonse: AxiosResponse<BaseResponse> = await axiosClient.post(
      "/auth/validate-token",
      { token: token }
    );

    return resonse.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const resetPasswordAPI = async (
  password: string,
  token: string
): Promise<BaseResponse> => {
  try {
    const toSubmit = {
      token: token,
      password: password,
    };
    const response: AxiosResponse<BaseResponse> = await axiosClient.post(
      "/auth/reset-password",
      toSubmit
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};
