"use client";
import React, { useEffect } from "react";
import signup from "../../../public/signup.jpg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Register } from "../Conatnts";
import { PostDataSignUp } from "../Apidata";
import { useRouter } from 'next/navigation'


const Signup = ({ handleSignUp }: any) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>();

  
  const onSubmit = async (input: Register) => {
    let vaildate = handlevalidation(input);
    if (vaildate) {
     await PostDataSignUp(input)
     router.push('/chat')
    }
  };



  function handlevalidation(input: Register) {
    let { name, email, password, confirm_password } = input;
    if (name.length < 3) {
      alert("username  at least 3 charcter");
      return false;
    } else if (password.length < 5) {
      alert("Password e at least 5 charcter");
      return false;
    } else if (password !== confirm_password) {
      alert("Password and confirm password mush be same");
      return false;
    }
    return true;
  }
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="w-[90%] h-[90%] mx-auto shadow-lg flex items-center justify-center  ">
        <div className="flex-1  ">
          <div className="flex flex-col items-center justify-center  mx-auto  ">
            <div className="w-full shadow rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl title capitalize text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign Up
                </h1>
                <form className="poppins" onSubmit={handleSubmit(onSubmit)}>
                  {/* <!--Email input--> */}
                  <div className="relative mb-7 ">
                    <input
                      type="text"
                      placeholder="Username"
                      {...register("name", { required: true })}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    {errors.name && (
                      <p className="text-[#d95454] font-roboto text-[10px]">
                        {" "}
                        username is required.
                      </p>
                    )}
                  </div>
                  <div className="relative mb-7 ">
                    <input
                      type="email"
                      placeholder="Email"
                      {...register("email", { required: true })}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    {errors.email && (
                      <p className="text-[#d95454] font-roboto text-[10px]">
                        {" "}
                        email is required.
                      </p>
                    )}
                  </div>
                  <div className="relative mb-7">
                    <input
                      type="password"
                      placeholder="Password"
                      {...register("password", { required: true })}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    {errors.password && (
                      <p className="text-[#d95454] font-roboto text-[10px]">
                        {" "}
                        Password is required.
                      </p>
                    )}
                  </div>
                  
                  <div className="relative mb-7">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      {...register("confirm_password", { required: true })}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    {errors.confirm_password && (
                      <p className="text-[#d95454] font-roboto text-[10px]">
                        {" "}
                        confirm Password is required.
                      </p>
                    )}
                  </div>
                  {/* <!--Submit button--> */}
                  <div className="w-full mx-auto ">
                    <button
                      type="submit"
                      className="inline-block roboto w-full text-center bg-[#19A5B1] font-inter  rounded  px-6 py-2 mt-5 mb-4 text-xs md:text-base font-medium capitalize leading-normal text-white  hover:shadow-btn__shadow   duration-500 ease-in transform active:scale-75 transition-transform"
                    >
                      Sign Up
                    </button>
                  </div>

                  <div className="flex items-center justify-center font-inter ">
                    <span className="text-sm font-normal">
                      Already have account?
                    </span>
                    <p
                      onClick={handleSignUp}
                      className="font-poppins cursor-pointer font-semibold text-[#05494F] text-[12px]  "
                    >
                      Login here
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1   hidden md:flex items-center justify-center">
          <Image src={signup} width={600} height={600} alt="Login Page" />
        </div>
      </div>
    </section>
  );
};

export default Signup;
