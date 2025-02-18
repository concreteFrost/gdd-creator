import { GamePlatform, GameView } from "@_types/gddTypes";
import { GDD } from "@_types/gddTypes";
import { AxiosResponse } from "axios";
import axiosClient from "./axiosSetup";
import { GDDResponse, GDDGetAllResponse } from "./types/apiTypes";

export const createGDDAPI = async (
  title: string,
  genre: string,
  view: GameView,
  platform: GamePlatform
): Promise<GDDResponse> => {
  try {
    const response: AxiosResponse<GDDResponse> = await axiosClient.post(
      "/gdd/create",
      {
        title,
        genre,
        view,
        platform,
      }
    );
    return response.data; // Возвращаем данные ответа, включая токен
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const deleteGDDAPI = async (id: string): Promise<string | any> => {
  try {
    const response: AxiosResponse<string> = await axiosClient.delete(
      "/gdd/delete/" + id
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const updateGDDAPI = async (gdd: GDD): Promise<GDDResponse> => {
  try {
    const response: AxiosResponse<GDDResponse> = await axiosClient.put(
      "/gdd/update",
      {
        id: gdd.id,
        title: gdd.title,
        genre: gdd.genre,
        view: gdd.view,
        platform: gdd.platform,
      }
    );
    return response.data; // Возвращаем данные ответа, включая токен
  } catch (error: any) {
    throw error.response;
  }
};

export const getGDDAPI = async (gddId: string): Promise<GDDResponse> => {
  try {
    const response: AxiosResponse<GDDResponse> = await axiosClient.get(
      "/gdd/get/" + gddId
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const getAllGDDAPI = async (): Promise<GDDGetAllResponse> => {
  try {
    const response: AxiosResponse<GDDGetAllResponse> = await axiosClient.get(
      "/gdd/get-all"
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};
