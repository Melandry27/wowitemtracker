import React from "react";
import type { Item } from "../types/item";
import { ItemCard } from "./ItemCard";

interface ItemListProps {
  items: Item[];
  isLoading?: boolean;
  onEdit?: (item: Item) => void;
  onDelete?: (item: Item) => void;
  onMarkAsSold?: (item: Item) => void;
}

export const ItemList: React.FC<ItemListProps> = ({
  items,
  isLoading,
  onEdit,
  onDelete,
  onMarkAsSold,
}) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 rounded-lg skeleton" />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">
          No items found. Create your first item to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onMarkAsSold={onMarkAsSold}
        />
      ))}
    </div>
  );
};
