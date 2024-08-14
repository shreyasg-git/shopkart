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
};
export type CartItemType = {
  productId: string;
  quantity: number;
  product: Product;
};
