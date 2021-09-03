import {Document} from "mongoose"
import { IFOOD } from "./IFOOD";

export interface IORDER extends Document {
    _id:string,
    customername:string,
    customeremail:string,
    customerphone:string | number,
    customertablenumber:string,
    customerbill:number,
    orderstatus:string,
    order:IFOOD[]
}