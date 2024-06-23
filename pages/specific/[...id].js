import Navbar from "@/components/Navbar";
import AdminTopNav from "@/components/admin/AdminTopNav";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SpecificPro() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [product, setProduct] = useState({});

  const fetchProductDetails = async () => {
    await axios
      .get(`/api/get-specific-user-side-product?id=${id}`)
      .then((response) => {
        setProduct(response.data);
        toast.success("Product Fetched Succesfully");
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`);
      });
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);
  return (
    <>
      <Navbar />
      <div className="w-full h-auto flex flex-col items-center">
        <div className="w-full h-20 flex justify-center items-center">
          <h1 className="font-semibold text-3xl">{product.name}</h1>
        </div>
        {product.category?.name ? (
          <p className="text-lg">
            <b>Category</b>: {product.category.name}
          </p>
        ) : (
          <p className="text-lg">
            <b>Category</b>: Category Deleted Associated with This Product
          </p>
        )}
        <div className="w-1/2 flex gap-4 items-center">
          <img
            src={product.image}
            alt="Product Image"
            className="w-[200px] h-[200px] object-contain"
          />
          <div className="flex flex-col gap-5">
            <p>{product.description}</p>
            <p>
              <b>Price</b>: {product.cost}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
