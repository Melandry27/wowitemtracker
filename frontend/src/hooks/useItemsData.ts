import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { itemsApi } from "../services/api";
import type { CreateItemDto, UpdateItemDto } from "../types/item";

// Query keys
export const itemQueryKeys = {
  all: ["items"] as const,
  lists: () => [...itemQueryKeys.all, "list"] as const,
  list: (filters?: { type?: string; status?: string }) =>
    [...itemQueryKeys.lists(), { filters }] as const,
  details: () => [...itemQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...itemQueryKeys.details(), id] as const,
  stats: () => [...itemQueryKeys.all, "stats"] as const,
};

// Hook pour récupérer tous les items
export const useItems = (filters?: { type?: string; status?: string }) => {
  return useQuery({
    queryKey: itemQueryKeys.list(filters),
    queryFn: () => itemsApi.getAll(filters),
  });
};

// Hook pour récupérer un item par ID
export const useItem = (id: string) => {
  return useQuery({
    queryKey: itemQueryKeys.detail(id),
    queryFn: () => itemsApi.getById(id),
    enabled: !!id,
  });
};

// Hook pour récupérer les statistiques
export const useItemsStats = () => {
  return useQuery({
    queryKey: itemQueryKeys.stats(),
    queryFn: () => itemsApi.getStats(),
  });
};

// Hook pour créer un item
export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemData: CreateItemDto) => itemsApi.create(itemData),
    onSuccess: () => {
      // Invalider les queries pour forcer un refresh
      queryClient.invalidateQueries({ queryKey: itemQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: itemQueryKeys.stats() });
    },
  });
};

// Hook pour mettre à jour un item
export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateItemDto }) =>
      itemsApi.update(id, data),
    onSuccess: (_, variables) => {
      // Invalider les queries
      queryClient.invalidateQueries({ queryKey: itemQueryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: itemQueryKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: itemQueryKeys.stats() });
    },
  });
};

// Hook pour supprimer un item
export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => itemsApi.delete(id),
    onSuccess: () => {
      // Invalider les queries
      queryClient.invalidateQueries({ queryKey: itemQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: itemQueryKeys.stats() });
    },
  });
};

// Hook pour marquer un item comme vendu
export const useMarkItemAsSold = () => {
  const updateItem = useUpdateItem();

  return useMutation({
    mutationFn: ({
      id,
      salePrice,
      saleDate,
    }: {
      id: string;
      salePrice: number;
      saleDate: string;
    }) => updateItem.mutateAsync({ id, data: { salePrice, saleDate } }),
  });
};
