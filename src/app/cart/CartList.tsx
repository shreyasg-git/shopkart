"use client";

import { CartItemType } from "@/app/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import useDebounce from "../utils/useDebounce";
import Spinner from "../components/Spinner";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

type UpdateCartItemQuantity = {
  productId: string;
  quantity: number;
};

interface CartListProps {
  syncCartItems: Dispatch<SetStateAction<CartItemType[]>>;
  items: CartItemType[];
}

export default function CartList({ items, syncCartItems }: CartListProps) {
  const [isDebouncing, setIsDebouncing] = useState(false);
  const { subtotal, discountAmount, total } = useMemo(() => {
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
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
      syncCartItems(res);
      setIsDebouncing(false);
    },
  });
  const deleteCartItemQuantityMutation = useMutation({
    mutationFn: async ({ productId }: UpdateCartItemQuantity) => {
      const response = await axios.delete("/api/cart", {
        data: { productId },

        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (res) => {
      syncCartItems(res);
      setIsDebouncing(false);
    },
  });

  const onDeleteItem = (productId: string) => {
    deleteCartItemQuantityMutation.mutate({ productId });
  };

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
    setIsDebouncing(true);
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
              <CartItem
                onDeleteItem={onDeleteItem}
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
        {isDebouncing ? (
          <div className="flex  justify-center">
            <Spinner />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
      <Checkout disabled={items.length === 0} />
    </>
  );
}
