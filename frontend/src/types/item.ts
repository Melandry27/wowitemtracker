export type ItemType =
  (typeof import("../config/constants").ITEM_TYPES)[number];
export type ItemStatus =
  (typeof import("../config/constants").ITEM_STATUS)[keyof typeof import("../config/constants").ITEM_STATUS];

export interface Item {
  _id: string;
  name: string;
  type: ItemType;
  purchasePrice: number;
  purchaseDate: string;
  salePrice?: number | null;
  saleDate?: string | null;
  status: ItemStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemDto {
  name: string;
  type: ItemType;
  purchasePrice: number;
  purchaseDate: string;
  salePrice?: number | null;
  saleDate?: string | null;
}

export interface UpdateItemDto {
  name?: string;
  type?: ItemType;
  purchasePrice?: number;
  purchaseDate?: string;
  salePrice?: number | null;
  saleDate?: string | null;
}

export interface ItemsStats {
  totalItems: number;
  ownedItems: number;
  soldItems: number;
  totalInvestment: number;
  totalRevenue: number;
  totalProfit: number;
  averageProfit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
