import {Document} from "mongoose"
import { IORDER } from "./IORDER";

export interface IWAITER extends Document{
    _id:string,
    name:string,
    email:string,
    password:string,
    phone:number,
    orders:IORDER[],
    accesstoken?:string    
}
