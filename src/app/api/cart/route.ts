import { NextRequest, NextResponse } from "next/server";
import client from "@/app/db/db";
import { ObjectId } from "mongodb";
import { CartItem, Product } from "@/app/types";

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("data-userId");
    console.log("GOT ADD TO CART POST REQ :: USERID :: ", userId);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const { productId } = await request.json();

    await client.connect();
    const db = client.db("workflo");
    const cartCollection = db.collection("carts");

    const result = await cartCollection.updateOne(
      { userId },
      {
        $addToSet: {
          items: {
            productId: new ObjectId(productId),
            quantity: 1,
          },
        },
      },
      { upsert: true }
    );

    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      // The item was already in the cart, so let's increment its quantity
      await cartCollection.updateOne(
        { userId, "items.productId": new ObjectId(productId) },
        { $inc: { "items.$.quantity": 1 } }
      );
    }

    const updatedCart = await cartCollection.findOne({ userId });

    return NextResponse.json(updatedCart?.items || []);
  } catch (error) {
    console.log("ERROR IN POST CART", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get("data-userId");
    console.log("GOT UPDATE CART QUANTITY PATCH REQ :: USERID :: ", userId);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const { productId, quantity } = await request.json();

    if (!productId || typeof quantity !== "number") {
      return NextResponse.json(
        { error: "Product ID and quantity are required" },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db("workflo");
    const cartCollection = db.collection("carts");

    if (quantity > 0) {
      // Update the quantity
      await cartCollection.updateOne(
        { userId, "items.productId": new ObjectId(productId) },
        { $set: { "items.$.quantity": quantity } }
      );
    } else {
      // Remove the item from the cart if quantity is 0 or negative
      await cartCollection.updateOne(
        { userId },
        { $pull: { items: { productId: new ObjectId(productId) } } }
      );
    }

    const updatedCart = await cartCollection.findOne({ userId });
    const productCollection = db.collection("products");

    if (!updatedCart || !updatedCart.items) {
      return NextResponse.json([]);
    }

    const cartItemsWithProducts = await Promise.all(
      updatedCart.items.map(async (item: CartItem) => {
        const product = await productCollection.findOne({
          _id: item.productId,
        });
        return { ...item, product: product as unknown as Product };
      })
    );

    return NextResponse.json(cartItemsWithProducts || []);
  } catch (error) {
    console.log("ERROR IN PATCH CART", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
