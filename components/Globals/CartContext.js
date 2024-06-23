import { createContext, useState, useEffect } from "react";

export const CartContex = createContext({});

export function CartContexProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("Project_x_Cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("Project_x_Cart")) {
      setCartProducts(JSON.parse(ls.getItem("Project_x_Cart")));
    }
  }, []);
  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }
  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }
  function clearCart() {
    if (ls) {
      ls.removeItem("Project_x_Cart"); // Remove the cart data from local storage
    }
    setCartProducts([]);
  }

  return (
    <CartContex.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContex.Provider>
  );
}
