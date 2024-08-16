import { headers } from "next/headers";
import { useState } from "react";

export const checkAuth = () => {
  const userId = headers().get("data-userId");

  return Boolean(userId && userId.length && userId.length >= 0);
};
