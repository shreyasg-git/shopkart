import { headers } from "next/headers";
import client from "@/app/db/db";
import { Product } from "../types";
import { useParams } from "next/navigation";

export async function getProducts(...props: any[]): Promise<Product[] | null> {
  try {
    const headersList = headers();

    const router = console.log(
      "SORTSORTSORTSORTSORTSORTSORTSORTSORTSORTSORT",
      props
    );

    const userId = headersList.get("data-userId");

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
    console.error("ERROR :: IN GET PRODUCTS", error);
    return null;
  }
}
