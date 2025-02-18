import { AxiosResponse } from "axios";
import axiosClient from "./axiosSetup";
import { GetAllMechanicsResponse, MechanicsResponse } from "./types/apiTypes";

export const getAllMechanicsAPI = async (
  gddId: string
): Promise<GetAllMechanicsResponse> => {
  try {
    const response: AxiosResponse<GetAllMechanicsResponse> =
      await axiosClient.get("/mechanic/get-all/" + gddId);

    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const createMechanicAPI = async (req: {
  name: string;
  gdd_id: string;
  type_id: string | null;
  description: string;
  examples: string[];
}): Promise<MechanicsResponse> => {
  try {
    const payload = {
      ...req,
      type_id: req.type_id === "null" ? null : req.type_id,
    };
    const response: AxiosResponse<MechanicsResponse> = await axiosClient.post(
      "/mechanic/create",
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const updateMechanicAPI = async (req: {
  id: string;
  name: string;
  gdd_id: string;
  type_id: string | null;
  description: string;
  examples: string[];
}): Promise<MechanicsResponse> => {
  const payload = {
    ...req,
    type_id: req.type_id === "null" ? null : req.type_id,
  };
  try {
    const response: AxiosResponse<MechanicsResponse> = await axiosClient.put(
      "/mechanic/update",
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const deleteMechanicAPI = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axiosClient.delete(
      "/mechanic/delete/" + id
    );
    return response;
  } catch (error: any) {
    throw error.response.data.message;
  }
};
