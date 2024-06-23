import React from "react";

export default function WhiteBtns({ text, addFeaturedToCart }) {
  return (
    <>
      <button onClick={addFeaturedToCart} className=" rounded  bg-white text-black font-semibold text-sm px-5 py-2">
        {text}
      </button>
    </>
  );
}
