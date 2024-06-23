import { Button, MenuItem, TextField } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import AdminTopNav from "@/components/admin/AdminTopNav";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { UserContext } from "@/components/UserContext";

export default function addProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

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

  async function uploadImages(e) {
    const files = e.target.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post(`/api/upload`, data);

      setImage(res.data.links[0]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`/api/admin/products/create-product`, {
        name,
        description,
        cost,
        category,
        image,
      })
      .then((response) => {
        toast.success(response.data.message);
        router.push("/admin/products");
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
        <Link href="/admin/products">
          <Button variant="contained" className="w-max bg-slate-800 text-white">
            Back to Products
          </Button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-4"
      >
        <TextField
          id="ProductTitle"
          className="w-[50%]"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          label="Product Name"
          variant="filled"
        />
        <TextField
          id="Description"
          label="Product Description"
          className="w-[50%]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          multiline
          rows={4}
          variant="filled"
        />
        <TextField
          id="ProductCost"
          className="w-[50%]"
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          name="cost"
          label="Product Cost"
          variant="filled"
        />
        <TextField
          id="filled-select-currency"
          select
          className="w-[50%]"
          label="Select"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          helperText="Please select Category"
          variant="filled"
        >
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <div className="h-[200px] flex w-[50%] justify-center items-center">
          {image ? (
            <img
              src={image}
              alt="Product Image"
              className="w-[200px] h-[200px] object-contain"
            />
          ) : (
            <h1 className="text-2xl font-semibold">
              Please Upload image to fill this section
            </h1>
          )}
        </div>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          className="w-max bg-slate-800 text-white"
          tabIndex={-1}
          startIcon={<ImageIcon />}
        >
          Upload Image
          <input
            onChange={uploadImages}
            style={{
              clip: "rect(0 0 0 0)",
              clipPath: "inset(50%)",
              height: 1,
              overflow: "hidden",
              position: "absolute",
              bottom: 0,
              left: 0,
              whiteSpace: "nowrap",
              width: 1,
            }}
            type="file"
          />
        </Button>

        <div className="w-1/2">
          <Button
            type="submit"
            variant="contained"
            className="w-full bg-slate-800 text-white"
          >
            Create Product
          </Button>
        </div>
      </form>
    </>
  );
}
