"use server";
import { NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";

import { checkIfUserExists } from "@/app/db/dbUtils";
import { verifyAccessToken, signAccessToken } from "@/app/utils/tokens";
import { NextRequest, NextResponse } from "next/server";

const loginUtil = async (data: { email: string; password: string }) => {
  try {
    const { email, password } = data;
    const user = await checkIfUserExists(email);

    if (!user) return false;

    console.log("comparing ", password, " :: ", user.password);

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) return false;

    delete user.password;
    const accessToken = await signAccessToken(user);
    return { ...user, accessToken };
  } catch (error) {
    console.error("LOGIN UTIL ERROR", error);

    return false;
  }
};

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const body = await req.json();

    console.log("AAAAAAAa", body);

    if (req.method !== "POST") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const data = await loginUtil({ email, password });

    if (!data) {
      return NextResponse.json(
        { message: "Email or password incorrect" },
        { status: 401 }
      );
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
    console.error("SIGNIN", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
