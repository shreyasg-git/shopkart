"use client";
import { HTMLAttributes, useMemo } from "react";
import { Colors } from "../utils/Colors";
// import Colors from "../../consts/Colors";

export enum ButtonTypes {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

type ButtonProps = {
  title: string;
  type?: ButtonTypes;
  flat?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  title,
  onClick,
  type = ButtonTypes.PRIMARY,
  flat = false,
  ...attributes
}) => {
  const { borderColor, textColor, backgroundColor } = useMemo(() => {
    switch (type) {
      case ButtonTypes.PRIMARY:
        return {
          borderColor: Colors.primary,
          textColor: Colors.white,
          backgroundColor: Colors.primary,
        };
      case ButtonTypes.SECONDARY:
        return {
          borderColor: Colors.secondary,
          textColor: Colors.primary,
          backgroundColor: "transparent",
        };
      default:
        return {
          borderColor: Colors.primary,
          textColor: Colors.white,
          backgroundColor: Colors.primary,
        };
    }
  }, [type]);

  return (
    <button
      type="button"
      onClick={onClick}
      //   className="border border-gray-800 px-4 py-2 rounded uppercase"
      style={{
        cursor: "pointer",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        borderRadius: "0.25rem",
        borderWidth: "1px",
        // borderColor: "#1F2937",
        textTransform: "uppercase",
        // backgroundColor: "#4AB39B",
        borderColor,
        color: textColor,
        backgroundColor,

        flex: flat ? 1 : undefined,
      }}
      {...attributes}
    >
      {title}
    </button>
  );
};
