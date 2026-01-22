import React from "react";
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
import { useForm } from "../hooks/useForm";
import type { Item } from "../types/item";

interface MarkAsSoldDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    salePrice: number;
    saleDate: string;
  }) => void | Promise<void>;
  item: Item | null;
  isLoading?: boolean;
}

export const MarkAsSoldDialog: React.FC<MarkAsSoldDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  item,
  isLoading,
}) => {
  const initialValues = {
    salePrice: 0,
    saleDate: new Date().toISOString().split("T")[0],
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
        if (!values.salePrice || values.salePrice <= 0)
          errors.salePrice = "Price must be greater than 0";
        if (!values.saleDate) errors.saleDate = "Date is required";
        return errors;
      },
    });

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark as Sold - {item.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="salePrice">Sale Price (g)</Label>
            <Input
              id="salePrice"
              type="number"
              value={values.salePrice}
              onChange={(e) =>
                handleChange("salePrice", Number(e.target.value))
              }
              placeholder="0"
            />
            {errors.salePrice && (
              <p className="text-sm text-destructive">{errors.salePrice}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="saleDate">Sale Date</Label>
            <Input
              id="saleDate"
              type="date"
              value={values.saleDate}
              onChange={(e) => handleChange("saleDate", e.target.value)}
            />
            {errors.saleDate && (
              <p className="text-sm text-destructive">{errors.saleDate}</p>
            )}
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between text-sm">
              <span>Purchase Price:</span>
              <span className="font-medium">{item.purchasePrice}g</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Sale Price:</span>
              <span className="font-medium">{values.salePrice}g</span>
            </div>
            <div className="mt-2 flex justify-between border-t pt-2 font-semibold">
              <span>Estimated Profit:</span>
              <span
                className={
                  values.salePrice - item.purchasePrice >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }>
                {values.salePrice - item.purchasePrice >= 0 ? "+" : ""}
                {values.salePrice - item.purchasePrice}g
              </span>
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
              {isSubmitting || isLoading ? "Saving..." : "Mark as Sold"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
