import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { availableThemes } from "@/config/theme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ThemeSelector: React.FC = () => {
  const { themeName, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="theme-selector" className="text-sm font-medium">
        Theme:
      </label>
      <Select value={themeName} onValueChange={setTheme}>
        <SelectTrigger id="theme-selector" className="w-48">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          {availableThemes.map((theme) => (
            <SelectItem key={theme.id} value={theme.id}>
              {theme.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
