import React, { createContext, useContext, type ReactNode } from "react";
import { useToast, type Toast } from "@/hooks/useToast";

interface ToastContextValue {
  toasts: Toast[];
  toast: (options: {
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
    duration?: number;
  }) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toastMethods = useToast();

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within ToastProvider");
  }
  return context;
};
