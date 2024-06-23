import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const { userData, setUserData } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`/api/auth/login`, {email, password })
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
        router.push("/account");
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
  };

  useEffect(() => {
    if (userData) {
      router.push("/account");
    }
  })
  return (
    <>
    <Toaster />
      <form onSubmit={handleSubmit} className="flex flex-col w-1/2 p-5 gap-4">
        <h2 className="text-3xl font-semibold">Login</h2>
        <TextField
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          id="Email"
          label="Email"
          variant="outlined"
        />
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="Password"
          label="Password"
          variant="outlined"
        />
        <div className="w-full text-right">
            <p>Don't have an account? <Link href="/account/signup">Register</Link></p>
        </div>
        <Button variant="contained" type="submit" className="w-max bg-slate-800 text-white">
          Login
        </Button>
      </form>
    </>
  );
}
