import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  useEffect(() => {localStorage.getItem("token") ? router.push("/") : ""}, []);
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/api/signup`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      toast.success("User has been registered successfully", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEmail("");
      setName("");
      setPassword("");
    } else {
      toast.error("Email Already Exists!");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-row w-full">
        <div className="hidden lg:flex flex-col justify-center   items-start bg-purple-200 lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
          <div className="space-y-5">
            <h1 className="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold">
              Enter your account and discover new experiences
            </h1>
          </div>
          <p className="text-lg py-2 px-1">Already have an account?</p>
          <Link
            href={"/login"}
            className=" px-4 py-2 border-2 rounded-lg font-medium border-black bg-black text-white"
          >
            Sign in{" "}
          </Link>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
          <div className="flex lg:hidden justify-between items-center w-full py-4">
            <div className="flex items-center justify-start space-x-3">
              <span className="bg-black rounded-full w-6 h-6"></span>
              <a href="#" className="font-medium text-lg">
                Brand
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <span>Not a member? </span>
              <a href="#" className="underline font-medium text-[#070eff]">
                Sign up now
              </a>
            </div>
          </div>
          <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
            <div className="flex flex-col space-y-2 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">
                Register Yourself
              </h2>
              <p className="text-md md:text-xl">
                Sign up or log in to place the order,no password require!
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col max-w-md space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-black-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  value={name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Username"
                  className="bg-black-50 border border-black-300 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@email.com"
                  className="bg-black-50 border border-black-300 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={handleChange}
                  autoComplete="off"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-black-50 border border-black-300 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
                  required=""
                />
              </div>
              <button
                className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white "
                type="submit"
              >
                Register Now{" "}
              </button>

              <div className="flex justify-center items-center">
                <span className="w-full border border-black"></span>
                <span className="px-4">Or</span>
                <span className="w-full border border-black"></span>
              </div>
              <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
                <span className="absolute left-4"></span>
                <span>Sign up with Google</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
