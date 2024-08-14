import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "@/app/utils/tokens";

export async function middleware(request: NextRequest) {
  try {
    console.log(
      "===================================MIDDLEWARE CALLED===================================="
    );

    const token = request.cookies.get("Authorization")?.value.split(" ")[1];
    const { payload }: any = await verifyAccessToken(token);
    console.log("GOT PAYLOAD", payload);

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    const requestHeaders = new Headers(request.headers);
    console.log("AAAAAAAAAa", payload.payload._id);

    requestHeaders.set("data-userId", payload.payload._id);

    // (request as any).user = payload;
    // console.log("((((((((((", request.user);

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/cart/:path*", "/products", "/cart"],
};
