"use server";
import { getUserFromDb, putUserInDB } from "@/app/db/dbUtils";
import { saltAndHashPassword } from "@/app/utils/password";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  // console.log({ body: await req.json() });
  const { email, password, fullName } = await req.json();

  if (!email || !password || !fullName) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const pwHash = await saltAndHashPassword(password as string);
    // Check if the user already exists
    console.log("CHECKING IF USER EXISTS", email, pwHash);

    const existingUser = await getUserFromDb(email, pwHash!);

    console.log("AAAAAAAAAa", existingUser);

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    console.log("PUTTING USER IN DB...");
    const user = await putUserInDB(email, pwHash!, fullName);
    console.log("USER CREATED SCCUSSFULLY");

    return NextResponse.json(
      { message: "User created successfully", data: user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
