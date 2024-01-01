"use client"
import React, { useState } from 'react'
import Login from './Login';
import Signup from './SignUp';

const Toggler = () => {
const [isLogin,setIsLogin]=useState(false);
const [isSignUp,setIsSignUp]=useState(true);

const handleSignUp =()=>{
    setIsLogin(false)
    setIsSignUp(true)
}

const handleLogin = ()=>{
    setIsSignUp(false)
    setIsLogin(true)

}
  return (
    <>
    <div className='w-full flex  justify-around '>
        <button onClick={handleSignUp} className='cursor-pointer transition-opacity mt-6 ease-in uppercase'>
            SignUp
            {
            isSignUp && <div className='w-16 h-1 bg-blue-800  rounded-lg'></div>
           } 
        </button>
        <button onClick={handleLogin} className='cursor-pointer transition-opacity mt-6 ease-in uppercase'>
            Login
           {
            isLogin && <div className='w-16 h-1 bg-blue-800  rounded-lg'></div>
           } 
        </button>
        

    </div>
    { isLogin ? <Login handleLogin={handleSignUp} /> :<Signup handleSignUp={handleLogin}/>}
    </>
  )
}

export default Toggler