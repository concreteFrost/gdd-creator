import { AxiosResponse } from "axios";
import axiosClient from "./axiosSetup";
import {
  GetAllTypesResponse,
  CreateTypeResponse,
  DeleteTypeResponse,
} from "./types/apiTypes";

export const getAllTypesAPI = async (
  gddId: string
): Promise<GetAllTypesResponse> => {
  try {
    const response: AxiosResponse = await axiosClient.get(
      "/type/get-all/" + gddId
    );

    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const createMechnanicsTypeAPI = async (
  type: string,
  gdd_id: string
): Promise<CreateTypeResponse> => {
  try {
    const response: AxiosResponse<CreateTypeResponse> = await axiosClient.post(
      "/type/create",
      {
        type: type,
        gdd_id: gdd_id,
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const updateMechnanicsTypeAPI = async (
  id: string,
  type: string,
  gdd_id: string
): Promise<CreateTypeResponse> => {
  try {
    const response: AxiosResponse<CreateTypeResponse> = await axiosClient.put(
      "/type/update/",
      {
        id: id,
        type: type,
        gdd_id: gdd_id,
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const deleteMechnanicsTypeAPI = async (
  id: string
): Promise<DeleteTypeResponse> => {
  try {
    const response: AxiosResponse<DeleteTypeResponse> =
      await axiosClient.delete("/type/delete/" + id);
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};
