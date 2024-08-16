"use client";
import { HTMLAttributes } from "react";
import Spinner from "./Spinner";

export enum ButtonTypes {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

type ButtonProps = {
  title: string;
  type?: ButtonTypes;
  flat?: boolean;
  loading?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<ButtonProps> = ({
  children,
  title,
  onClick,
  type = ButtonTypes.PRIMARY,
  flat = false,
  loading = false,
  disabled = false,
  ...attributes
}) => {
  const buttonClasses = `
    cursor-pointer
    py-2
    px-4
    rounded
    uppercase
    border
    ${flat ? "flex-1" : ""}
    ${
      type === ButtonTypes.PRIMARY
        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
        : "bg-transparent text-grey-600 text-bold border-0 hover:bg-grey-200"
    }
  `;

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled || loading}
      {...attributes}
    >
      {loading ? (
        <div className="flex justify-center">
          <Spinner size="sm" />
        </div>
      ) : (
        <>
          {title}
          {children}
        </>
      )}
    </button>
  );
};
