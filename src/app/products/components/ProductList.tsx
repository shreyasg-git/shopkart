"use client";

import { useState } from "react";
import { Product } from "../../types";
import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";
interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const handleSort = () => {};

  return (
    <>
      <div className="w-full justify-between flex mb-8">
        <h1 className="text-2xl font-bold mb-1">Our Products</h1>
        <SortDropdown onSortChange={handleSort} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
