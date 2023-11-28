import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import {RiAccountPinCircleFill ,RiShoppingCartFill} from 'react-icons/ri'

const Navbar = ({ logOut ,  user , cart, addToCart, removeFromCart, clearCart }) => {
  const ref = useRef();
  const [profileDropDown ,setProfileDropDown ] = useState(false);

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  return (
      <div className="nav flex shadow-md  flex-col items-center fixed z-10 bg-purple-100 w-full md:flex-row md:w-full">
        <div className="logo nav-left md:w-1/4">
          <Link href={"/"}>
            {" "}
            <Image
              width={150}
              alt="logo"
              className="w-72 h-16"
              height={10}
              src={"/logo.png"}
            />
          </Link>
        </div>
        <div className="w-3/4   text-lg nav-center flex font-bold">
          <Link href={"/tshirts"}>
            <li className="md:mx-4 mx-1 md:text-lg text-sm hover:text-violet-800">Tshirts</li>
          </Link>
          <Link href={"/hoodies"}>
            <li className="text-sm mx-1 md:mx-4 md:text-lg hover:text-violet-800">hoodies</li>
          </Link>
          <Link href={"/stickers"}>
            <li className="md:mx-4 mx-1 text-sm md:text-lg hover:text-violet-800">Stickers</li>
          </Link>
          <Link href={"/mugs"}>
            <li className="md:mx-4 mx-1 text-sm md:text-lg hover:text-violet-800">Mugs</li>
          </Link>
        </div>
        <div className=" nav-right  flex items-center right-0">
        
        {user.value ?
        <a><RiAccountPinCircleFill onClick={()=>setProfileDropDown(true)} onMouseOver={()=>{setProfileDropDown(true)}} onMouseLeave={()=>{setProfileDropDown(false)}}className="hover:text-violet-800 cursor-pointer text-2xl mx-2"/></a> :<Link href={'/login'} className="p-1 bg-white px-4 text-lg font-semibold shadow-zinc-400 hover:bg-slate-800 shadow-lg rounded-md hover:text-white">Login</Link>  }

        {profileDropDown && <div  onMouseOver={()=>{setProfileDropDown(true)}} onMouseLeave={()=>{setProfileDropDown(false)}}  className="absolute bg-purple-400 font-semibold rounded-tr-none rounded-md  px-5 p-3 w-32 right-[59px] top-11">
          <ul>
            <Link href={'/profile'}><li className="hover:text-white cursor-pointer"> My Profile </li></Link>
            <Link href={'/orders'}><li className="hover:text-white cursor-pointer"> Orders  </li></Link>
            <li onClick={logOut} className="hover:text-white cursor-pointer">Log-Out</li>
          </ul>
        </div>}



          <RiShoppingCartFill onClick={toggleCart} className="hover:text-violet-800 cursor-pointer text-2xl mx-2" />
        </div>
      
        <div
        ref={ref}
        className=" sideBar fixed overflow-y-auto  z-20 md:w-[23%] h-full right-0 top-0 p-3 bg-purple-300 transition-transform translate-x-full transform "
      >
        <span
          className="right-4 top-1 absolute text-2xl cursor-pointer"
          onClick={toggleCart}
        >
          <AiFillCloseCircle />
        </span>
        <div  className="text-center   text-2xl font-semibold my-3">
          <h2>Your Cart</h2>
        </div>
        <hr />

        <div className="flex-col">
          <ul>
            {Object.keys(cart).map((key) => {
              return (
                <li
                  key={key}
                  className="lining-nums  border-x-2 bg-slate-50 my-2 rounded-md shadow-lg p-3 "
                >
                  <div className="flex justify-between">
                    <p>{cart[key]?.title }  {`(${cart[key].size}/${cart[key].variant})`}</p>
                    <div className="flex justify-center items-center text-lg ">
                      <AiFillMinusCircle className="cursor-pointer" onClick={()=>{return removeFromCart(key)}}/>
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
          <div className="p-2 w-full flex justify-between">
            <Link href={"/checkout"}>
              <button
                onClick={toggleCart}
                className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg"
              >
                Checkout
              </button>
            </Link>
            <button
              className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg"
              onClick={clearCart}
            >
              Empty Cart
            </button>
          </div>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
