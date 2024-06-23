import { UserContext } from "@/components/UserContext";
import AdminTopNav from "@/components/admin/AdminTopNav";
import EditeCategory from "@/components/admin/EditeCategory";
import { Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function index() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [editData, setEditeData] = useState({});

  const handleClickOpen = (cat) => {
    setEditeData(cat);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchCategories = async () => {
    await axios
      .get(`/api/admin/categories/all-categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
  };

  const deleteCategory = async (id) => {
    await axios
      .delete(`/api/admin/categories/delete-category?id=${id}`)
      .then(async () => {
        toast.success(`Category Successfully deleted`);
        await fetchCategories();
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
  };

  useEffect(() => {
    fetchCategories();
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
            All Category
          </h2>
          <Link href="/admin/category/add-category">
            <Button
              variant="contained"
              className="w-max bg-slate-800 text-white"
            >
              Add Category
            </Button>
          </Link>
        </div>

        <table className="w-[75%]  text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category Name
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((cat) => {
                return (
                  <tr className="bg-white" key={cat._id}>
                    <td className="px-6 py-4">{cat.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <Button
                          variant="contained"
                          onClick={() => handleClickOpen(cat)}
                          color="success"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteCategory(cat._id)}
                          variant="contained"
                          color="error"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}

            {categories.length <= 0 && (
              <tr className="bg-white">
                <td className="px-6 py-4" colSpan="6">
                  No Category Available to Display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <EditeCategory
        open={open}
        setOpen={setOpen}
        editData={editData}
        handleClose={handleClose}
      />
    </>
  );
}
