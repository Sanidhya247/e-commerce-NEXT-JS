import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  useEffect(()=>{
    {localStorage.getItem('token') ? router.push('/') : ''}
  },[])

  const handleChange=(e)=>{
     if(e.target.name==='email'){
        setEmail(e.target.value);
      }else if(e.target.name==='password'){
        setPassword(e.target.value);
      }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const data = {email , password};
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/login`,{
      method:"POST",
      headers:{'Content-type' : 'application/json'},
      body : JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
      localStorage.setItem('token' , json.token)
      toast.success("Login successfull !", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEmail('')
      setPassword('')
      router.push('/')
    }else{
      toast.error(json.error)
    } 
  }

  return (
    <>
      <div className="min-h-screen bg-orange-100-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto max-sm:mt-32 mt-14">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-16">
            <div className="max-w-md mx-auto">
              <div className="text-center ">
                <div className="flex items-center justify-center">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-12 h-12 text-blue-500"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h2 className="text-4xl tracking-tight">
                  Sign in into your account
                </h2>
                <span className="text-sm">
                  or{" "}
                  <Link href={'/signup'} className="text-blue-500">
                    register a new account
                  </Link>
                </span>
              </div>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-purple-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                  value={email}
                  onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-purple-50 border border-purple-300 text-purple-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    placeholder="name@email.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-purple-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                  value={password}
                  onChange={handleChange}
                  autoComplete='on'
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-purple-50 border border-purple-300 text-purple-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-purple-300 rounded bg-purple-50 focus:ring-3 focus:ring-primary-300 dark:bg-purple-700 dark:border-purple-600 dark:focus:ring-primary-600 dark:ring-offset-purple-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-purple-500 dark:text-purple-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    href={"/forgot"}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-purple-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-purple-500 dark:text-purple-400">
                  Don’t have an account yet?{" "}
                  <Link
                    href={"/signup"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
