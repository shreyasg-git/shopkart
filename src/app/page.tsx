import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NavBar from "./components/NavBar";
// components/Navbar.tsx

export default function Home() {
  return (
    <div className=" bg-gray-100 ">
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12 ">
          <h2 className="text-4xl font-bold mb-4">Welcome to ShopKart</h2>
          <p className="text-xl text-gray-600">
            Discover amazing products and add them to your cart with ease.
          </p>
        </section>
      </main>
    </div>
  );
}
