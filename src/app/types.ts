import { Condition, ObjectId } from "mongodb";

export type Product = {
  name: string | undefined;
  imageUrl: string | undefined;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  inCart?: boolean;
  _id: string | ObjectId;
};
export type CartItemType = {
  productId: string;
  quantity: number;
} & Product;
