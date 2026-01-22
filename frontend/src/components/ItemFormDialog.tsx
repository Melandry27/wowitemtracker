import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useForm } from "../hooks/useForm";
import { ITEM_TYPES } from "../config/constants";
import type { CreateItemDto, Item } from "../types/item";

interface ItemFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateItemDto) => void | Promise<void>;
  item?: Item | null;
  isLoading?: boolean;
}

export const ItemFormDialog: React.FC<ItemFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  item,
  isLoading,
}) => {
  const initialValues: CreateItemDto = {
    name: item?.name || "",
    type: item?.type || "Armor",
    purchasePrice: item?.purchasePrice || 0,
    purchaseDate: item?.purchaseDate
      ? item.purchaseDate.split("T")[0]
      : new Date().toISOString().split("T")[0],
    salePrice: item?.salePrice || null,
    saleDate: item?.saleDate ? item.saleDate.split("T")[0] : null,
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit, reset } =
    useForm({
      initialValues,
      onSubmit: async (data) => {
        await onSubmit(data);
        onClose();
        reset();
      },
      validate: (values) => {
        const errors: Record<string, string> = {};
        if (!values.name.trim()) errors.name = "Name is required";
        if (!values.purchasePrice || values.purchasePrice <= 0)
          errors.purchasePrice = "Price must be greater than 0";
        return errors;
      },
    });

  useEffect(() => {
    if (isOpen && item) {
      Object.keys(initialValues).forEach((key) => {
        handleChange(
          key as keyof CreateItemDto,
          initialValues[key as keyof CreateItemDto],
        );
      });
    } else if (!isOpen) {
      reset();
    }
  }, [isOpen, item]);

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? "Edit Item" : "Create New Item"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={values.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("name", e.target.value)
              }
              placeholder="Item name"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={values.type}
              onValueChange={(value: string) => handleChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {ITEM_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Purchase Price (g)</Label>
              <Input
                id="purchasePrice"
                type="number"
                value={values.purchasePrice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("purchasePrice", Number(e.target.value))
                }
                placeholder="0"
              />
              {errors.purchasePrice && (
                <p className="text-sm text-destructive">
                  {errors.purchasePrice}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={values.purchaseDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("purchaseDate", e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salePrice">Sale Price (g)</Label>
              <Input
                id="salePrice"
                type="number"
                value={values.salePrice || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(
                    "salePrice",
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
                placeholder="Optional"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="saleDate">Sale Date</Label>
              <Input
                id="saleDate"
                type="date"
                value={values.saleDate || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("saleDate", e.target.value || null)
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting || isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isLoading}>
              {isSubmitting || isLoading
                ? "Saving..."
                : item
                  ? "Update"
                  : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
