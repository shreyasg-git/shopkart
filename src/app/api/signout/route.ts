import { serialize } from "cookie";
import { genNextRes } from "@/app/utils/responseUtils";
import { NextRequest, NextResponse } from "next/server";
import { baseURL } from "@/middleware";
import { RedirectType, redirect } from "next/navigation";

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

  const response = NextResponse.json(
    {
      success: true,
      redirectUrl: "/signin",
    },
    { status: 200 }
  );
  response.headers.set("Set-Cookie", cookie);

  return response;
}
