import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Padding from "./components/Padding";
import { checkAuth } from "./utils/utils";
// components/Navbar.tsx

export default function Home() {
  const isAuthed = checkAuth();
  console.log("AUTHAUTHAUTHAUTH", isAuthed);

  return (
    <>
      <main className=" w-screen ">
        <section className="text-center h-svh flex justify-center items-center flex-col px-6">
          <h2 className="sm:text-4xl text-3xl font-bold mb-4">
            Welcome to ShopKart
          </h2>
          <p className="text-xl text-gray-600">
            Discover amazing products and add them to your cart with ease.
          </p>
          <Padding height={20} />
          {isAuthed ? (
            <>
              <p className="text-xl text-gray-600">
                Checkout our &nbsp;
                <Link
                  href="/products"
                  className="hover:text-blue-400 text-blue-600"
                >
                  Products
                </Link>
              </p>
            </>
          ) : (
            <>
              <p className="text-xl text-gray-600">
                Proceed To &nbsp;
                <Link
                  href="/signup"
                  className="hover:text-blue-400 text-blue-600"
                >
                  Sign Up
                </Link>
              </p>
              <Padding height={20} />
              <p className="text-xl text-gray-600">
                Already Have An Account? &nbsp;
                <Link
                  href="/signin"
                  className="hover:text-blue-400 text-blue-600"
                >
                  Login
                </Link>
              </p>
            </>
          )}
        </section>
      </main>
    </>
  );
}
