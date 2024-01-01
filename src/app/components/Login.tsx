'use client'
import React from 'react'
import login from '../../../public/login.jpg'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Loginform } from '../Conatnts'
import { PostLogin } from '../Apidata'
import { useRouter } from 'next/navigation'

const Login = ({handleLogin}:any) => {
  const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Loginform>();


      const onSubmit = async (input: Loginform) => {
        let success=await PostLogin(input)
        if(success){
          router.push('/chat')
        }
       
      }
  return (
    <section className='w-full h-screen flex items-center justify-center'>
    <div className='w-[90%] h-[90%] mx-auto shadow-lg flex items-center justify-center  '>
        <div className='flex-1  '>
        <div className="flex flex-col items-center justify-center  mx-auto  ">
      
      <div className="w-full shadow rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl title capitalize text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in 
              </h1>
              <form className='poppins' onSubmit={handleSubmit(onSubmit)}>
            {/* <!--Email input--> */}
            <div className="relative mb-7 ">
              <input
                type="email"
                placeholder='Email'
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
                placeholder='Password'
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
            {/* <!--Submit button--> */}
            <div className="w-full mx-auto ">
              
                <button
                  type="submit"
                  className="inline-block roboto w-full text-center bg-[#19A5B1] font-inter  rounded  px-6 py-2 mt-5 mb-4 text-xs md:text-base font-medium capitalize leading-normal text-white  hover:shadow-btn__shadow   duration-500 ease-in transform active:scale-75 transition-transform"
                >
                  Login
                </button>
            
            </div>
            
            
            <div className="flex items-center justify-center font-inter ">
              <span className="text-sm font-normal">New User?</span>
              <p
               onClick={handleLogin}
                className="font-poppins cursor-pointer font-semibold text-[#05494F] text-[12px]  "
              >
                Signup here
              </p>
             
            </div>
          </form>
          </div>
      </div>
  </div>
        </div>
        <div className='flex-1   hidden md:flex items-center justify-center'>
            <Image src={login} width={500} height={500} alt='Login Page'  />
        </div>
    </div>

    </section>
  )
}

export default Login