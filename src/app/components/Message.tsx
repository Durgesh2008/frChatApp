import React from "react";
import { msg } from "../Conatnts";

const Message = ({item}:msg) => {
  console.log(item)
  return (
    <div className="rounded-lg flex  p-2 items-center">
    {
      !item?.fromSelf ? <span className="bg-[#200E3A] roboto text-[#F8EDFF]  self-end rounded-md p-2">
      {item.message}
  </span> : <span className="ml-auto">
      <span className="bg-[#C499F3] text-[#33186B] poppins self-start rounded-md p-2">{item.message}</span>
    </span>
    }
   
    
  {/* other */}
   
  </div>
  
  );
};

export default Message;
