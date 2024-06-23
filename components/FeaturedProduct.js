import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import TransperentBtn from "./Btns/TransperentBtn";
import WhiteBtns from "./Btns/WhiteBtns";
import { CartContex } from "./Globals/CartContext";
import Link from "next/link";

export default function FeaturedProduct() {
  const { addProduct } = useContext(CartContex);
  const [product, setProduct] = useState({});

  const getFeaturedProduct = async () => {
    const idResponse = await axios.get(`/api/admin/products/get-ids`);
    const productIds = idResponse.data;

    const randomIndex = Math.floor(Math.random() * productIds.length);
    const randomProductId = productIds[randomIndex];
    try {
      const response = await axios.get(
        `/api/admin/products/get-specific-product?id=${randomProductId}`
      );
      setProduct(response.data);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  function addFeaturedToCart() {
    addProduct(product._id);
  }

  useEffect(() => {
    getFeaturedProduct();
  }, []);


  return (
    <>
      <Toaster />
      <div className="w-full h-[300px] bg-slate-950 flex items-center justify-center">
        {/* Check if product exists before rendering */}
        {product && (
          <div className="w-1/2 flex gap-4">
            <div className="w-full h-[200px] flex flex-col items-start gap-5 justify-center">
              <h1 className="text-white text-2xl font-semibold">
                {product.name}
              </h1>
              <p className="text-white">{product.description}</p>
              <div className="flex gap-2">
                <Link href={`/specific/${product._id}`}>
                  <TransperentBtn text="Read more" />
                </Link>
                <WhiteBtns
                  text="Add to cart"
                  addFeaturedToCart={addFeaturedToCart}
                />
              </div>
            </div>
            <img
              src={product.image}
              alt="Product"
              className="w-[200px] h-[200px] object-cover"
            />
          </div>
        )}
      </div>
    </>
  );
}
