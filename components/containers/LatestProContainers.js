import React, { useEffect, useState } from "react";
import LatestProductBox from "../LatestProductBox";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LatestProContainers() {
  const [newProducts, setNewProducts] = useState([]);

  const fetchNewArrivals = async () => {
    await axios
      .get(`/api/admin/products/get-new-arrivals`)
      .then((response) => {
        setNewProducts(response.data);
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`);
      });
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <>
      <Toaster />
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold my-4">New Arrivals</h1>
        <div className="flex flex-wrap gap-4">
          {newProducts &&
            newProducts.map((product) => (
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
