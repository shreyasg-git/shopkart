"use client";
import React from "react";
import Toast from "./Toast";
import { useToast } from "./useToast";

type ToastContainerProps = { position?: "bottom-right" | "bottom-center" };

const ToastContainer: React.FC<ToastContainerProps> = ({
  position = "bottom-right",
}) => {
  const { toasts, removeToast } = useToast();

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  return (
    <>
      <div className={`fixed ${positionClasses[position]}`}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            duration={toast.duration}
            color={toast.color}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </>
  );
};

export default ToastContainer;
