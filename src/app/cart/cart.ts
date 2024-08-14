import { CartItem, Product } from "@/app/types";
import client from "../db/db";

import { cookies, headers } from "next/headers";

export async function getCart(): Promise<CartItem[]> {
  const userId = headers().get("data-userId");
  // const userId = request.headers.get("data-userId");
  // const userId = "123123";
  console.warn("=====", userId);
  console.log("=====================================");

  await client.connect();

  const db = client.db("workflo");

  const cartCollection = db.collection("carts");
  const productCollection = db.collection("products");

  const cart = await cartCollection.findOne({ userId });

  if (!cart || !cart.items) {
    return [];
  }

  const cartItemsWithProducts = await Promise.all(
    cart.items.map(async (item: CartItem) => {
      const product = await productCollection.findOne({ _id: item.productId });
      return { ...item, product: product as unknown as Product };
    })
  );

  return cartItemsWithProducts;
}
