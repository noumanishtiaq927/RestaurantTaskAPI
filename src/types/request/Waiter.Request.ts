


export interface SaveReqWaiter{
    name:string,
    email:string,
    phone:number,
    password:string,
    
}

export interface UpdateReqWaiter{
   _id:string,
  name:string,
  email:string,
  phone:number,
  password:string,

}

export interface GetReqWaiter{
    _id:string,

}

export interface DelReqWaiter{
  _id:string,

}
export interface findReqWaiter{
   _id:string,
}

export interface LoginWaiter{
  email:string,
  password:string
}

