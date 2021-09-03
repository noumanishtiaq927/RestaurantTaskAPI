import {Document} from "mongoose"


export interface IFOOD extends Document{
    _id:string,
    foodname:string,
    price:number,
    type:string,
    size:string
}


