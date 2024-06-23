import { CartContexProvider } from "@/components/Globals/CartContext";
import UserContexProvider from "@/components/UserContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartContexProvider>
      <UserContexProvider>
        <Component {...pageProps} />
      </UserContexProvider>
    </CartContexProvider>
  );
}
