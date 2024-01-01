import Image from 'next/image'
import React from 'react'
import login from '../../../public/login.jpg'
const ProfileCard = ({item,selected,index,handleSelect}:any) => {
  return (
    <li onClick={()=>handleSelect(item._id,item)} className={`w-full h-20 ${selected==item?._id? "bg-[#ADA2FF]" :"bg-[#EEEDED]"}  rounded-lg flex justify-between cursor-pointer items-center`}>
    <div className="flex items-center justify-center gap-1">
    <Image className="rounded-full" src={login} width={60} height={60} alt="profiie Image" />
    <span className={`overflow-hidden poppins capitalize ${selected==item?._id && "text-white"}`}>{item?.name} </span>
    </div>
 </li>
  )
}

export default ProfileCard