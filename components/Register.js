import { Button, TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "./UserContext";

export default function Register() {
  const router = useRouter();
  const { userData, setUserData } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`/api/auth/register`, { name, email, password })
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
      {!userData && (
        <form onSubmit={handleSubmit} className="flex flex-col w-1/2 p-5 gap-4">
          <h2 className="text-3xl font-semibold">Register</h2>
          <TextField
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            id="FullName"
            label="Full Name"
            variant="outlined"
          />
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
            <p>
              Alredy have an account? <Link href="/account/signin">Login</Link>
            </p>
          </div>
          <Button
            variant="contained"
            type="submit"
            className="w-max bg-slate-800 text-white"
          >
            Register
          </Button>
        </form>
      )}
    </>
  );
}
