import { Metadata } from "next";
import ProductList from "./components/ProductList";
import { getProducts } from "./products";
import NavBar from "../components/NavBar/NavBar";
import { checkAuth } from "../utils/utils";
import Page from "../components/Page";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Browse our selection of products",
};
export const dynamic = "force-dynamic";
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sortOption = (searchParams.sort as string) || "default";

  const products = await getProducts();

  if (!products) {
    return (
      <main className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold mb-1 text-red-500">
          Something Went Wrong
        </h1>
      </main>
    );
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "lowToHigh":
        return a.price - b.price;
      case "highToLow":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <Page>
      <main className="container mx-auto px-4 py-4">
        <ProductList products={sortedProducts} />
      </main>
    </Page>
  );
}
