import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "../config/constants";
import type {
  Item,
  CreateItemDto,
  UpdateItemDto,
  ItemsStats,
  ApiResponse,
} from "../types/item";

const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor pour gérer les réponses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export const itemsApi = {
  getAll: async (params?: {
    type?: string;
    status?: string;
  }): Promise<Item[]> => {
    const { data } = await axiosInstance.get<ApiResponse<Item[]>>(
      API_ENDPOINTS.items.getAll(),
      { params },
    );
    return data.data || [];
  },

  getById: async (id: string): Promise<Item> => {
    const { data } = await axiosInstance.get<ApiResponse<Item>>(
      API_ENDPOINTS.items.getById(id),
    );
    if (!data.data) throw new Error("Item not found");
    return data.data;
  },

  create: async (itemData: CreateItemDto): Promise<Item> => {
    const { data } = await axiosInstance.post<ApiResponse<Item>>(
      API_ENDPOINTS.items.create(),
      itemData,
    );
    if (!data.data) throw new Error("Failed to create item");
    return data.data;
  },

  update: async (id: string, itemData: UpdateItemDto): Promise<Item> => {
    const { data } = await axiosInstance.put<ApiResponse<Item>>(
      API_ENDPOINTS.items.update(id),
      itemData,
    );
    if (!data.data) throw new Error("Failed to update item");
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(API_ENDPOINTS.items.delete(id));
  },

  getStats: async (): Promise<ItemsStats> => {
    const { data } = await axiosInstance.get<ApiResponse<ItemsStats>>(
      API_ENDPOINTS.items.stats(),
    );
    if (!data.data) throw new Error("Failed to fetch stats");
    return data.data;
  },
};
