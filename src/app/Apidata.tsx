import { Loginform, Register } from "./Conatnts";

const host = "https://chatapp-xn7p.onrender.com";
export const PostDataSignUp = async (input: Register) => {
  try {
    const { name, password, email } = input;
   
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        name,
        password,
        email,
  
      }),
    });

    const data = await response.json();

    if (data.success === false) {
      alert("Invalid user");
    } else {
      localStorage.setItem("chat-app-user", JSON.stringify(data));
    }
  } catch (error) {
    alert("invalid user");
  }
};

export const PostLogin = async (input: Loginform) => {
  const { password, email } = input;
  const response = await fetch(`${host}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }
  );

  const data = await response.json();

  if (data.success === false) {
    return false;
  } else {
    localStorage.setItem("chat-app-user", JSON.stringify(data));

    return true;
  }
};

export const alldata = async () => {
  const auth = JSON.parse(localStorage.getItem("chat-app-user") as string);
  try {
    const response = await fetch(`${host}/api/auth/getuser/${auth?.user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth?.token,
      },
    });
    const data = await response.json();
    console.log(data.user)  
    return data.user;
  } catch (error) {
    return [];
  }
};

export const allMsgOfUser =async(userId:string,chatId:string)=>{
  try {
    const response = await fetch(`${host}/api/msg/allmsg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: userId,
        to: chatId,
      })
    });
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error)
  }
}


export const postmsg = async(msg:string,userId:string,chatId:string)=>{
  try {
    await fetch(`${host}/api/msg/addmsg`,{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
         from:userId,
         to:chatId,
         message:msg
      })
    })
  } catch (e) {
    console.log(e)
  }
}