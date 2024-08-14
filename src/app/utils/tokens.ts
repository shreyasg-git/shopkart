import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

// require("dotenv").config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const signAccessToken = (payload: any) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ payload }, accessTokenSecret, {}, (err, token) => {
      console.log("YOOO", err);

      if (err) {
        // reject(createHttpError.InternalServerError());
        reject(new Error("Internal Server Error"));
      }
      resolve(token);
    });
  });
};

export const verifyAccessToken = async (token: any) => {
  const payload = jwtVerify(token, new TextEncoder().encode(accessTokenSecret));

  return payload;
};
