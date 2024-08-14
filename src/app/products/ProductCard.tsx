"use client";

// import { Product } from "@/lib/types";
import { Product } from "../types";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": "user123", // Replace with actual user ID
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      // You might want to update some global cart state here
      alert("Added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        <button
          onClick={handleAddToCart}
          className={`px-4 py-2 rounded ${
            isAdding ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
