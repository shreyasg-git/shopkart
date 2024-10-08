"use server";
import { CONSTS } from "@/app/consts/consts";
import client from "@/app/db/db";
import { getUserFromDb, putUserInDB } from "@/app/db/dbUtils";
import { Product } from "@/app/types";
import { saltAndHashPassword } from "@/app/utils/password";
import { genNextRes } from "@/app/utils/responseUtils";
import { NextRequest, NextResponse } from "next/server";

const putProductInDB = async (product: Partial<Product>) => {
  await client.connect();
  delete product._id;
  const db = client.db(CONSTS.DB_NAME);
  const collection = db.collection("products");
  const productRes = await collection.insertOne({
    ...product,
    _id: undefined,
  });

  return productRes;
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "POST") {
      return genNextRes("Method not allowed", 405);
    }

    const { product } = await req.json();

    const prodRes = await putProductInDB(product);

    return NextResponse.json(
      { message: "PRODUCT created successfully", product: prodRes },
      { status: 201 }
    );
  } catch (error) {
    return genNextRes("Internal Server Error", 500);
  }
}
