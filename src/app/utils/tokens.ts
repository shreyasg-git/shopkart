import { SignJWT, jwtVerify } from "jose";

// require("dotenv").config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const signAccessToken = async (payload: any): Promise<string> => {
  try {
    const secret = new TextEncoder().encode(accessTokenSecret);
    const alg = "HS256";

    const jwt = await new SignJWT({ payload })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("1h") // Set expiration time as needed
      .sign(secret);

    return jwt;
  } catch (error) {
    console.error("Error signing access token:", error);
    throw new Error("Internal Server Error");
  }
};

export const verifyAccessToken = async (token: any) => {
  const payload = jwtVerify(token, new TextEncoder().encode(accessTokenSecret));

  return payload;
};
