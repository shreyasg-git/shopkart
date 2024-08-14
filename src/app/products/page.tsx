import { Metadata } from "next";
import ProductList from "./ProductList";
import { getProducts } from "./products";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Browse our selection of products",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <ProductList products={products} />
    </main>
  );
}
