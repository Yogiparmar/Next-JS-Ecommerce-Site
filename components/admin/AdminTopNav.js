import { MenuOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import AdminSideNav from "./AdminSideNav";
import { UserContext } from "../UserContext";
import { useRouter } from "next/router";

export default function AdminTopNav() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const router = useRouter();

  const { removeUserData } = useContext(UserContext);

  const logOutUser = () => {
    removeUserData();
    router.push("/account/signin");
  };

  return (
    <>
      <div className="flex px-10 w-full h-14 justify-between items-center border-b-2">
        <Button
          onClick={toggleDrawer(true)}
          className="w-max bg-slate-800 text-white"
          variant="contained"
        >
          <MenuOutlined />
        </Button>
        <Button
          variant="contained"
          onClick={logOutUser}
          className="w-max bg-slate-800 text-white"
        >
          Sign out
        </Button>
      </div>
      <AdminSideNav open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
    </>
  );
}
