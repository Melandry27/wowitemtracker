import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import type { ItemsStats } from "../types/item";

interface StatsCardsProps {
  stats: ItemsStats | undefined;
  isLoading?: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 rounded-lg skeleton" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="text-4xl font-bold"
            style={{
              color: "var(--text-gold)",
              textShadow: "var(--shadow-text)",
            }}>
            {stats.totalItems}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.ownedItems} owned, {stats.soldItems} sold
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Investment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="text-4xl font-bold"
            style={{
              color: "var(--text-gold)",
              textShadow: "var(--shadow-text)",
            }}>
            {stats.totalInvestment}g
          </div>
          <p className="text-xs text-muted-foreground">Money spent on items</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="text-4xl font-bold"
            style={{
              color: "var(--text-gold)",
              textShadow: "var(--shadow-text)",
            }}>
            {stats.totalRevenue}g
          </div>
          <p className="text-xs text-muted-foreground">
            Money earned from sales
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`text-4xl font-bold ${stats.totalProfit >= 0 ? "text-uncommon" : "text-epic"}`}>
            {stats.totalProfit >= 0 ? "+" : ""}
            {stats.totalProfit}g
          </div>
          <p className="text-xs text-muted-foreground">
            Avg: {stats.averageProfit?.toFixed(2)}g per item
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
