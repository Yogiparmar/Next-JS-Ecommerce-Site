import React, { useContext } from "react";
import TransperentBlackBorder from "./Btns/TransperentBlackBorder";
import { CartContex } from "./Globals/CartContext";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function LatestProductBox({ image, name, cost, id }) {
  const { addProduct } = useContext(CartContex);

  function addFeaturedToCart() {
    addProduct(id);
    toast.success("Product added to cart");
  }

  return (
    <>
      <Toaster />
      <div className="p-2">
        <Link href={`/specific/${id}`}>
          <div className="w-full bg-white p-5 h-[175px] flex text-center items-center justify-center rounded-lg">
            <img className="w-full h-full" src={image} />
          </div>
        </Link>

        <div className="mt-1">
          <div className="text-sm font-normal no-underline m-0">{name}</div>
          <div className="flex justify-between items-center mt-1">
            <div className="text-[1rem] font-normal text-right">${cost}</div>
            <TransperentBlackBorder
              text="Add to cart"
              addFeaturedToCart={addFeaturedToCart}
            />
          </div>
        </div>
      </div>
    </>
  );
}
