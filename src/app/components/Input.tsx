"use client";
import React, { useState } from "react";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
      <label
        onClick={(e) => {
          //   console.log("AAAAaa", e.currentTarget.parentElement);

          e.currentTarget.parentElement?.childNodes[0].focus();
        }}
        className={`cursor-text absolute left-3 transition-all duration-200 ${
          isFocused || value
            ? "-top-2.5 text-sm text-blue-600 bg-white px-1"
            : "top-2 text-gray-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
