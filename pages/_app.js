import React, { use, useEffect, useState } from "react";
import "../styles/globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import LoadingBar from "react-top-loading-bar";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(20);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("cart");
    }
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }
    //eslint-disable-next-line
  }, [router.query]);

  const logOut = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(0);
    toast.success("Logout successfull !", {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    router.push('/')
  };

  const addToCart = (itemCode, qty, price, title, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + 1;
    } else {
      newCart[itemCode] = { qty: 1, price, title, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    let subT = 0;
    let keys = Object.keys(cart);
    for (let i = 0; i < keys.length; i++) {
      subT += cart[keys[i]]["price"] * cart[keys[i]]["qty"];
    }
    setSubTotal(subT);
  };

  const removeFromCart = (itemCode) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - 1;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const buyNow = (itemCode, qty, price, title, size, variant) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, price, title, size, variant };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  return (
    <>
      <LoadingBar
        color="#864a8a"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar
        logOut={logOut}
        key={key}
        user={user}
        subTotal={subTotal}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />

      <Component
        {...pageProps}
        buyNow={buyNow}
        cart={cart}
        subTotal={subTotal}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
    </>
  );
}

export default MyApp;
