

export interface SaveUpdateResWaiter{
    _id:string,
    name:string,
    email:string,
    phone:number,
    password:string,
    accesstoken:any,
    order:FOOD[]
}

export interface FOOD {
    _id:string,
    foodname:string,
    price:number,
    type:string,
    size:string
}

