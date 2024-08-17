if (!process.env.DB_NAME) {
  throw new Error('Invalid/Missing environment variable: "DB_NAME"');
}

export const CONSTS = {
  DB_NAME: process.env.DB_NAME,
};
