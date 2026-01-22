import React, { createContext, useContext, type ReactNode } from "react";
import { useItemFilters, type ItemFilters } from "@/hooks/useItemFilters";
import type { ItemType } from "@/types/item";

interface ItemFiltersContextValue {
  filters: ItemFilters;
  setType: (type: ItemType | "all") => void;
  setStatus: (status: "owned" | "sold" | "all") => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
  updateFilters: (newFilters: Partial<ItemFilters>) => void;
  setFilters: (filters: ItemFilters) => void;
}

const ItemFiltersContext = createContext<ItemFiltersContextValue | undefined>(
  undefined,
);

export const ItemFiltersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const filterMethods = useItemFilters();

  return (
    <ItemFiltersContext.Provider value={filterMethods}>
      {children}
    </ItemFiltersContext.Provider>
  );
};

export const useItemFiltersContext = () => {
  const context = useContext(ItemFiltersContext);
  if (!context) {
    throw new Error(
      "useItemFiltersContext must be used within ItemFiltersProvider",
    );
  }
  return context;
};
