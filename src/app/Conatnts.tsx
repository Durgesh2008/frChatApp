export type Loginform = {
  email: string;
  password: string;
};

export type Register = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type children = {
  children: React.ReactNode;
};


export type contact ={
  email:string,
name:string,
_id:string
}


export type msg ={
  
fromSelf:boolean
message:string
}