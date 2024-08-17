import { CONSTS } from "@/app/consts/consts";
import client from "@/app/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("data-userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db(CONSTS.DB_NAME);
    const cartCollection = db.collection("carts");

    const count = await cartCollection
      .aggregate([
        { $match: { userId } },
        {
          $project: {
            itemCount: { $size: "$items" },
          },
        },
      ])
      .toArray();

    const itemCount = count[0]?.itemCount || 0;

    if (itemCount === 0) {
      return NextResponse.json({ error: "Cart " }, { status: 404 });
    }

    // Remove all items from the user's cart
    const result = await cartCollection.updateOne(
      { userId },
      { $set: { items: [] } }
    );

    return NextResponse.json({ message: "Checkout successful, cart cleared" });
  } catch (error) {
    console.log("ERROR IN CHECKOUT", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
