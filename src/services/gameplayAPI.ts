import { GamePlatform, GamePlay, GameView } from "@_types/gddTypes";
import { GDD } from "@_types/gddTypes";
import { AxiosResponse } from "axios";
import axiosClient from "./axiosSetup";

interface GameplayResponse {
  success: string;
  gameplay: GamePlay;
}

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
