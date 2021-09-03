export interface SaveReqFood{

    foodname:string,
    price:number,
    type:string,
    size:string

}

export interface UpdateReqFood{
    _id:string,
    foodname:string,
    price:number,
    type:string,
    size:string
}

export interface DelReqFood{
    _id:string
}