import bcrypt from "bcrypt";

export const saltAndHashPassword = async (password: string) => {
  const hashed = await bcrypt.hash(password, 10);
};
