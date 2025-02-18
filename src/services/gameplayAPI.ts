import { GamePlay } from "@_types/gddTypes";
import { AxiosResponse } from "axios";
import axiosClient from "./axiosSetup";
import { GameplayResponse } from "./types/apiTypes";

// Функция для логина
export const getGameplayAPI = async (
  gddId: string
): Promise<GameplayResponse> => {
  try {
    const response: AxiosResponse<GameplayResponse> = await axiosClient.get(
      "/gameplay/get/" + gddId
    );
    return response.data; // Возвращаем данные ответа, включая токен
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const updateGameplayAPI = async (
  gameplay: Omit<GamePlay, "id">,
  gdd_id: string
): Promise<GameplayResponse> => {
  try {
    const response: AxiosResponse<GameplayResponse> = await axiosClient.put(
      "/gameplay/update",
      { ...gameplay, gdd_id }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};
