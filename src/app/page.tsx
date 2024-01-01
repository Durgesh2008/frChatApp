"use client"
import React, { useEffect } from 'react'
import Toggler from './components/Toggler'
import { useRouter } from 'next/navigation'
const page = () => {
  const router = useRouter()
  useEffect(()=>{
    let Token =JSON.parse(localStorage.getItem("chat-app-user") as string)?.success  
    if(Token){
      router.push('/chat')
    }else{
      router.push('/')
    }
  },[])
  return (
    <>
    <Toggler/>
    </>
  )
}

export default page