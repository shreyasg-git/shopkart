import { Metadata } from "next";
import { getCart } from "./cart";

import Cart from "./components/Cart";
import Page from "../components/Page";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "View your shopping cart",
};

export default async function CartPage() {
  const cartItems = await getCart();

  return (
    <Page>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 divide-y divide-gray-700">
          Your Cart
        </h1>
        <hr />
        <br />

        <Cart initItems={cartItems} />
      </main>
    </Page>
  );
}
