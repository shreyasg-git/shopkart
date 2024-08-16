import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyAccessToken } from "@/app/utils/tokens";
import { genNextRes } from "./app/utils/responseUtils";
import { log } from "console";

export const baseURL = "http://localhost:3000";

// routes that go thru middleware, and accessible without token (no early return, just token injection)
const OPEN_ROUTES = ["/"];

// routes that go thru middleware, but are not accessible without token (early return)
const CLOSE_ROUTES = ["/api/cart", "/cart", "/products"];

// routes that go thru middleware, but are not accessible to authed user
const STRICT_ROUTES = ["/signin", "/signup"];

export async function middleware(request: NextRequest) {
  try {
    console.log(
      "===================================MIDDLEWARE CALLED===================================="
    );

    const token = request.cookies.get("Authorization")?.value.split(" ")[1];

    const parsedUrl = new URL(request.url);

    // console.log(":::", parsedUrl.pathname, " ::: ", token);

    const tokenData = await verifyAccessToken(token);

    if (!tokenData) {
      if (
        ![...OPEN_ROUTES, ...STRICT_ROUTES, ...CLOSE_ROUTES].includes(
          parsedUrl.pathname
        )
      ) {
        console.log("IRRELEVANT ROUTE");
        return NextResponse.next();
      } else if (OPEN_ROUTES.includes(parsedUrl.pathname)) {
        console.log("OPEN ROUTE");
        return NextResponse.next();
      } else if (STRICT_ROUTES.includes(parsedUrl.pathname)) {
        console.log("STRICT ROUTE, NO tokenData");
        return NextResponse.next();
      } else {
        console.log("NO TOKEN");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    if (tokenData && STRICT_ROUTES.includes(parsedUrl.pathname)) {
      console.log("STRICT ROUTE");
      return NextResponse.redirect(baseURL + "/products");
    }

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("data-userId", tokenData.payload._id);

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (error) {
    console.error("ERROR IN MIDDLEWARE :: ", error);
    return genNextRes("Internal Server Error", 500);
  }
}

export const config = {
  matcher: ["/", "/api/cart", "/cart", "/products", "/signin", "/signup"],
};
