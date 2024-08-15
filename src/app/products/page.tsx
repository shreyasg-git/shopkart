import { Metadata } from "next";
import ProductList from "./ProductList";
import { getProducts } from "./products";
import NavBar from "../components/NavBar";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Browse our selection of products",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold mb-1">Our Products</h1>
      <ProductList products={products} />
    </main>
  );
}
