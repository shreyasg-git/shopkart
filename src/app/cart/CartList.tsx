"use client";

import { CartItem } from "@/app/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import useDebounce from "../utils/useDebounce";

type UpdateCartItemQuantity = {
  productId: string;
  quantity: number;
};

interface CartListProps {
  syncCartItems: Dispatch<SetStateAction<CartItem[]>>;
  items: CartItem[];
}

export default function CartList({ items, syncCartItems }: CartListProps) {
  const { subtotal, discountAmount, total } = useMemo(() => {
    const subtotal = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const discountRate = 0.1;
    const discountAmount = subtotal * discountRate;
    const total = subtotal - discountAmount;

    return { subtotal, discountAmount, total };
  }, [items]);

  const updateCartItemQuantityMutation = useMutation({
    mutationFn: async ({ productId, quantity }: UpdateCartItemQuantity) => {
      const response = await axios.patch("/api/cart", { productId, quantity });
      return response.data;
    },
    onSuccess: (res) => {
      console.log("SUCCESS SUECCSS");
      console.log({ res });
      syncCartItems(res);
    },
  });

  const debouncedUpdateQuantity = useDebounce(
    (productId: string, newQuantity: number) => {
      updateCartItemQuantityMutation.mutate({
        productId: productId,
        quantity: newQuantity,
      });
    },
    1000
  );

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    debouncedUpdateQuantity(productId, newQuantity);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg  p-6 mb-5">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <CartListItem
                key={item.productId.toString()}
                item={item}
                onUpdateQuantity={handleQuantityChange}
              />
            ))}
          </ul>
        )}
      </div>
      <hr />
      <div className="bg-white rounded-lg shadow-lg  p-6 mt-5  ">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount (10%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CartListItem({
  item,
  onUpdateQuantity,
}: {
  item: CartItem;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
    onUpdateQuantity(item.productId as string, newQuantity);
  };

  return (
    <li className="py-4 flex items-center flex-col justify-between sm:flex-row ">
      <div className="flex items-center">
        <img
          src={item.product.image}
          alt={item.product.title}
          className="w-16 h-16 object-cover rounded-md mr-4"
        />
        <div>
          <h3 className="md:text-lg sm:text-sm  font-semibold text-gray-800 line-clamp-2  hover:line-clamp-none  ">
            {item.product.title}
          </h3>
          <p className="text-sm text-gray-500">
            ${item.product.price.toFixed(2)} each
          </p>
        </div>
      </div>
      <div className="flex items-center pt-5 sm:pt-0">
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
          >
            -
          </button>
          <span className="px-3 py-1 text-gray-800">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
          >
            +
          </button>
        </div>
        <span className="ml-4 text-lg font-semibold text-gray-800">
          ${(item.product.price * quantity).toFixed(2)}
        </span>
      </div>
    </li>
  );
}
