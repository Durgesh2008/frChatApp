"use client";
import Image from "next/image";
import InputEmoji from "react-input-emoji";
import React, { useEffect, useRef, useState } from "react";
import ProfileCard from "./ProfileCard";
import send from "../../../public/send.png"
import log from "../../../public/login.jpg"
import Message from "./Message";
import { useRouter } from "next/navigation";
import { allMsgOfUser, alldata, postmsg } from "../Apidata";
import { contact,msg } from "../Conatnts";
import { io } from "socket.io-client";
const host = "http://localhost:8000";
const ChatConatiner = () => {
  const [Seletected, setSeletected] = useState("");
  const [isOpen, setisOpen] = useState(false);
  const [contacts, setContacts] = useState<contact[]>([]);
  const [text, setText] = useState("");
  const navigate = useRouter();
  const [currchat, setcurrchat] = useState<contact>();
  const [data,setData] =useState<any>(JSON.parse(localStorage.getItem("chat-app-user") as string)) 
  const socket = useRef<any>();
  const router = useRouter()
 
  const [Messages,setMessages]=useState<any>([]);
  const [arrivelmsg, setarrivelmsg] = useState<any>(null);
  const chatBoxRef = useRef<any>();
  const handleSelect = (i: string,chat:contact) => {
    setSeletected(i);
    setcurrchat(chat);
  };
  useEffect(()=>{
    let Token =JSON.parse(localStorage.getItem("chat-app-user") as string)?.success || ""
    console.log(Token)  
    if(!Token){
      router.push('/')
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const handleToggle = () => {
    setisOpen(!isOpen);
  };
  function handleOnEnter(text: string) {
    handlsendMsg();
  }

  const handlsendMsg =async()=>{
    if(currchat){
     await postmsg(text,data?.user._id,currchat?._id)
    }else {
      console.log("error in send msg")
    }
    socket.current.emit("send-msg",{
      to:currchat?._id,
      from:data?.user._id,
      message:text

    });
    const msgs=[...Messages];
    msgs.push({fromSelf:true,message:text})
    setMessages(msgs);
  }
 
  const getallmsgofUser = async()=>{
    if(currchat){
     let res=await allMsgOfUser(data?.user._id,currchat?._id)
     setMessages(res)
    }
    
  }

  useEffect(()=>{
    getallmsgofUser()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currchat?._id])

  const allRelatedUser = async () => {
    let x = await alldata();
    setContacts(x);
  };

  useEffect(() => {
    allRelatedUser();
  }, []);
 
  useEffect(() => {
    if (data) {
      socket.current = io(host);
      socket.current.emit("add-user", data.user._id);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Messages?.text]);

  useEffect(() => {
    scrollToBottom();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Messages]);
  const scrollToBottom = () => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg:string) => {
        setarrivelmsg({ fromSelf: false, message: msg });
      });
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Messages]);
  return (
    <>
      <button
        onClick={handleToggle}
        type="button"
        className=" md:hidden absolute top-1 left-2 z-20  p-2 mt-2 ms-3 text-sm"
      >
        {!isOpen ? (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        )}
      </button>
      <div className="flex">
        <aside
          className={`absolute md:static md:w-1/3 w-1/2 z-10 mt-[4%] h-screen transition-transform ${
            !isOpen ? "-translate-x-0" : "-translate-x-full  "
          }`}
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              {contacts && contacts.map((ele: contact) => {
                  return (
                    <ProfileCard
                      key={ele._id}
                      index={data?.user._id}
                      item={ele}
                      selected={Seletected}
                      
                      handleSelect={handleSelect}
                    />
                  );
                })}
            </ul>
          </div>{" "}
        </aside>

        <div className="w-[90%] gap-2 flex flex-col h-screen justify-center   mx-auto ">
          <nav className="h-[8%] mx-3 my-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-center gap-2">
                <div className="  flex items-center justify-center">
                  <Image
                    className="rounded-full"
                    src={log}
                    width={60}
                    height={60}
                    alt="user profile"
                  />
                </div>

                <span className="heading text-lg ">{data?.user?.name}</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 cursor-pointer"
                onClick={() => {
                  localStorage.clear();
                  navigate.push("/");
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </nav>

          <div ref={chatBoxRef} className=" h-[80%] overflow-y-hidden overflow-x-hidden ">
            {
              Messages?.map((ele:msg,i:number)=>{
                return (<Message key={i}  item={ele} />)
              })
            }
            
          </div>
          <div className="h-[12%] relative bottom-3 flex items-center ">
            <Image
              className="absolute right-20 z-10"
              src={send}
              width={30}
              height={30}
              alt="send"
              onClick={handlsendMsg}
            />
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Type a message"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatConatiner;
