// CartPageClient.jsx
"use client";

import { useState, useEffect } from "react";
import CartList from "./CartList";
// import CartSummary from "./CartSummary";
import { CartItem } from "../types";

type CartPageClientProps = { initItems: CartItem[] };

const CartPageClient: React.FC<CartPageClientProps> = ({ initItems }) => {
  const [cartItems, setCartItems] = useState(initItems);

  return (
    <>
      <CartList items={cartItems} syncCartItems={setCartItems} />
    </>
  );
};

export default CartPageClient;
