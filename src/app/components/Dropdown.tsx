import React, { useState } from "react";
import { Button } from "./Button";

interface DropdownOption<T> {
  value: T;
  label: string;
}

interface DropdownProps<T> {
  options: DropdownOption<T>[];
  selectedOption: T;
  onOptionChange: (option: T) => void;
  buttonClassName?: string;
  dropdownClassName?: string;
}

const Dropdown = <T,>({
  options,
  selectedOption,
  onOptionChange,
  buttonClassName = "",
  dropdownClassName = "",
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: T) => {
    onOptionChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left -z-0">
      <div>
        <Button
          title=""
          type="button"
          className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${buttonClassName}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {options.find((option) => option.value === selectedOption)?.label}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>

      {isOpen && (
        <div
          className={`origin-top-right absolute right-0 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${dropdownClassName}`}
        >
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <div key={option.value.toString()} className="w-full ">
                <Button
                  disabled={option.value === "default"}
                  flat
                  title={option.label}
                  className={`${
                    selectedOption === option.value
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  } block px-4 py-2 text-sm m-0 w-full hover:bg-gray-100 hover:text-gray-900`}
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOptionClick(option.value);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
