import { serialize } from "cookie";
import { genNextRes } from "@/app/utils/responseUtils";
import { NextRequest, NextResponse } from "next/server";
import { baseURL } from "@/middleware";

export function POST(req: NextRequest) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return genNextRes("Method not allowed", 405);
  }

  // Clear the authentication cookie
  const cookie = serialize("Authorization", "", {
    maxAge: -1,
    path: "/",
  });

  // Set the cookie header
  return NextResponse.redirect(baseURL + "/signin", {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie, // Set the serialized cookie in headers
    },
  });
}
