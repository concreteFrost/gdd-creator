import { AxiosResponse } from "axios";
import axiosClient from "./axiosSetup"; // Импортируем настроенный axiosClient
import { AuthResponse } from "./types/apiTypes";

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
