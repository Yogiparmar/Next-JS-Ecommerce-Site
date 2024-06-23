import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ImageIcon from "@mui/icons-material/Image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditeProductPopUp({
  open,
  setOpen,
  editData,
  handleClickOpen,
  handleClose,
}) {
  const [categories, setCategories] = React.useState([]);

  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");

  const handleEdit = async (e) => {
    e.preventDefault();

    await axios
      .put(`/api/admin/products/edit-product`, {
        id,
        name,
        description,
        cost,
        category,
        image,
      })
      .then((response) => {
        toast.success(response.data.message);
        handleClose();
      })
      .catch((err) => {
        return toast.error(`${err.response.data.message}`);
      });
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

  React.useEffect(() => {
    fetchCategories();
    setId("" || editData._id);
    setName("" || editData.name);
    setDescription("" || editData.description);
    {
      editData.category && setCategory("" || editData.category.name);
    }
    setCost("" || editData.cost);
    console.log(editData.category?.name);
  }, [editData]);

  return (
    <React.Fragment>
      <Toaster />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <form
          onSubmit={handleEdit}
          className="my-10 w-full flex flex-col items-center gap-4"
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
          <div className="h-[100px] flex w-[50%] justify-center items-center">
            {image ? (
              <img
                src={image}
                alt="Product Image"
                className="w-[100px] h-[100px] object-contain"
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
              Save Changes
            </Button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
