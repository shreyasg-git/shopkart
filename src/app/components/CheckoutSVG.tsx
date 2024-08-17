import React from "react";

type CheckoutSVGProps = {};

const CheckoutSVG: React.FC<CheckoutSVGProps> = ({}) => {
  return (
    <svg
      className="h-6 w-6 text-green-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
  );
};

export default CheckoutSVG;
