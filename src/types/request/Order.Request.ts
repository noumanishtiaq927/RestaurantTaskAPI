export interface SaveReqOrder{
    customername:string,
    customeremail:string,
    customerphone:string | number,
    customertablenumber:number,
    orderstatus:string,
    order:string[]
}
export interface GetReqOrder{
    _id:string
}
export interface UpdateReqOrder{
    _id:string,
    customername:string,
    customeremail:string,
    customerphone:string | number,
    customertablenumber:number,
    customerbill:number,
   // waiterid:string,
    orderstatus:string,
    order:string[]
}
export interface DelReqOrder{
    _id:string
}