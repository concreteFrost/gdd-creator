import { AxiosResponse } from "axios";
import axiosClient from "./axiosSetup";
import {
  CreacteCharacterResponse,
  GetAllCharactersResponse,
  DeleteCharacterResponse,
} from "./types/apiTypes";

export const getAllCharactersAPI = async (
  gddId: string
): Promise<GetAllCharactersResponse> => {
  try {
    const response: AxiosResponse<GetAllCharactersResponse> =
      await axiosClient.get("/character/get-all/" + gddId);

    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const createCharacterAPI = async (
  character: FormData
): Promise<CreacteCharacterResponse> => {
  try {
    const response: AxiosResponse<CreacteCharacterResponse> =
      await axiosClient.post("/character/create", character, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const updateCharacterAPI = async (
  character: FormData
): Promise<CreacteCharacterResponse> => {
  try {
    const response: AxiosResponse<CreacteCharacterResponse> =
      await axiosClient.put("/character/update", character, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const deleteCharacterAPI = async (
  id: string,
  gddId: string
): Promise<DeleteCharacterResponse> => {
  const payload = {
    id: id,
    gdd_id: gddId,
  };

  try {
    const response: AxiosResponse<DeleteCharacterResponse> =
      await axiosClient.delete("/character/delete", { data: payload });
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};
