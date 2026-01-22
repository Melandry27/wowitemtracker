import React from "react";
import type { Item } from "../types/item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

interface ItemCardProps {
  item: Item;
  onEdit?: (item: Item) => void;
  onDelete?: (item: Item) => void;
  onMarkAsSold?: (item: Item) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onEdit,
  onDelete,
  onMarkAsSold,
}) => {
  const profit =
    item.salePrice && item.purchasePrice
      ? item.salePrice - item.purchasePrice
      : 0;
  const isOwned = item.status === "owned";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.type}</CardDescription>
          </div>
          <Badge
            variant={isOwned ? "default" : "secondary"}
            className={isOwned ? "text-rare" : "text-uncommon"}>
            {isOwned ? "Owned" : "Sold"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Purchase Price:
            </span>
            <span className="font-medium">{item.purchasePrice}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Purchase Date:
            </span>
            <span className="text-sm">
              {new Date(item.purchaseDate).toLocaleDateString()}
            </span>
          </div>
          {item.salePrice && (
            <>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Sale Price:
                </span>
                <span className="font-medium">{item.salePrice}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Sale Date:
                </span>
                <span className="text-sm">
                  {item.saleDate
                    ? new Date(item.saleDate).toLocaleDateString()
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-sm font-semibold">Profit:</span>
                <span
                  className={`font-semibold ${profit >= 0 ? "text-uncommon" : "text-epic"}`}>
                  {profit >= 0 ? "+" : ""}
                  {profit}g
                </span>
              </div>
            </>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
              Edit
            </Button>
          )}
          {isOwned && onMarkAsSold && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onMarkAsSold(item)}>
              Mark as Sold
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(item)}>
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
