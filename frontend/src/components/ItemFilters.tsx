import React from "react";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { ITEM_TYPES } from "../config/constants";
import { useItemFiltersContext } from "../contexts/ItemFiltersContext";

interface ItemFiltersProps {
  onCreateNew?: () => void;
}

export const ItemFilters: React.FC<ItemFiltersProps> = ({ onCreateNew }) => {
  const { filters, setType, setStatus, setSearch, resetFilters } =
    useItemFiltersContext();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 gap-2">
        <Input
          placeholder="Search items..."
          value={filters.search || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="max-w-xs"
        />

        <Select
          value={filters.type || "all"}
          onValueChange={(value: string) => setType(value as any)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {ITEM_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status || "all"}
          onValueChange={(value: string) => setStatus(value as any)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="owned">Owned</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>

        {(filters.type || filters.status || filters.search) && (
          <Button variant="ghost" onClick={resetFilters}>
            Reset
          </Button>
        )}
      </div>

      {onCreateNew && <Button onClick={onCreateNew}>Create New Item</Button>}
    </div>
  );
};
