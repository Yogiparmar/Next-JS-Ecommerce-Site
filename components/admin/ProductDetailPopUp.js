import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductDetailPopUp({
  viewOpen,
  setViewOpen,
  editData,
  handleDetailOpen,
  handleDetailClose,
}) {
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={viewOpen}
        onClose={handleDetailClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDetailClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            <Button autoFocus color="inherit" onClick={handleDetailClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div className="w-full h-auto flex flex-col items-center">
          <div className="w-full h-20 flex justify-center items-center">
            <h1 className="font-semibold text-3xl">{editData.name}</h1>
          </div>
          {editData.category?.name ? (
          <p className="text-lg">
            <b>Category</b>: {editData.category.name}
          </p>
        ) : (
          <p className="text-lg">
            <b>Category</b>: Category Deleted Associated with This Product
          </p>
        )}
          <div className="w-1/2 flex gap-4 items-center">
            <img
              src={editData.image}
              alt="Product Image"
              className="w-[200px] h-[200px] object-contain"
            />
            <div className="flex flex-col gap-5">
              <p>{editData.description}</p>
              <p>
                <b>Price</b>: {editData.cost}
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
