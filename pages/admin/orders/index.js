import { UserContext } from "@/components/UserContext";
import AdminTopNav from "@/components/admin/AdminTopNav";
import OrderDeleteDialog from "@/components/admin/OrderDeleteDialog";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function index() {
  const [orders, setOrders] = useState([]);
  const [orderDeleteOpen, setOrderDeleteOpen] = React.useState(false);
  const [orderId, setOrderId] = useState("");

  const handleOrderDeleteOpen = (id) => {
    setOrderId(id);
    setOrderDeleteOpen(true);
  };

  const handleorderDeleteClose = () => {
    setOrderDeleteOpen(false);
  };

  const deleteOrder = async (id) => {
    await axios
      .delete(`/api/admin/orders/delete-order?id=${id}`)
      .then(async () => {
        toast.success(`Order Successfully deleted`);
        await fetchOrders();
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
    setOrderDeleteOpen(false);
  };

  const fetchOrders = async () => {
    await axios
      .get(`/api/admin/orders/all-orders`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
        <h2 className="w-[85%] flex text-left text-2xl font-semibold my-3">
          All Orders
        </h2>

        <table className="w-[85%]  text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Paid Status
              </th>
              <th scope="col" className="px-6 py-3">
                Recepeints
              </th>
              <th scope="col" className="px-6 py-3">
                Products
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => {
                return (
                  <tr className="bg-white" key={order._id}>
                    <td className="px-6 py-4">{order._id}</td>
                    <td className="px-6 py-4">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td
                      className={
                        order.paid
                          ? "text-green-600 px-6 py-4"
                          : "text-red-600 px-6 py-4"
                      }
                    >
                      {order.paid ? "YES" : "NO"}
                    </td>
                    <td>
                      {order.name} {order.email}
                      <br />
                      {order.city} {order.postalCode} {order.country}
                      <br />
                      {order.streetAddress}
                    </td>
                    <td>
                      {order.line_items.map((l) => (
                        <>
                          {l.price_data?.product_data.name} x{l.quantity}
                          <br />
                        </>
                      ))}
                    </td>
                    <td>
                      <Button
                        onClick={() => handleOrderDeleteOpen(order._id)}
                        variant="contained"
                        size="small"
                        color="error"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}

            {orders.length <= 0 && (
              <tr className="bg-white">
                <td className="px-6 py-4" colSpan="6">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <OrderDeleteDialog
        orderId={orderId}
        deleteOrder={deleteOrder}
        orderDeleteOpen={orderDeleteOpen}
        setOrderDeleteOpen={setOrderDeleteOpen}
        handleOrderDeleteOpen={handleOrderDeleteOpen}
        handleorderDeleteClose={handleorderDeleteClose}
      />
    </>
  );
}
