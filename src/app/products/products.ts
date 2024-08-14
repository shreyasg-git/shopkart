import client from "@/app/db/db";
import { Product } from "../types";
// import { connectToDatabase } from "./";
import db from "@/app/db/db";
// import { Product } from "./types";

export async function getProducts(): Promise<Product[]> {
  try {
    await client.connect();

    const db = client.db("workflo");
    const collection = db.collection("products");

    const products = await collection.find({}).toArray();

    await client.close();

    return products as unknown as Product[];
  } catch (error) {
    console.error("ERROR :: IN GET PRODCUTS", error);
    return [];
  }
}
