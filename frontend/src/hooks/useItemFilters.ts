import { useState, useCallback } from "react";
import type { ItemType } from "../types/item";

export interface ItemFilters {
  type?: ItemType | "all";
  status?: "owned" | "sold" | "all";
  search?: string;
}

export const useItemFilters = (initialFilters: ItemFilters = {}) => {
  const [filters, setFilters] = useState<ItemFilters>(initialFilters);

  const setType = useCallback((type: ItemType | "all") => {
    setFilters((prev) => ({ ...prev, type }));
  }, []);

  const setStatus = useCallback((status: "owned" | "sold" | "all") => {
    setFilters((prev) => ({ ...prev, status }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  const updateFilters = useCallback((newFilters: Partial<ItemFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  return {
    filters,
    setType,
    setStatus,
    setSearch,
    resetFilters,
    updateFilters,
    setFilters,
  };
};
