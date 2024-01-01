"use client"
import React, { useEffect } from 'react'
import ChatConatiner from '../components/ChatConatiner'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  useEffect(()=>{
    let Token =JSON.parse(localStorage.getItem("chat-app-user") as string)?.success || ""
    console.log(Token)  
    if(!Token){
      router.push('/')
    }
  },[])
  return (
    <>
    <ChatConatiner/>
    </>
  )
}

export default page