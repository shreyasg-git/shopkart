import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import useDebounce from "../utils/useDebounce";
import { CartItemType } from "@/app/types";
import Spinner from "../components/Spinner";
import DeleteIcon from "../components/DeleteButton";

type CartItemProps = {
  item: CartItemType;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onDeleteItem: (productId: string) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onDeleteItem,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
    onUpdateQuantity(item.productId as string, newQuantity);
  };

  const handleQuantityEdit = (newQuantity: number) => {
    setQuantity(newQuantity);
    onUpdateQuantity(item.productId as string, newQuantity);
  };

  const handleDelete = () => {
    onDeleteItem(item.productId as string);
  };

  return (
    <li className="py-4 flex items-center flex-col justify-between sm:flex-row ">
      <div className="flex items-center">
        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-16 object-cover rounded-md mr-4"
        />
        <div>
          <h3 className="md:text-lg sm:text-sm font-semibold text-gray-800 line-clamp-2 hover:line-clamp-none">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500">
            ${Number(item.price).toFixed(2)} each
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
          <input
            className="w-12 text-center"
            onChange={(e) => {
              if (quantity === 1) {
                return;
              }
              handleQuantityEdit(Number(e.currentTarget.value));
            }}
            value={quantity}
          />
          <button
            onClick={() => {
              handleQuantityChange(1);
            }}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
          >
            +
          </button>
        </div>
        <span className="ml-4 text-lg font-semibold text-gray-800">
          ${(item.price * quantity).toFixed(2)}
        </span>
        <button
          onClick={handleDelete}
          className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors duration-200"
          aria-label="Delete item"
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
