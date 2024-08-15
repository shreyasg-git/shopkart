import { NextResponse } from "next/server";

export const genNextRes = (msg: string, code: number) => {
  return NextResponse.json({ message: msg }, { status: code });
};
