import { FOOD } from "./Waiter.Response";

export interface SaveUpdateResOrder{
    _id:string,
    customername:string,
    customeremail:string,
    customerphone:string | number,
    customertablenumber:number,
    customerbill:number,
    orderstatus:string,
    order:FOOD[]
}


