import LatestProductBox from "@/components/LatestProductBox";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function allProducts() {
  const [allProductsArray, setAllProductsArray] = useState([]);

  const fetchAllProducts = async () => {
    await axios
      .get(`/api/admin/products/all-products`)
      .then((response) => {
        setAllProductsArray(response.data);
        toast.success("Products Fetched Succesfully");
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="px-20 pb-14 bg-gray-100 flex flex-col">
        <h1 className="text-2xl font-semibold my-4">All Products</h1>
        <div className=" flex flex-wrap gap-4">
          {allProductsArray &&
            allProductsArray.map((product) => (
              <div key={product._id} className="min-w-64">
                <LatestProductBox
                  name={product.name}
                  cost={product.cost}
                  image={product.image}
                  id={product._id}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
