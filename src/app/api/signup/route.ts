"use server";
import { getUserFromDb, putUserInDB } from "@/app/db/dbUtils";
import { signUpvalidationSchema } from "@/app/schemas";
import { saltAndHashPassword } from "@/app/utils/password";
import { genNextRes } from "@/app/utils/responseUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "POST") {
      return genNextRes("Method not allowed", 405);
    }

    const { email, password, fullName, confirmPassword } = await req.json();

    const validated = await signUpvalidationSchema.validate({
      email,
      password,
      fullName,
      confirmPassword,
    });

    if (!email || !password || !fullName) {
      return genNextRes("Email and password and Full Name are required", 400);
    }

    const pwHash = await saltAndHashPassword(password as string);

    const existingUser = await getUserFromDb(email, pwHash!);

    if (existingUser) {
      return genNextRes("User already exists", 409);
    }

    console.log(
      "CREATING NEW USER WITH :: ",
      email,
      " :: ",
      pwHash!,
      " :: ",
      fullName
    );

    const user = await putUserInDB(email, pwHash!, fullName);
    return NextResponse.json(
      { message: "User created successfully", data: user },
      { status: 201 }
    );
  } catch (error) {
    console.log("ERROR IN SIGNUP", error);

    return genNextRes("Internal Server Error", 500);
  }
}
