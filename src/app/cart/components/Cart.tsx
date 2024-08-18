"use client";

import { useState, useEffect } from "react";
import CartList from "./CartList";
import { CartItemType } from "../../types";

type CartPageClientProps = { initItems: CartItemType[] };

const CartPageClient: React.FC<CartPageClientProps> = ({ initItems }) => {
  const [cartItems, setCartItems] = useState(initItems);

  return (
    <>
      <CartList items={cartItems} syncCartItems={setCartItems} />
    </>
  );
};

export default CartPageClient;
