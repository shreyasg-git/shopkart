"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface ToastOptions {
  message: string;
  duration?: number;
  color?: "success" | "error" | "info";
  position?: "bottom-right" | "bottom-center";
}

interface Toast extends ToastOptions {
  id: number;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (options: ToastOptions) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

type ToastProviderProps = { children: React.ReactNode };

export const ToastProvider: React.FC = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((options: ToastOptions) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { ...options, id }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <>
      <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
        {children}
      </ToastContext.Provider>
    </>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
