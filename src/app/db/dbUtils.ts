import client from "./db";

export const getUserFromDb = async (email: string, hashedPass: string) => {
  await client.connect();
  const db = client.db("workflo");
  const collection = db.collection("users");

  const user = await collection.findOne({ email });
  console.log("FOUND USER ::: ", user);

  return user;
};

export const checkIfUserExists = async (email: string) => {
  await client.connect();
  const db = client.db("workflo");
  const collection = db.collection("users");
  const user = await collection.findOne({ email });

  return user;
};

/** this one should always be used after checking if the user already exists using `getUserFromDb` */
export const putUserInDB = async (
  email: string,
  hashedPass: string,
  fullName: string
) => {
  await client.connect();
  const db = client.db("workflo");
  const collection = db.collection("users");
  const user = await collection.insertOne({
    email,
    password: hashedPass,
    fullName,
  });

  return user;
};
