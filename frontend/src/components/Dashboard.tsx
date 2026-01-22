import React, { useState, useMemo } from "react";
import { ItemList } from "./ItemList";
import { ItemFilters } from "./ItemFilters";
import { StatsCards } from "./StatsCards";
import { ItemFormDialog } from "./ItemFormDialog";
import { MarkAsSoldDialog } from "./MarkAsSoldDialog";
import {
  useItems,
  useItemsStats,
  useCreateItem,
  useUpdateItem,
  useDeleteItem,
} from "../hooks/useItemsData";
import { useDialog } from "../hooks/useDialog";
import { useItemFiltersContext } from "../contexts/ItemFiltersContext";
import { useToastContext } from "../contexts/ToastContext";
import type { Item, CreateItemDto } from "../types/item";

export const Dashboard: React.FC = () => {
  const { filters } = useItemFiltersContext();
  const { toast } = useToastContext();

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [itemToSell, setItemToSell] = useState<Item | null>(null);

  const formDialog = useDialog();
  const sellDialog = useDialog();

  // Build API filters
  const apiFilters = useMemo(() => {
    const result: { type?: string; status?: string } = {};
    if (filters.type && filters.type !== "all") result.type = filters.type;
    if (filters.status && filters.status !== "all")
      result.status = filters.status;
    return result;
  }, [filters.type, filters.status]);

  // Queries
  const { data: items = [], isLoading } = useItems(apiFilters);
  const { data: stats, isLoading: statsLoading } = useItemsStats();

  // Mutations
  const createItem = useCreateItem();
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();

  // Filter items by search
  const filteredItems = useMemo(() => {
    if (!filters.search) return items;
    const searchLower = filters.search.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchLower) ||
        item.type.toLowerCase().includes(searchLower),
    );
  }, [items, filters.search]);

  const handleCreateNew = () => {
    setSelectedItem(null);
    formDialog.open();
  };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    formDialog.open();
  };

  const handleDelete = async (item: Item) => {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;

    try {
      await deleteItem.mutateAsync(item._id);
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const handleMarkAsSold = (item: Item) => {
    setItemToSell(item);
    sellDialog.open();
  };

  const handleFormSubmit = async (data: CreateItemDto) => {
    try {
      if (selectedItem) {
        await updateItem.mutateAsync({ id: selectedItem._id, data });
        toast({
          title: "Success",
          description: "Item updated successfully",
        });
      } else {
        await createItem.mutateAsync(data);
        toast({
          title: "Success",
          description: "Item created successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${selectedItem ? "update" : "create"} item`,
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleSoldSubmit = async (data: {
    salePrice: number;
    saleDate: string;
  }) => {
    if (!itemToSell) return;

    try {
      await updateItem.mutateAsync({
        id: itemToSell._id,
        data: {
          salePrice: data.salePrice,
          saleDate: data.saleDate,
        },
      });
      toast({
        title: "Success",
        description: "Item marked as sold",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark item as sold",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">WoW Item Tracker</h1>
        <p className="text-muted-foreground">
          Track your World of Warcraft items and profits
        </p>
      </div>

      <StatsCards stats={stats} isLoading={statsLoading} />

      <ItemFilters onCreateNew={handleCreateNew} />

      <ItemList
        items={filteredItems}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMarkAsSold={handleMarkAsSold}
      />

      <ItemFormDialog
        isOpen={formDialog.isOpen}
        onClose={formDialog.close}
        onSubmit={handleFormSubmit}
        item={selectedItem}
        isLoading={createItem.isPending || updateItem.isPending}
      />

      <MarkAsSoldDialog
        isOpen={sellDialog.isOpen}
        onClose={sellDialog.close}
        onSubmit={handleSoldSubmit}
        item={itemToSell}
        isLoading={updateItem.isPending}
      />
    </div>
  );
};
