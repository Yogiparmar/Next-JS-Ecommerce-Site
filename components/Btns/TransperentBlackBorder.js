import React from "react";

export default function TransperentBlackBorder({ text, addFeaturedToCart }) {
  return (
    <>
      <button
        onClick={addFeaturedToCart}
        className="border-2 rounded border-black bg-transparent text-black font-semibold text-sm px-5 py-2"
      >
        {text}
      </button>
    </>
  );
}
