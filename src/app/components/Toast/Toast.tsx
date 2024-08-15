"use client";
import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  color?: "success" | "error" | "info";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  duration = 1000,
  color = "info",
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colorClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={` mt-2
        relative ${
          colorClasses[color]
        } text-white px-4 py-2 rounded-md shadow-lg
        transition-all duration-300 ease-in-out
        ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
        }
      `}
    >
      {message}
    </div>
  );
};

export default Toast;
