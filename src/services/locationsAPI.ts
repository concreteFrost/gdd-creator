import { AxiosResponse } from "axios";
import axiosClient from "./axiosSetup";
import {
  BaseResponse,
  CreateLocationResponse,
  GetAllLocationsResponse,
} from "./types/apiTypes";

export const getAllLocationsAPI = async (
  gddId: string
): Promise<GetAllLocationsResponse> => {
  try {
    const response: AxiosResponse<GetAllLocationsResponse> =
      await axiosClient.get("/location/get-all/" + gddId);

    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const createLocationAPI = async (
  location: FormData
): Promise<CreateLocationResponse> => {
  try {
    const response: AxiosResponse<CreateLocationResponse> =
      await axiosClient.post("/location/create", location, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const updateLocationAPI = async (
  location: FormData
): Promise<CreateLocationResponse> => {
  try {
    const response: AxiosResponse<CreateLocationResponse> =
      await axiosClient.put("/location/update", location, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const deleteLocationAPI = async (id: string): Promise<BaseResponse> => {
  try {
    const response: AxiosResponse<BaseResponse> = await axiosClient.delete(
      "/location/delete/" + id
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};
