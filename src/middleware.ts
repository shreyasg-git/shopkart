import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyAccessToken } from "@/app/utils/tokens";

export async function middleware(request: NextRequest) {
  try {
    console.log(
      "===================================MIDDLEWARE CALLED===================================="
    );

    const token = request.cookies.get("Authorization")?.value.split(" ")[1];

    const parsedUrl = new URL(request.url);

    console.log(":::", parsedUrl.pathname);

    if (!token && parsedUrl.pathname === "/") {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    const { payload }: any = await verifyAccessToken(token);

    const requestHeaders = new Headers(request.headers);

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
  matcher: ["/api/cart/:path*", "/products", "/cart", "/"],
};
