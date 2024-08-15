"use client";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "../components/Toast/useToast";
// import { Product } from "@/lib/types";
import { Product } from "../types";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

export default function ProductCard({
  product,
  setProducts,
}: ProductCardProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = useMutation({
    mutationFn: async (productId) => {
      setIsAdding(true);
      const response = await axios.post(
        "/api/cart",
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      router.refresh();
      setIsAdding(false);

      // Update global cart state or show success toast
      showToast({
        message: "Added to cart successfully!",
        color: "success",
        duration: 5000,
        position: "bottom-center",
      });
    },
    onError: (error) => {
      setIsAdding(false);
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    },
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex h-48 mb-4  justify-center align-middle  w-full">
        <img
          src={product.image}
          alt={product.name}
          className="h-full  mb-4 rounded"
        />
      </div>
      <h2 className="text-md font-semibold mb-2 line-clamp-1 sm:text-md">
        {product.title}
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        <button
          onClick={() => {
            console.log();

            addToCart.mutate(product._id);
          }}
          className={`text-sm px-4 py-2 rounded ${
            product.inCart
              ? "bg-gray-400"
              : isAdding
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          disabled={isAdding || product.inCart}
        >
          {product.inCart
            ? "Already In Cart"
            : isAdding
            ? "Adding..."
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
