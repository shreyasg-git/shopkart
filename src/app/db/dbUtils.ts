import client from "./db";

export const getUserFromDb = async (email: string, hashedPass: string) => {
  try {
    await client.connect();
    const db = client.db("workflo");
    const collection = db.collection("users");

    const user = await collection.findOne({ email });

    return user;
  } catch (error) {
    console.error("GET USER FROM DB", error);
  }
};

export const checkIfUserExists = async (email: string) => {
  try {
    await client.connect();
    const db = client.db("workflo");
    const collection = db.collection("users");
    const user = await collection.findOne({ email });

    return user;
  } catch (error) {
    console.error("CHECK IF USER EXISTS", error);
  }
};

/** this one should always be used after checking if the user already exists using `getUserFromDb` */
export const putUserInDB = async (
  email: string,
  hashedPass: string,
  fullName: string
) => {
  try {
    await client.connect();
    const db = client.db("workflo");
    const collection = db.collection("users");
    const user = await collection.insertOne({
      email,
      password: hashedPass,
      fullName,
    });

    return user;
  } catch (error) {
    console.error("ERROR :: PUT USER IN DB", error);
  }
};
