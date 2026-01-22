import { useCallback, useState } from "react";

interface UseToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

export interface Toast extends UseToastOptions {
  id: string;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    ({ duration = 3000, ...options }: UseToastOptions) => {
      const id = Math.random().toString(36).substring(7);
      const newToast: Toast = { ...options, id };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }

      return id;
    },
    [],
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    toast,
    dismiss,
  };
};
