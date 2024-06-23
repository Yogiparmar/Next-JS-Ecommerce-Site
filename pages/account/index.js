import Navbar from "@/components/Navbar";
import { UserContext } from "@/components/UserContext";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

export default function index() {
  const router = useRouter();
  const { userData, removeUserData } = useContext(UserContext);

  const handleLogoutUser = () => {
    removeUserData();
    router.push("/account/signin");
  };

  useEffect(() => {
    if (!userData) {
      router.push("/account/signin");
    }
  });

  return (
    <>
      <Navbar />
      {userData ? (
        <>
          <div className="w-full h-[calc(100%-80px)] flex justify-center items-center flex-col gap-12 my-24">
            <h1 className="font-semibold text-2xl ">
              Welcome, {userData.user.name}
            </h1>
            <div className="flex flex-col gap-8">
              <TextField
                label="Full Name"
                variant="outlined"
                value={userData.user.name}
              />
              <TextField
                label="Email"
                variant="outlined"
                value={userData.user.email}
              />
            </div>
            <div className="flex gap-5">
              <Link href="/cart">
                <Button
                  variant="contained"
                  className="w-max bg-slate-800 text-white"
                >
                  View Cart
                </Button>
              </Link>
              {userData.user.isAdmin === true ? (
                <Link href={"/admin"}>
                  <Button
                    variant="contained"
                    className="w-max bg-slate-800 text-white"
                  >
                    Visit Administation
                  </Button>
                </Link>
              ) : (
                ""
              )}
            </div>
            <div>
              <Button
                onClick={handleLogoutUser}
                variant="contained"
                className="w-max bg-slate-800 text-white"
              >
                Log out
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="font-semibold text-2xl ">
            You need to create account to access this page
          </h1>
        </>
      )}
    </>
  );
}
