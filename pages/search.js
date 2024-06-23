import LatestProductBox from "@/components/LatestProductBox";
import Navbar from "@/components/Navbar";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function search() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [allpro, setAllPro] = useState([]);

  const fetchAllProducts = async () => {
    await axios
      .get(`/api/admin/products/all-products`)
      .then((response) => {
        setAllPro(response.data);
        toast.success("Products Fetched Succesfully");
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await axios
      .get(`/api/search-product?query=${query}`)
      .then((response) => {
        setSearchResult(response.data);
        toast.success("Products Fetched Succesfully");
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
    setQuery("");
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <>
      <Toaster />
      <Navbar />
      <div className="px-20 py-10">
        <form
          onSubmit={handleSearch}
          className="w-full h-24 flex gap-10 items-center"
        >
          <TextField
            id="SearchQuery"
            label="Search Product"
            variant="filled"
            value={query}
            required={true}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            className="w-max bg-slate-800 text-white"
          >
            Search
          </Button>
        </form>

        <h1 className="text-2xl font-semibold ">{
            searchResult.length > 0 ? `Search Results` : "All Products"
        }</h1>

        {searchResult.length > 0 ? (
          <>
            <div className="p-10 mt-5 bg-gray-100 flex flex-wrap gap-4">
              {searchResult &&
                searchResult.map((product) => (
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
          </>
        ) : (
          <>
            <div className="p-10 mt-5 bg-gray-100 flex flex-wrap gap-4">
              {allpro &&
                allpro.map((product) => (
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
          </>
        )}
      </div>
    </>
  );
}
