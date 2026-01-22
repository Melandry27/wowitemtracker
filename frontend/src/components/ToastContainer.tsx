import React from "react";
import { useToastContext } from "@/contexts/ToastContext";

export const ToastContainer: React.FC = () => {
  const { toasts, dismiss } = useToastContext();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`min-w-[300px] rounded-lg border p-4 shadow-lg ${
            toast.variant === "destructive"
              ? "border-destructive bg-destructive text-destructive-foreground"
              : "border-border bg-background"
          }`}>
          {toast.title && <div className="font-semibold">{toast.title}</div>}
          {toast.description && (
            <div className="text-sm opacity-90">{toast.description}</div>
          )}
          <button
            onClick={() => dismiss(toast.id)}
            className="absolute top-2 right-2 opacity-70 hover:opacity-100">
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
