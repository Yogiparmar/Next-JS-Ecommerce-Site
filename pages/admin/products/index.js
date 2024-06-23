import { UserContext } from "@/components/UserContext";
import AdminTopNav from "@/components/admin/AdminTopNav";
import EditeProductPopUp from "@/components/admin/EditeProductPopUp";
import ProductDetailPopUp from "@/components/admin/ProductDetailPopUp";
import { Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function index() {
  const [allProducts, setAllProducts] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [editData, setEditeData] = useState({});

  const [viewOpen, setViewOpen] = React.useState(false);
  const handleDetailOpen = (pro) => {
    setEditeData(pro);
    setViewOpen(true);
  };

  const handleDetailClose = () => {
    setViewOpen(false);
  };

  const handleClickOpen = (pro) => {
    setEditeData(pro);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchProducts = async () => {
    await axios
      .get(`/api/admin/products/all-products`)
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
  };

  const deleteProduct = async (id) => {
    await axios
      .delete(`/api/admin/products/delete-product?id=${id}`)
      .then(async () => {
        toast.success(`Product Successfully deleted`);
        await fetchProducts();
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [open]);

  const { userData } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (userData && userData.user.isAdmin === false) {
      router.push("/account");
    }
  }, [userData]);

  return (
    <>
      <Toaster />
      <AdminTopNav />
      <section className="w-full flex flex-col gap-2 items-center">
        <div className="w-[75%] flex justify-between items-center mt-4">
          <h2 className="w-[75%] flex text-left text-2xl font-semibold my-3">
            All Products
          </h2>
          <Link href="/admin/products/add-product">
            <Button
              variant="contained"
              className="w-max bg-slate-800 text-white"
            >
              Add Product
            </Button>
          </Link>
        </div>

        <table className="w-[75%]  text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allProducts &&
              allProducts.map((pro) => {
                return (
                  <tr className="bg-white" key={pro._id}>
                    <td className="px-6 py-4">{pro.name}</td>
                    {pro.category?.name ? (
                      <td className="px-6 py-4">{pro.category.name}</td>
                    ) : (
                      <td className="px-6 py-4">
                        Category Is Deleted which assosiated with this Product
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <Button
                          variant="contained"
                          onClick={() => handleDetailOpen(pro)}
                          color="secondary"
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handleClickOpen(pro)}
                          color="success"
                        >
                          Edit
                        </Button>

                        <Button
                          variant="contained"
                          onClick={() => deleteProduct(pro._id)}
                          color="error"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
      <EditeProductPopUp
        open={open}
        setOpen={setOpen}
        editData={editData}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <ProductDetailPopUp
        viewOpen={viewOpen}
        setViewOpen={setViewOpen}
        editData={editData}
        handleDetailOpen={handleDetailOpen}
        handleDetailClose={handleDetailClose}
      />
    </>
  );
}
