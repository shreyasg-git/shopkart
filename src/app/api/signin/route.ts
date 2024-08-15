"use server";
import { NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";

import { checkIfUserExists } from "@/app/db/dbUtils";
import { verifyAccessToken, signAccessToken } from "@/app/utils/tokens";
import { NextRequest, NextResponse } from "next/server";
import { genNextRes } from "@/app/utils/responseUtils";

const loginUtil = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  const user = await checkIfUserExists(email);

  if (!user) return false;

  const checkPassword = bcrypt.compareSync(password, user.password);

  if (!checkPassword) return false;

  delete user.password;
  const accessToken = await signAccessToken(user);
  return { ...user, accessToken };
};

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const body = await req.json();

    if (req.method !== "POST") {
      return genNextRes("Method not allowed", 405);
    }

    const { email, password } = body;

    if (!email || !password) {
      return genNextRes("Email and password are required", 400);
    }

    const data = await loginUtil({ email, password });

    if (!data) {
      return genNextRes("Email or password incorrect", 401);
    }

    // Serialize the cookie
    const serializedCookie = cookie.serialize(
      "Authorization",
      `Bearer ${data.accessToken}`,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Use secure flag in production
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "strict",
        path: "/",
      }
    );

    delete data?.accessToken;

    const response = NextResponse.json(
      {
        status: true,
        message: "login successful",
        data,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": serializedCookie, // Set the serialized cookie in headers
        },
      }
    );
    return response;
  } catch (error) {
    console.error("SIGNIN ERROR", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
