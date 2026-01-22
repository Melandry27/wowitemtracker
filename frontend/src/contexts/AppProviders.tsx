import React, { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";
import { ItemFiltersProvider } from "./ItemFiltersContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000, // 30 seconds
    },
  },
});

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <ItemFiltersProvider>{children}</ItemFiltersProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
