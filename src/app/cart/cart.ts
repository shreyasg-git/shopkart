import { CartItemType, Product } from "@/app/types";
import client from "../db/db";

import { cookies, headers } from "next/headers";
import { CONSTS } from "../consts/consts";

export async function getCart(): Promise<CartItemType[]> {
  const userId = headers().get("data-userId");

  await client.connect();

  const db = client.db(CONSTS.DB_NAME);

  const cartCollection = db.collection("carts");
  const productCollection = db.collection("products");

  const cart = await cartCollection.findOne({ userId });

  if (!cart || !cart.items) {
    return [];
  }

  const cartItemsWithProducts = await Promise.all(
    cart.items.map(async (item: CartItemType) => {
      const product = await productCollection.findOne({ _id: item.productId });

      return {
        ...item,
        ...(product as unknown as Product),
        productId: item.productId.toString(),
        _id: undefined,
      };
    })
  );
  console.log({ CART: cartItemsWithProducts });

  return cartItemsWithProducts;
}
