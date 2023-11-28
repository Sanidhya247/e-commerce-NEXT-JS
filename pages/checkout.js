import React, { useState } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";

import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import Router, { useRouter } from "next/router";
const Checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "address":
        setAddress(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value);
        break;
      case "pincode":
        setPincode(e.target.value);
      case "city":
          setCity(e.target.value);
      case "state":
        setState(e.target.value);
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { name,email,pincode,city,state, cart, address, subTotal };
    const response = await fetch('http://localhost:3000/api/payment',{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        'Content-type' : 'application/json'
      }
    })
    const json = await response.json();
    console.log(json)
    // router.push(json.url)

  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container max-md:py-36  px-11 py-24 mx-auto">
          <div className="flex-col justify-center ">
            <div className="flex justify-center items-center text-center w-full mb-10">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Checkout{" "}
              </h1>
              <span className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 mx-3">
                <BsFillBagCheckFill />
              </span>
            </div>

            <p className="lg:w-2/3  mx-auto leading-relaxed font-semibold text-xl">
              1 . Delivery Details
            </p>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div className="relative flex-grow w-full">
                <label
                  htmlFor="full-name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Full Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative flex-grow w-full">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div className="relative flex-grow w-full">
                <label
                  htmlFor="address"
                  className="leading-7 text-sm text-gray-600"
                >
                  Address
                </label>
                <textarea
                  onChange={handleChange}
                  type="text"
                  id="address"
                  name="address"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div className="relative flex-grow w-full">
                <label
                  htmlFor="pincode"
                  className="leading-7 text-sm text-gray-600"
                >
                  Zip - Code
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative flex-grow w-full">
                <label
                  htmlFor="phone"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone
                </label>
                <input
                  onChange={handleChange}
                  type="phone"
                  id="phone"
                  name="phone"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div className="relative flex-grow w-full">
                <label
                  htmlFor="city"
                  className="leading-7 text-sm text-gray-600"
                >
                  City
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="city"
                  name="city"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative flex-grow w-full">
                <label
                  htmlFor="state"
                  className="leading-7 text-sm text-gray-600"
                >
                  State
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="state"
                  name="state"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 mt-3 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end"></div>
          </div>
          <div className="flex-col items-center justify-center">
            <p className="lg:w-2/3  mx-auto leading-relaxed font-semibold my-3 text-xl">
              2 . Review Cart & Pay
            </p>
            <div className="rounded-lg  flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end bg-gray-100  ">
              <div className="flex-col w-full p-6">
                <h2 className="font-medium text-2xl title-font  text-gray-900 ">
                  Cart items
                </h2>
                <div className="w-16 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <ul>
                  {Object.keys(cart).map((key) => {
                    return (
                      <li
                        key={key}
                        className="lining-nums  border-x-2 bg-slate-50 my-2 rounded-md shadow-lg p-3 "
                      >
                        <div className="flex justify-between">
                          <p>
                            {cart[key]?.title}{" "}
                            {`(${cart[key].size}/${cart[key].variant})`}
                          </p>
                          <div className="flex justify-center items-center text-lg ">
                            <AiFillMinusCircle
                              className="cursor-pointer"
                              onClick={() => {
                                return removeFromCart(key);
                              }}
                            />
                            <span className="mx-2">{cart[key].qty}</span>
                            <AiFillPlusCircle
                              className="cursor-pointer"
                              onClick={() => {
                                addToCart(
                                  key,
                                  cart[key].qty,
                                  cart[key].price,
                                  cart[key].title,
                                  cart[key].size,
                                  cart[key].variant
                                );
                              }}
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="p-2 w-full justify-between flex">
                  <p className="flex mx-auto  border-0 py-2 px-8 focus:outline-none  text-lg">
                    To Pay : ₹ {subTotal}.00
                  </p>
                  <button
                    onClick={handleSubmit}
                    className="flex  items-center mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg"
                  >
                    Pay Now <GiMoneyStack className="mx-2 " />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
