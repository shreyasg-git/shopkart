import client from "@/app/db/db";
import { Product } from "../types";
// import { connectToDatabase } from "./";
import db from "@/app/db/db";
import { headers } from "next/headers";
// import { Product } from "./types";

export async function getProducts(): Promise<Product[]> {
  try {
    const userId = headers().get("data-userId");

    await client.connect();

    const db = client.db("workflo");
    const collection = db.collection("products");
    const cartCollection = db.collection("carts");

    const products = await collection.find({}).toArray();
    const cart = (await cartCollection.findOne({ userId })) || { items: [] };

    const reducedCart = cart?.items.map((item) => item.productId.toString());

    await client.close();

    const productsWithCartFlags = products.map((product) => {
      const final = { ...product, inCart: false, _id: product._id.toString() };
      if (reducedCart.includes(product._id.toString())) {
        final.inCart = true;
      }
      return final;
    });

    return productsWithCartFlags as unknown as Product[];
  } catch (error) {
    console.error("ERROR :: IN GET PRODCUTS", error);
    return [];
  }
}
