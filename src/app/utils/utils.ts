import { headers } from "next/headers";

export const checkAuth = () => {
  const userId = headers().get("data-userId");
  return Boolean(userId && userId.length && userId.length >= 0);
};
