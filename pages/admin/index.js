import AdminTopNav from "@/components/admin/AdminTopNav";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@mui/material";
import axios from "axios";
import EditeUser from "@/components/admin/EditeUser";
import { UserContext } from "@/components/UserContext";
import { useRouter } from "next/router";

export default function index() {
  const { userData } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [editData, setEditeData] = useState({});

  const router = useRouter();

  console.log(userData);

  const handleClickOpen = (user) => {
    setEditeData(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toString = (bool) => {
    return bool ? "Admin" : "User";
  };

  const fetchUsers = async () => {
    await axios
      .get(`/api/admin/users/allusers`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
  };

  const deleteUser = async (id) => {
    await axios
      .delete(`/api/admin/users/delete-user?id=${id}`)
      .then(async () => {
        toast.success(`User Successfully deleted`);
        await fetchUsers();
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
  };

  useEffect(() => {
    if (userData && userData.user.isAdmin === false) {
      router.push("/account");
    }
  }, [userData]);

  useEffect(() => {
    fetchUsers();
  }, [open]);

  return (
    <>
      <Toaster />
      <AdminTopNav />
      <section className="w-full flex flex-col gap-2 items-center">
        <h2 className="w-[75%] flex text-left text-2xl font-semibold my-3">
          All Users
        </h2>

        <table className="w-[75%]  text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Full name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr className="bg-white" key={user._id}>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{toString(user.isAdmin)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <Button
                          variant="contained"
                          onClick={() => handleClickOpen(user)}
                          color="success"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteUser(user._id)}
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
          </tbody>
        </table>
      </section>
      <EditeUser
        open={open}
        setOpen={setOpen}
        editData={editData}
        handleClose={handleClose}
      />
    </>
  );
}
