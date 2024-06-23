import Link from "next/link";
import React, { useContext } from "react";
import { CartContex } from "./Globals/CartContext";

export default function Navbar() {
  const { cartProducts } = useContext(CartContex);

  return (
    <>
      <nav className="w-full h-20 flex px-20 justify-between items-center bg-slate-950 text-white">
        <div>
          <Link href="/">
            <h1 className="text-2xl">Ecommerce</h1>
          </Link>
        </div>
        <ul className="flex gap-6">
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/all-products">
            <li>All Product</li>
          </Link>
          <Link href="/search">
            <li>Search</li>
          </Link>
          <Link href="/account">
            <li>Account</li>
          </Link>
          <Link href="/cart">
            {cartProducts ? (
              <li>Cart ({cartProducts.length})</li>
            ) : (
              <li>Cart</li>
            )}
          </Link>
        </ul>
      </nav>
    </>
  );
}
