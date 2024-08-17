import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Dropdown from "./Dropdown";

type SortOption = "lowToHigh" | "highToLow" | "default";

interface SortDropdownProps {
  onSortChange: (option: SortOption) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const options: { value: SortOption; label: string }[] = [
    { value: "default", label: "Select An Option" },
    { value: "lowToHigh", label: "Price: Low to High" },
    { value: "highToLow", label: "Price: High to Low" },
  ];

  const currentSort = (searchParams.get("sort") as SortOption) || "default";

  const handleSortChange = (option: SortOption) => {
    onSortChange(option);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", option);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <Dropdown
      options={options}
      selectedOption={currentSort}
      onOptionChange={handleSortChange}
    />
  );
};

export default SortDropdown;
