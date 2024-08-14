import bcrypt from "bcrypt";

export const saltAndHashPassword = async (password: string) => {
  try {
    console.log("PASS ARG FOR HASING", password);

    const hashed = await bcrypt.hash(password, 10);
    console.log("HASHIN DONE", password);

    return hashed;
  } catch (error) {
    console.error("ERROR WHILE HASHING", error);
  }
};
