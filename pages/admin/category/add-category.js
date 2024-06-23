import { UserContext } from "@/components/UserContext";
import AdminTopNav from "@/components/admin/AdminTopNav";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function addCategoty() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`/api/admin/categories/add-category`, { name })
      .then((response) => {
        toast.success(response.data.message);
        setName("");
        router.push("/admin/category");
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`);
        setName("");
      });
  };

  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData && userData.user.isAdmin === false) {
      router.push("/account");
    }
  }, [userData]);

  return (
    <>
      <Toaster />
      <AdminTopNav />
      <div className="w-full h-20 flex justify-center items-center">
        <Link href="/admin/category">
          <Button variant="contained" className="w-max bg-slate-800 text-white">
            Back to Categories
          </Button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-4"
      >
        <TextField
          id="CategoryName"
          className="w-[50%]"
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
          name="categoryName"
          label="Category Name"
          variant="filled"
        />
        <div className="w-1/2">
          <Button
            variant="contained"
            className="w-full bg-slate-800 text-white"
            type="submit"
          >
            Create Category
          </Button>
        </div>
      </form>
    </>
  );
}
