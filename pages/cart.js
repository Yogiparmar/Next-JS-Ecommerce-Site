import { CartContex } from "@/components/Globals/CartContext";
import Navbar from "@/components/Navbar";
import PurchaseForm from "@/components/PurchaseForm";
import { UserContext } from "@/components/UserContext";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function cart() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContex);
  const { userData } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [formOpen, setFormOpenpen] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Help to Payment Form Open
  const handleFormOpen = () => {
    setFormOpenpen(true);
  };

  // Help to Payment Form Close
  const handleFormClose = () => {
    setFormOpenpen(false);
  };

  // Help to Increase Quantity
  function moreOfThisProduct(id) {
    addProduct(id);
  }

  // Help to Decrease Quantity
  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  // Calculate Total Amount
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.cost || 0;
    total += price;
  }

  // Function For make Payment Form Visible of Stripe
  async function goToPayment(e) {
    e.preventDefault();
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  // Use Effect to Find cart Products
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post(`/api/get-cart-products`, { ids: cartProducts })
        .then((response) => {
          setProducts(response.data);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  // Use Effect to check Payment Successe or Not
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  });

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <div className="w-full mt-10 flex justify-center items-center">
          <h1 className="text-3xl font-semibold">Thanks for Your Order</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster />
      <Navbar />

      <div className="w-full px-8 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="my-4 text-3xl font-semibold">Your Cart </h1>
          <div className="flex gap-3">
            {products.length > 0 && (
              <Button
                variant="contained"
                className="w-max bg-red-400 text-white"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            )}

            {products.length > 0 && userData && (
              <Button
                variant="contained"
                className="w-max bg-green-600 text-white"
                onClick={handleFormOpen}
              >
                Make Purchase
              </Button>
            )}
          </div>
        </div>

        <div className="w-full">
          {products.length > 0 ? (
            <table className="w-full">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quntity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((pro, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 w-[100px] h-[100px]">
                        <img
                          src={pro.image}
                          alt={pro.name}
                          className="object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">{pro.name}</td>
                      <td className="text-center">
                        <button
                          onClick={() => lessOfThisProduct(pro._id)}
                          className="rounded border-2 px-3 py-2 mr-2 border-black w-max text-lg bg-red-300 text-black"
                        >
                          -
                        </button>
                        {cartProducts.filter((id) => id === pro._id).length}
                        <button
                          onClick={() => moreOfThisProduct(pro._id)}
                          className="rounded border-2 px-3 py-2 ml-2 border-black w-max text-lg bg-green-300 text-black"
                        >
                          +
                        </button>
                      </td>
                      <td className="text-center">
                        $
                        {cartProducts.filter((id) => id === pro._id).length *
                          pro.cost}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <h1 className="text-lg font-semibold">
              You dont have products in your cart
            </h1>
          )}
        </div>
      </div>
      <PurchaseForm
        goToPayment={goToPayment}
        formOpen={formOpen}
        setFormOpenpen={setFormOpenpen}
        handleFormOpen={handleFormOpen}
        handleFormClose={handleFormClose}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        city={city}
        setCity={setCity}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
        streetAddress={streetAddress}
        setStreetAddress={setStreetAddress}
        country={country}
        setCountry={setCountry}
      />
    </>
  );
}
